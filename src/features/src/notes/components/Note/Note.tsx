import * as React from "react";
import { useNavigate } from "react-router-dom";

import { useNotes } from "../../store";
import type { INote } from "../../types";
import { useAuth } from "../../../auth";
import { FeaturesRoutes, useManager } from "../../../../manager";
import { DecryptableNote } from "../DecryptableNote";
import { deleteNote } from "../../api/delete";
import { DangerZone, NoteIcon } from "../../../../../components/Common";

interface NoteProps {
  note: INote;
}

export function Note(props: NoteProps) {
  const { note } = props;
  const navigate = useNavigate();
  const { dispatch } = useNotes();
  const { user } = useAuth();
  const manager = useManager();

  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");

  const onDeleteNote = async () => {
    if (!note || !user) return;
    setLoading(true);
    const res = await deleteNote(note.encryption_id);
    if (res.success && res.deleted) {
      setLoading(false);
      dispatch({ type: "delete", noteId: note._id });
      manager.dispatch({
        type: "set_notification",
        notification: {
          status: "success",
          content: "Note deleted successfully !",
        },
      });
      navigate(FeaturesRoutes.notes);
    } else {
      setLoading(false);
      setError(res.message ? res.message : "");
      manager.dispatch({
        type: "set_notification",
        notification: {
          status: "error",
          content: "An error occurred while deleting your note. Please try again.",
        },
      });
    }
  };

  if (manager.feature.updating) {
    return;
  }

  return (
    <main
      id="Note"
      className="w-full md:w-1/2 flex flex-col justify-between gap-6 md:justify-normal md:pt-[90px] md:px-6"
    >
      {error ? <p className="text-red-500">{error}</p> : null}
      <section className="w-full flex items-center gap-6 mb-6 pb-8 border-b border-solid border-1 border-slate-300">
        <NoteIcon />
        <h1 className="text-2xl text-slate-900">{note.title}</h1>
      </section>
      <div className="w-full flex flex-col gap-4">
        <p className="text-base font-bold">Note</p>
        <DecryptableNote note={note} />
      </div>
      <DangerZone
        title="Delete note"
        subtitle="Permanently delete a note."
        text="Once you delete a note, there is no going back so please be certain."
        loading={loading}
        onConfirm={onDeleteNote}
      />
    </main>
  );
}
