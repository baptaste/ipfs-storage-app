import * as React from "react";

import { lazyImport } from "../../../../utils/imports";

const ChangePassword = lazyImport("../features/src/settings", "ChangePassword");

export function ChangePasswordRoute() {
  return <ChangePassword />;
}
