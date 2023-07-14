import * as React from "react";
import { APP_NAME } from "../../../config/constants";

interface SidebarProps {
  children: React.ReactNode;
}

export function Sidebar(props: SidebarProps) {
  const { children } = props;

  return (
    <section className="hidden md:block w-full md:width-sidebar h-screen fixed left-0 top-0 bottom-0 pt-6 pb-12 overflow-y-scroll bg-slate-900">
      <div className="h-full flex flex-col justify-between">
        <h1 className="neon-blur tracking-wider font-bold px-6 pb-6">{APP_NAME}</h1>
        {children}
      </div>
    </section>
  );
}
