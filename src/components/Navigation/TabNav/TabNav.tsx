import * as React from "react";
import { Link } from "react-router-dom";
import { Cog6ToothIcon, HomeIcon } from "@heroicons/react/24/outline";
import { FeatureNames, FeaturesRoutes } from "../../../features/manager";

export function TabNav() {
  const links = [
    {
      path: FeaturesRoutes.dashboard,
      name: FeatureNames.dashboard,
      icon: <HomeIcon className="w-7 h-7 text-slate-900" />,
      containerClass: "w-14 h-14 flex justify-center items-center",
    },
    {
      path: FeaturesRoutes.account,
      name: FeatureNames.account,
      icon: <Cog6ToothIcon className="w-7 h-7 text-slate-900" />,
      containerClass: "w-14 h-14 flex justify-center items-center",
    },
  ];

  return (
    <div className="TabNav md:hidden fixed bottom-0 left-0 w-screen h-16 border-t border-solid border-1 border-slate-300 bg-slate-50 text-slate-900">
      <nav className="w-full h-full flex items-center justify-around bg-black-100">
        {links.map(({ path, name, icon, containerClass }: any) => (
          <div key={name} className={containerClass}>
            <Link key={name} to={path} className="flex justify-center items-center">
              {icon}
            </Link>
          </div>
        ))}
      </nav>
    </div>
  );
}
