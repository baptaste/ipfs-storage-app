import * as React from "react";

import { lazyImport } from "../../../../utils/imports";
import { useManager } from "../../../manager";

const CreatePassword = lazyImport("../features/src/passwords", "CreatePassword");

export function CreatePasswordRoute() {
  const manager = useManager();

  React.useEffect(() => {
    manager.dispatch({ type: "set_is_creating_item", creating: true });
  }, []);

  return <CreatePassword />;
}
