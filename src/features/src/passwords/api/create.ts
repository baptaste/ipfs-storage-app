import httpClient from "../../../../lib/axios";
import { arrayBufferToUint8Array } from "../../../../utils/bytes";
import { IEncryptedData } from "../../../../utils/encryption";
import { IPassword } from "../types";

export type CreatePasswordResponse = {
  success: boolean;
  password?: IPassword;
  message?: string;
};

export function createPassword(
  password: IEncryptedData,
  title?: string,
  websiteUrl?: string,
): Promise<CreatePasswordResponse> {
  let data: any = {
    password: {
      ...password,
      encrypted: arrayBufferToUint8Array(password.encrypted),
    },
  };
  if (title) {
    data = { ...data, title };
  }
  if (websiteUrl) {
    data = { ...data, websiteUrl };
  }

  return new Promise((resolve, reject) => {
    httpClient
      .post("/passwords/create", data, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log("api - createPassword err:", err);
        reject(err);
      });
  });
}
