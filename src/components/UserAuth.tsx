'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

interface UserProfile {
    name: string
    email: string
    picture: string
}

export default function UserAuth() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const code = searchParams.get('code')

    const [profile, setProfile] = useState<UserProfile | null>(null)
    const [jwt, setJwt] = useState<string>('')

    const clientId = '4o5ag29jbf7o9lk8c9he27boc2'
    const domain = 'ap-south-1q9uecnset.auth.ap-south-1.amazoncognito.com'
    const redirectUri = 'https://saas.p1.sameerbiradar.xyz'
    const loginUrl = `https://${domain}/login?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=email+openid+profile`

    const fetchToken = async (authCode: string) => {
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
            })

            const data = await res.json()

            if (data.id_token) {
                localStorage.setItem('id_token', data.id_token)
                setJwt(data.id_token)

                const [, payload] = data.id_token.split('.')
                const decoded = JSON.parse(atob(payload))

                setProfile({
                    name: decoded.name,
                    email: decoded.email,
                    picture: decoded.picture,
                })

                router.replace('/') // Clean URL
            } else {
                console.error('Token exchange failed:', data)
            }
        } catch (err) {
            console.error('Error fetching token:', err)
        }
    }

    useEffect(() => {
        if (code) {
            fetchToken(code)
        } else {
            const storedToken = localStorage.getItem('id_token')
            if (storedToken) {
                setJwt(storedToken)
                const [, payload] = storedToken.split('.')
                const decoded = JSON.parse(atob(payload))
                setProfile({
                    name: decoded.name,
                    email: decoded.email,
                    picture: decoded.picture,
                })
            }
        }
    }, [code])

    const handleCopy = async () => {
        await navigator.clipboard.writeText(jwt)
        alert('JWT copied to clipboard!')
    }

    if (!profile) {
        return (
            <div className="flex justify-center mt-20">
                <a href={loginUrl}>
                    <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-700 transition">
                        Login with Google
                    </button>
                </a>
            </div>
        )
    }

    return (
        <div className="max-w-xl mx-auto mt-20 bg-white shadow-lg rounded-2xl p-6 text-center space-y-4 border border-gray-200">
            <img
                src={profile.picture}
                alt="Profile"
                className="mx-auto rounded-full w-24 h-24"
            />
            <h2 className="text-2xl font-semibold">{profile.name}</h2>
            <p className="text-gray-600">{profile.email}</p>

            <div className="text-left">
                <label className="block mb-1 font-semibold">JWT Token</label>
                <textarea
                    readOnly
                    value={jwt}
                    className="w-full h-32 p-2 text-xs border rounded bg-gray-50 font-mono"
                />
                <button
                    onClick={handleCopy}
                    className="mt-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                >
                    Copy JWT
                </button>
            </div>
        </div>
    )
}
