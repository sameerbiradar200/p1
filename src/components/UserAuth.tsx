'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

type UserProfile = {
    family_name: string;
    given_name: string;
    name: string;
    email: string;
    picture: string;
};

/**
 * React component that manages user authentication via Amazon Cognito OAuth2.
 *
 * Handles the OAuth2 login flow, exchanges authorization codes for tokens, stores and decodes the ID token to extract user profile information, and renders either a login button or the authenticated user's profile and JWT token. Allows copying the JWT token to the clipboard.
 *
 * @returns The rendered authentication UI based on the user's authentication state.
 */
export default function UserAuth() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const code = searchParams.get('code');

    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [jwt, setJwt] = useState('');

    const clientId = '4o5ag29jbf7o9lk8c9he27boc2';
    const domain = 'ap-south-1q9uecnset.auth.ap-south-1.amazoncognito.com';
    const redirectUri = 'https://saas.p1.sameerbiradar.xyz';
    const loginUrl = `https://${domain}/login?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=email+openid+profile`;

    const fetchToken = useCallback(
        async (authCode: string) => {
            try {
                const res = await fetch(`https://${domain}/oauth2/token`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        grant_type: 'authorization_code',
                        client_id: clientId,
                        code: authCode,
                        redirect_uri: redirectUri,
                    }),
                });

                const data = await res.json();

                if (data.id_token) {
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('id_token', data.id_token);
                        localStorage.setItem('access_token', data.access_token);
                        localStorage.setItem('refresh_token', data.refresh_token);
                    }

                    const parts = data.id_token.split('.');
                    if (parts.length !== 3) throw new Error('Invalid JWT structure');

                    const [, payload] = parts;
                    const decoded = JSON.parse(atob(payload));

                    setProfile({
                        name: decoded.name,
                        family_name: decoded.family_name,
                        given_name: decoded.given_name,
                        email: decoded.email,
                        picture: decoded.picture,
                    });

                    setJwt(data.id_token);
                    router.replace('/');
                } else {
                    console.error('Token exchange failed:', data);
                }
            } catch (error) {
                console.error('Error fetching token:', error);
            }
        },
        [router]
    );

    useEffect(() => {
        if (typeof window === 'undefined') return;

        if (code) {
            fetchToken(code);
        } else {
            const storedToken = localStorage.getItem('id_token');
            if (storedToken) {
                try {
                    const parts = storedToken.split('.');
                    if (parts.length !== 3) throw new Error('Invalid JWT structure');

                    const [, payload] = parts;
                    const decoded = JSON.parse(atob(payload));
                    const now = Math.floor(Date.now() / 1000);

                    if (decoded.exp && decoded.exp < now) {
                        localStorage.removeItem('id_token');
                        return;
                    }

                    setProfile({
                        name: decoded.name,
                        family_name: decoded.family_name,
                        given_name: decoded.given_name,
                        email: decoded.email,
                        picture: decoded.picture,
                    });

                    setJwt(storedToken);
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                } catch (error) {
                    localStorage.removeItem('id_token');
                }
            }
        }
    }, [code, fetchToken]);

    const handleCopy = () => {
        navigator.clipboard.writeText(jwt);
        alert('JWT copied to clipboard!');
    };

    if (!profile) {
        return (
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <a href={loginUrl}>
                    <button style={{ padding: '10px 20px', fontSize: '16px' }}>
                        Login with Google
                    </button>
                </a>
            </div>
        );
    }

    return (
        <div
            style={{
                marginTop: '30px',
                background: '#f0f0f0',
                padding: '20px',
                borderRadius: '10px',
                textAlign: 'center',
            }}
        >
            <img
                src={profile.picture}
                alt="Profile"
                width={80}
                height={80}
                style={{borderRadius: '50%'}}
            />
            <h2>{profile.given_name}</h2>
            <h2>{profile.family_name}</h2>
            <p>{profile.email}</p>
            <button
                onClick={handleCopy}
                style={{
                    marginTop: '10px',
                    padding: '10px 20px',
                    fontSize: '14px',
                    backgroundColor: '#0070f3',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Copy JWT
            </button>
        </div>
    );
}
