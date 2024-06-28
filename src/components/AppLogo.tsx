import { cn } from "@/lib/utils";
import { FC } from "react";

interface AppLogoProps extends React.HTMLAttributes<HTMLHeadingElement> {}

const AppLogo: FC<AppLogoProps> = ({ className, ...props }) => {
  return (
    <h1 {...props} className={cn(`text-green-500 text-3xl font-bold`, className)}>
      Quixlar
    </h1>
  );
};

export default AppLogo;
