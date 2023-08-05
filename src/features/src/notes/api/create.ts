import httpClient from "../../../../lib/axios";
import { arrayBufferToUint8Array } from "../../../../utils/bytes";
import { IEncryptedData } from "../../../../utils/encryption";
import { INote } from "../types";

export type CreateNoteResponse = {
  success: boolean;
  note?: INote;
  message?: string;
};

export function createNote(note: IEncryptedData, title?: string): Promise<CreateNoteResponse> {
  let data: any = {
    note: {
      ...note,
      encrypted: arrayBufferToUint8Array(note.encrypted),
    },
  };

  if (title) {
    data = { ...data, title };
  }

  return new Promise((resolve, reject) => {
    httpClient
      .post("/notes/create", data, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log("api - createNote err:", err);
        reject(err);
      });
  });
}
