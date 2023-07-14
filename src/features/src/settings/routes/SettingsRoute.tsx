import * as React from "react";
import { MainLayout } from "../../../../components/Layout";
import { lazyImport } from "../../../../utils/imports";
import { FeatureNames, initialFeature, useManager } from "../../../store";
import { FeaturesRoutes } from "../../../routes";

const Settings = lazyImport("../features/src/settings", "Settings");

export function SettingsRoute() {
  const manager = useManager();

  React.useEffect(() => {
    manager.dispatch({
      type: "set_feature",
      feature: {
        ...initialFeature,
        name: FeatureNames.settings,
        route: FeaturesRoutes.settings,
      },
    });
  }, []);

  return (
    <MainLayout>
      <Settings />
    </MainLayout>
  );
}
