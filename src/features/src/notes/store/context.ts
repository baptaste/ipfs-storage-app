import { createContext, useContext } from "react";
import { INote, INotes } from "../types";

export interface INotesContext {
  notes: INotes | [];
  note: INote | null;
  loading: boolean;
  error: any;
  dispatch: (action: any) => void;
}

export const NotesContext = createContext<INotesContext>({} as INotesContext);

export const useNotes = () => useContext(NotesContext);
