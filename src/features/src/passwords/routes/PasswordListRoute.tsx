import * as React from "react";
import { Outlet } from "react-router-dom";

import { lazyImport } from "../../../../utils/imports";
import { FeatureNames, initialFeature, useManager } from "../../../store";
import { FeaturesRoutes } from "../../../routes";

const PasswordList = lazyImport("../features/src/passwords", "PasswordList");

export function PasswordListRoute() {
  const manager = useManager();

  React.useEffect(() => {
    manager.dispatch({
      type: "set_feature",
      feature: {
        ...initialFeature,
        name: FeatureNames.passwords,
        route: FeaturesRoutes.passwords,
      },
    });
  }, []);

  return (
    <>
      <PasswordList />
      <Outlet />
    </>
  );
}
