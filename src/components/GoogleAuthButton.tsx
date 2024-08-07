import { cn } from "@/lib/utils";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { FC } from "react";
import GoogleIcon from "../../public/icons8-google.svg";
import { Button } from "./ui/button";

interface GoogleAuthButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}
const GoogleAuthButton: FC<GoogleAuthButtonProps> = ({ className }, { ...props }) => {
  return (
    <Button className={cn("text-md", className)} onClick={() => signIn("google", { callbackUrl: "/dashboard" })} {...props}>
      <span className='flex flex-row gap-2 justify-center items-center p-2'>
        <Image priority src={GoogleIcon} alt='Google Icon' className='w-6 h-6' />
        Log in with Google
      </span>
    </Button>
  );
};

export default GoogleAuthButton;
