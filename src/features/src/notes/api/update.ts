import httpClient from "../../../../lib/axios";
import { arrayBufferToUint8Array } from "../../../../utils/bytes";
import { IEncryptedData } from "../../../../utils/encryption";
import type { INote } from "../types";

export type UpdateNoteResponse = {
  success: boolean;
  note?: INote;
  updateType?: string;
  message?: string;
};

export function updateNote(
  encryptionId: string,
  note?: IEncryptedData,
  title?: string,
): Promise<UpdateNoteResponse> {
  return new Promise((resolve, reject) => {
    let data: any = {
      encryptionId,
    };
    if (note) {
      data = {
        ...data,
        note: {
          ...note,
          encrypted: arrayBufferToUint8Array(note.encrypted),
        },
      };
    }
    if (title) {
      data = { ...data, title };
    }

    httpClient
      .patch("/notes/update", data, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log("api - updateNote, catch err:", err);
        reject(err);
      });
  });
}
