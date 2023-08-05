import * as React from "react";
import { ToastContainer } from "react-toastify";

import { HeaderNav, TabNav } from "../../Navigation";
import { Sidebar } from "../Sidebar";
import { FeaturesRoutes, useManager } from "../../../features/manager";
import { FeaturesNav } from "../../../features/components";

import "react-toastify/dist/ReactToastify.css";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout(props: MainLayoutProps) {
  const { children } = props;
  // const darkTheme = "dark:bg-slate-900 dark:text-slate-50";
  // const location = useLocation();
  const manager = useManager();

  const getDividerLine = (): React.JSX.Element | null => {
    if (
      !manager.feature.empty &&
      manager.feature.route != null &&
      manager.feature.route.includes(FeaturesRoutes.dashboard)
    ) {
      return (
        <span className="Divider hidden md:block w-[1px] fixed top-0 left-[calc(245px+400px)] h-full border-r border-solid border-1 border-slate-300" />
      );
    }
    return null;
  };

  return (
    <div
      className={`MainLayout relative top-0 left-0 md:left-[245px] w-full h-auto md:w-[calc(100%-245px)] min-h-screen flex justify-${
        manager.feature.empty ? "center" : "between"
      } items-center overflow-y-scroll bg-slate-50 text-slate-900 px-4 pt-[100px] pb-20 md:px-0 md:pt-0 md:pb-10`.trim()}
    >
      <HeaderNav />
      <Sidebar>
        <FeaturesNav />
      </Sidebar>
      {children}
      {getDividerLine()}
      <TabNav />
      <ToastContainer />
    </div>
  );
}
