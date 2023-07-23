import httpClient from "../../../../lib/axios";
import type { INotes } from "../types";

export type NotesResponse = {
  success: boolean;
  notes?: INotes;
  message?: string;
};

export function fetchNotes(): Promise<NotesResponse> {
  return new Promise((resolve, reject) => {
    httpClient
      .get("/notes", { withCredentials: true })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log("api - fetchNotes, catch err:", err);
        reject(err);
      });
  });
}
