import * as React from "react";

import { useAuth } from "../../auth";
import { fetchNotes } from "../api";
import { initialNotesState, notesReducer } from "./reducer";
import { NotesContext } from "./context";
import { getNotesWithUtilityProps } from "../utils/note";
import { useManager } from "../../../manager";

interface NotesProviderProps {
  children?: React.ReactNode;
}

export function NotesProvider(props?: NotesProviderProps) {
  const manager = useManager();
  const { loggedIn } = useAuth();

  const [state, dispatch] = React.useReducer(notesReducer, initialNotesState);

  const initNotes = async () => {
    dispatch({ type: "loading", loading: true });
    try {
      const res = await fetchNotes();
      if (res.success && res.notes) {
        const notes = getNotesWithUtilityProps(res.notes);
        dispatch({ type: "notes", notes });
      }
    } catch (err) {
      dispatch({ type: "error", err });
      manager.dispatch({
        type: "set_notification",
        notification: {
          status: "error",
          content: "An error occured while initializing your notes.",
        },
      });
    } finally {
      dispatch({ type: "loading", loading: false });
    }
  };

  React.useEffect(() => {
    let abort = false;

    if (!abort && loggedIn) {
      (async () => {
        await initNotes();
      })();
    }

    return () => {
      abort = true;
    };
  }, [loggedIn]);

  const notesValue = React.useMemo(() => {
    return {
      notes: state.notes,
      note: state.note,
      error: state.error,
      loading: state.loading,
      dispatch,
    };
  }, [state.notes, state.note, state.error, state.loading, dispatch]);

  return <NotesContext.Provider value={notesValue}>{props?.children}</NotesContext.Provider>;
}
