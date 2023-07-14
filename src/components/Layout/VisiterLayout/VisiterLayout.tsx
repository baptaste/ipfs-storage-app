import * as React from "react";
import { ToastContainer } from "react-toastify";
import { HeaderNav } from "../../Navigation";
import "react-toastify/dist/ReactToastify.css";

interface VisiterLayoutProps {
  children: React.ReactNode;
}

export function VisiterLayout(props: VisiterLayoutProps) {
  const { children } = props;
  // const darkTheme = "dark:bg-slate-900 dark:text-slate-50";
  return (
    <div className="VisiterLayout w-full h-screen flex flex-col flex-1 items-center justify-center px-4 py-20 overflow-y-scroll bg-slate-50 text-slate-900">
      <HeaderNav />
      {children}
      <ToastContainer />
    </div>
  );
}
