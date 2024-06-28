import { useSession } from "next-auth/react";
import { Span } from "next/dist/trace";
import Link from "next/link";
import { FC } from "react";
import { Button } from "./ui/button";
import GoogleAuthButton from "./GoogleAuthButton";

interface SignInOrDashboardButtonProps {}

const SignInOrDashboardButton: FC<SignInOrDashboardButtonProps> = ({}) => {
  const { data: session } = useSession();
  return (
    <span>
      {session ? (
        <Link href={"/dashboard"}>
          <Button>Dashboard ✨</Button>
        </Link>
      ) : (
        <GoogleAuthButton />
      )}
    </span>
  );
};

export default SignInOrDashboardButton;
