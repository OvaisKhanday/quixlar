import { Button } from "@/components/ui/button";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  return (
    <div>
      <nav className='sticky top-0 backdrop-blur-lg flex justify-between items-center px-4 py-2 border-b'>
        <h1 className='text-green-500 text-3xl font-bold'>Quixlar</h1>
        <div className='flex flex-row gap-2 items-center '>
          <Image src={session?.user?.image!} alt='profile' className='rounded-full' height={32} width={32} />
          <p className='truncate'>{session?.user?.name}</p>
          <Button variant={"outline"}>signout</Button>
        </div>
      </nav>
      <div className='mt-4 flex flex-col justify-center items-center'>{children}</div>
    </div>
  );
}
