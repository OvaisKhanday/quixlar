import { FC, HTMLAttributes } from "react";
import NavBar from "./NavBar";

interface DashboardLayoutProps extends HTMLAttributes<HTMLDivElement> {}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default DashboardLayout;
