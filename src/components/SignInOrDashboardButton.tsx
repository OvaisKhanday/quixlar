import { useSession } from "next-auth/react";
import { Span } from "next/dist/trace";
import Link from "next/link";
import { ButtonHTMLAttributes, FC, HTMLAttributes } from "react";
import { Button } from "./ui/button";
import GoogleAuthButton from "./GoogleAuthButton";

interface SignInOrDashboardButtonProps extends HTMLAttributes<HTMLSpanElement> {}

const SignInOrDashboardButton: FC<SignInOrDashboardButtonProps> = ({ ...props }) => {
  const { data: session } = useSession();
  return (
    <span {...props}>
      {session ? (
        <Link href={"/dashboard"}>
          <Button className='text-md'>Dashboard ✨</Button>
        </Link>
      ) : (
        <GoogleAuthButton {...props} />
      )}
    </span>
  );
};

export default SignInOrDashboardButton;
