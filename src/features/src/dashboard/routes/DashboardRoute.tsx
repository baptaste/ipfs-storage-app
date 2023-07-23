import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";

import { FeaturesRoutes } from "../../../manager";
import { MainLayout } from "../../../../components/Layout";
import { Dashboard } from "../components";

export function DashboardRoute() {
  const location = useLocation();
  return (
    <MainLayout>
      {location.pathname === FeaturesRoutes.dashboard ? <Dashboard /> : null}
      <Outlet />
    </MainLayout>
  );
}
