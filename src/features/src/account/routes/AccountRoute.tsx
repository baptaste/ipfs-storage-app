import * as React from "react";
import { MainLayout } from "../../../../components/Layout";
import { lazyImport } from "../../../../utils/imports";
import { FeatureNames, FeaturesRoutes, initialFeature, useManager } from "../../../manager";

const Account = lazyImport("../features/src/account", "Account");

export function AccountRoute() {
  const manager = useManager();

  React.useEffect(() => {
    manager.dispatch({
      type: "set_feature",
      feature: {
        ...initialFeature,
        name: FeatureNames.account,
        route: FeaturesRoutes.account,
      },
    });
  }, []);

  return (
    <MainLayout>
      <Account />
    </MainLayout>
  );
}
