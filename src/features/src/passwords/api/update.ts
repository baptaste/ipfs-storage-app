import httpClient from "../../../../lib/axios";
import { arrayBufferToUint8Array } from "../../../../utils/bytes";
import { IEncryptedData } from "../../../../utils/encryption";
import type { IPassword } from "../types";

export type UpdatePasswordResponse = {
  success: boolean;
  password?: IPassword;
  updateType?: string;
  message?: string;
};

export function updatePassword(
  encryptionId: string,
  password?: IEncryptedData,
  title?: string,
  websiteUrl?: string,
  email?: string,
  description?: string,
): Promise<UpdatePasswordResponse> {
  return new Promise((resolve, reject) => {
    let data: any = {
      encryptionId,
    };
    if (password) {
      data = {
        ...data,
        password: {
          ...password,
          encrypted: arrayBufferToUint8Array(password.encrypted),
        },
      };
    }
    if (title) {
      data = { ...data, title };
    }
    if (websiteUrl) {
      data = { ...data, websiteUrl };
    }
    if (email) {
      data = { ...data, email };
    }
    if (description) {
      data = { ...data, description };
    }

    httpClient
      .patch("/passwords/update", data, {
        withCredentials: true,
      })
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.log("api - updatePassword, catch err:", err);
        reject(err);
      });
  });
}
