import { INote, INotes } from "../types";

export function getNotesWithUtilityProps(notes: INotes) {
  return JSON.parse(JSON.stringify(notes)).map((note: INote) => {
    return { ...note, plaintext: null, visible: false };
  });
}
