import httpClient from "../../../../lib/axios";

export type RetrieveNoteResponse = {
  success: boolean;
  data?: {
    encrypted: Uint8Array;
    vector: Uint8Array;
  };
  message?: string;
};

export function retrieveNote(encryptionId: string): Promise<RetrieveNoteResponse> {
  return new Promise((resolve, reject) => {
    httpClient
      .post(
        "/notes/retrieve",
        { encryptionId },
        {
          withCredentials: true,
        },
      )
      .then((res) => {
        console.log(
          "retrieveNote res",
          res.data.data.encrypted,
          "typeof",
          typeof res.data.data.encrypted,
        );
        console.log(
          "retrieveNote res",
          res.data.data.vector,
          "typeof",
          typeof res.data.data.vector,
        );
        resolve(res.data);
      })
      .catch((err) => {
        console.log("api - retrieveNote, catch err:", err);
        reject(err);
      });
  });
}
