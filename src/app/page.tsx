import UserAuth from "@/components/UserAuth";


/**
 * Renders the home page with a heading, a description, and the user authentication component.
 *
 * Displays introductory content and integrates user authentication functionality.
 */
export default function Home() {
  return (
      <>
          <h1 className="text-2xl text-center content-center">this is p1 project</h1>
          <p className="text-center">This is a simple project to test the integration of Tailwind CSS with Next.js.</p>

          <UserAuth/>
      </>
  );
}
