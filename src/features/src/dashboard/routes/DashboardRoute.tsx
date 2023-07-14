import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { MainLayout } from "../../../../components/Layout";
import { FeaturesRoutes } from "../../../routes";
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
