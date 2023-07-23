import * as React from "react";
import { Outlet, useLocation } from "react-router-dom";

// import { lazyImport } from "../../../../utils/imports";
import {
  FeatureNames,
  FeatureType,
  FeaturesRoutes,
  initialFeature,
  useManager,
} from "../../../manager";

import { usePasswords } from "../store";
import { FeatureList } from "../../../components";
import { EmptyFeature } from "../../../../components/Common";

export function PasswordListRoute() {
  const location = useLocation();
  const manager = useManager();
  const { passwords, password, loading, error, dispatch } = usePasswords();

  React.useEffect(() => {
    manager.dispatch({
      type: "set_feature",
      feature: {
        ...initialFeature,
        empty: !passwords.length,
        name: FeatureNames.passwords,
        route: FeaturesRoutes.passwords,
        type: FeatureType.password,
      },
    });
  }, [passwords]);

  React.useEffect(() => {
    console.log("••••••••• PasswordListRoute - password", password);
    if (password && location.pathname === FeaturesRoutes.passwords) {
      console.log("••••••••• PasswordListRoute - reset password item");
      dispatch({ type: FeatureType.password, password: null });
    }
  }, [password, location.pathname]);

  if (!passwords.length && manager.feature.empty) {
    return (
      <EmptyFeature
        name={FeatureNames.passwords}
        redirectTo={`${FeaturesRoutes.passwords}/create`}
      />
    );
  }

  return (
    <>
      {/* <PasswordList /> */}
      <FeatureList
        type={FeatureType.password}
        data={passwords}
        dispatch={dispatch}
        loading={loading}
        error={error}
        name={FeatureNames.passwords}
        route={FeaturesRoutes.passwords}
      />
      <Outlet />
    </>
  );
}
