import * as React from "react";

import { lazyImport } from "../../../../utils/imports";
import { useManager } from "../../../manager";

const UpdateNote = lazyImport("../features/src/notes", "UpdateNote");

export function UpdateNoteRoute() {
  const manager = useManager();

  React.useEffect(() => {
    manager.dispatch({ type: "set_is_updating_item", updating: true });
  }, []);

  return <UpdateNote />;
}
