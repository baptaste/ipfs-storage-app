import * as React from "react";

import { lazyImport } from "../../../../utils/imports";
import { useManager } from "../../../manager";

const CreateNote = lazyImport("../features/src/notes", "CreateNote");

export function CreateNoteRoute() {
  const manager = useManager();

  React.useEffect(() => {
    manager.dispatch({ type: "set_is_creating_item", creating: true });
  }, []);

  return <CreateNote />;
}
