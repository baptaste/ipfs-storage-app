import * as React from "react";

import { useAuth } from "../../auth";
import { fetchNotes } from "../api";
import { initialNotesState, notesReducer } from "./reducer";
import { NotesContext } from "./context";
import { getNotesWithUtilityProps } from "../utils/note";

interface NotesProviderProps {
  children?: React.ReactNode;
}

export function NotesProvider(props?: NotesProviderProps) {
  const { loggedIn } = useAuth();
  const [state, dispatch] = React.useReducer(notesReducer, initialNotesState);

  React.useEffect(() => {
    console.log("NotesProvider - loggedIn:", loggedIn);
    if (loggedIn) {
      console.log("NotesProvider mount, call fetchNotes... loggedIn:", loggedIn);
      dispatch({ type: "loading", loading: true });

      fetchNotes()
        .then((res) => {
          if (res.success && res.notes) {
            const notes = getNotesWithUtilityProps(res.notes);
            console.log("NotesProvider - res.notes", res.notes);
            dispatch({ type: "notes", notes });
          }
        })
        .catch((error) => dispatch({ type: "error", error }))
        .finally(() => dispatch({ type: "loading", loading: false }));
    }
  }, [loggedIn]);

  const notesValue = React.useMemo(
    () => ({
      notes: state.notes,
      note: state.note,
      error: state.error,
      loading: state.loading,
      dispatch,
    }),
    [state.notes, state.note, state.error, state.loading, dispatch],
  );

  return <NotesContext.Provider value={notesValue}>{props?.children}</NotesContext.Provider>;
}
