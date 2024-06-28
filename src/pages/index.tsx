import { Inter } from "next/font/google";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import Link from "next/link";
import GoogleAuthButton from "@/components/GoogleAuthButton";
import { Session } from "next-auth";
import SignInOrDashboardButton from "@/components/SignInOrDashboardButton";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const { data: session } = useSession();
  return (
    <main className=''>
      <SignInOrDashboardButton />
    </main>
  );
}
