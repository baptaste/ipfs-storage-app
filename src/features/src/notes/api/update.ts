import httpClient from "../../../../lib/axios";
import { arrayBufferToUint8Array } from "../../../../utils/bytes";
import { IEncryptedData } from "../../../../utils/encryption";
import type { INote } from "../types";

export type PatchNoteResponse = {
  success: boolean;
  note?: INote;
  updateType?: string;
  message?: string;
};

export function patchNote(
  encryptionId: string,
  note?: IEncryptedData,
  title?: string,
): Promise<PatchNoteResponse> {
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
        console.log("api - patchNote, catch err:", err);
        reject(err);
      });
  });
}
