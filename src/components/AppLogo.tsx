import { cn } from "@/lib/utils";
import { FC } from "react";
import localFont from "next/font/local";

const playwriteITModerna = localFont({
  src: "../../public/PlaywriteITModerna-Regular.ttf",
});
interface AppLogoProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const AppLogo: FC<AppLogoProps> = ({ className, ...props }) => {
  return (
    <h1 {...props} className={cn(`text-green-500 text-3xl font-bold m-2 lg:mb-4`, playwriteITModerna.className, className)}>
      Quixlar
    </h1>
  );
};

export default AppLogo;
