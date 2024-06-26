import { Inter } from "next/font/google";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  return (
    <main className=''>
      {session ? <Link href='/dashboard'>Dashboard</Link> : <button onClick={() => signIn("google", { callbackUrl: "/dashboard" })}>sign-in</button>}
    </main>
  );
}
