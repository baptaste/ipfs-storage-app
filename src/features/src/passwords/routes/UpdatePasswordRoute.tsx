import * as React from "react";

import { lazyImport } from "../../../../utils/imports";
import { useManager } from "../../../store";

const UpdatePassword = lazyImport("../features/src/passwords", "UpdatePassword");

export function UpdatePasswordRoute() {
  const manager = useManager();

  React.useEffect(() => {
    manager.dispatch({ type: "set_is_updating_item", updating: true });
  }, []);

  return <UpdatePassword />;
}
