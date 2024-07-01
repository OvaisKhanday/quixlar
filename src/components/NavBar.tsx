import { FC } from "react";
import AppLogo from "./AppLogo";
import Image from "next/image";
import { Button } from "./ui/button";
import { signOut, useSession } from "next-auth/react";

interface NavBarProps {}

const NavBar: FC<NavBarProps> = ({}) => {
  const { data: session } = useSession();
  return (
    <nav className='sticky top-0 backdrop-blur-md flex justify-between items-center px-4 py-2 border-b shadow-md'>
      <AppLogo />
      <div className='flex flex-row gap-2 items-center '>
        <Image src={session?.user?.image!} alt='profile' className='rounded-full' height={32} width={32} />
        <p className='truncate'>{session?.user?.name}</p>
        <Button variant={"outline"} onClick={() => signOut()}>
          sign out
        </Button>
      </div>
    </nav>
  );
};

export default NavBar;
