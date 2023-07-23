import { getTargetIdx } from "../../../../utils/array";
import { INote, INotes } from "../types";

export interface INotesState {
  notes: INotes;
  note: INote | null;
  loading: boolean;
  error: any;
}

export const initialNotesState: INotesState = {
  notes: [] as INotes,
  note: null,
  loading: false,
  error: null,
};

export const notesReducer = (state: INotesState, action: any): INotesState => {
  if (action.type === "notes") {
    return {
      ...state,
      notes: action.notes,
    };
  }
  if (action.type === "note") {
    return {
      ...state,
      note: action.note,
    };
  }
  if (action.type === "loading") {
    return {
      ...state,
      loading: action.loading,
    };
  }
  if (action.type === "error") {
    return {
      ...state,
      error: action.error,
    };
  }
  if (action.type === "retrieve") {
    return {
      ...state,
      notes: state.notes.map((note: INote) => {
        if (note._id === action.noteId) {
          return { ...note, plaintext: action.value, visible: true };
        }
        return note;
      }),
    };
  }
  if (action.type === "visibility") {
    return {
      ...state,
      notes: state.notes.map((note: INote) => {
        if (note._id === action.noteId) {
          return { ...note, visible: !note.visible };
        }
        return note;
      }),
    };
  }
  if (action.type === "delete") {
    const index = getTargetIdx(state.notes, action.noteId);
    const result = [...state.notes];
    result.splice(index, 1);
    return {
      ...state,
      notes: result,
    };
  }
  if (action.type === "create") {
    const newPassword = { ...action.note, plaintext: null, visible: false };
    return {
      ...state,
      notes: [...state.notes, newPassword],
    };
  }
  if (action.type === "update") {
    return {
      ...state,
      notes: state.notes.map((note: INote) => {
        if (note._id === action.noteId) {
          return { ...action.note, plaintext: null, visible: false };
        }
        return note;
      }),
    };
  }

  // default
  return state;
};
