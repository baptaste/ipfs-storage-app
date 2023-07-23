import * as React from "react";
import { useLocation } from "react-router-dom";
import { FeaturesNav } from "../../../components";
import { FeaturesRoutes } from "../../../manager";

export function Dashboard() {
  const location = useLocation();

  return (
    <div className="Dashboard w-full">
      <div
        className={`${
          location.pathname === FeaturesRoutes.dashboard ? "block" : "hidden"
        } md:hidden`}
      >
        <FeaturesNav />
      </div>
    </div>
  );
}
