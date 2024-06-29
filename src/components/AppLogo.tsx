import { cn } from "@/lib/utils";
import { FC } from "react";
import localFont from "next/font/local";
import { useRouter } from "next/navigation";

const playwriteITModerna = localFont({
  src: "../../public/PlaywriteITModerna-Regular.ttf",
});
interface AppLogoProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const AppLogo: FC<AppLogoProps> = ({ className, ...props }) => {
  const router = useRouter();
  return (
    <h1
      onClick={() => {
        router.replace("/");
      }}
      {...props}
      className={cn(`text-primary cursor-pointer text-3xl font-extrabold m-2 lg:mb-4`, playwriteITModerna.className, className)}
    >
      Quixlar
    </h1>
  );
};

export default AppLogo;
