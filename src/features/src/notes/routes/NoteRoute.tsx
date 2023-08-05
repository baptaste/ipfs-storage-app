import * as React from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { lazyImport } from "../../../../utils/imports";
import { useNotes } from "../store";
import type { INote } from "../types";
import { useManager } from "../../../manager";

const Note = lazyImport("../features/src/notes", "Note");

export function NoteRoute() {
  const { noteId } = useParams();
  const { notes } = useNotes();
  const location = useLocation();
  const manager = useManager();

  const note: INote | null | undefined = React.useMemo(() => {
    if (!noteId || !notes) return null;
    return notes.find((item: INote) => item._id === noteId);
  }, [notes, location.pathname]);

  // Navigate to previous page if there is no note or noteId
  if (noteId === undefined || noteId !== note?._id || !note) {
    return <Navigate to={location.state.from} replace />;
  }

  React.useEffect(() => {
    console.log("###### NoteRoute dispatch manager set_feature_item_id | note._id", note._id);

    manager.dispatch({ type: "set_feature_item_id", itemId: note._id });
  }, []);

  return (
    <>
      <Note note={note} />
      <Outlet />
    </>
  );
}
