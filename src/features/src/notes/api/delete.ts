import httpClient from "../../../../lib/axios";

export type DeleteNoteResponse = {
  success: boolean;
  deleted?: boolean;
  message?: string;
};

export function deleteNote(encryptionId: string): Promise<DeleteNoteResponse> {
  return new Promise((resolve, reject) => {
    httpClient
      .delete("/notes/delete", {
        data: { encryptionId },
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error("api - deleteNote, catch err:", err);
        reject(err);
      });
  });
}
