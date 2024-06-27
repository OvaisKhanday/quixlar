import { getServerSession, Session } from "next-auth";
import { signOut } from "next-auth/react";
import { authOptions } from "../api/auth/[...nextauth]";
import Layout from "./layout";
import Link from "next/link";

export default function Dashboard({ session, hello }: { session: Session | null; hello: string }) {
  //   const { data: session } = useSession();
  console.log(session);
  return (
    <div>
      <Layout>
        <div>
          <Link className='bg-green-500 rounded-lg font-semibold px-2 py-1 text-zinc-50' href='/dashboard/quiz'>
            create quiz
          </Link>
          list of quizzes
        </div>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);
  console.log("ssp", session);
  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session: session,
      hello: "world",
    },
  };
}
