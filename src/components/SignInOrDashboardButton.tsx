import { useSession } from "next-auth/react";
import Link from "next/link";
import { FC, HTMLAttributes } from "react";
import GoogleAuthButton from "./GoogleAuthButton";
import { Button } from "./ui/button";

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
