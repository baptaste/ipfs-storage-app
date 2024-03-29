import httpClient from "../../../../lib/axios";
import { User } from "../../../types";

export type LoginResponse = {
  success: boolean;
  user?: User;
  accessToken?: string | null;
  message?: string;
};

export function login(email: string): Promise<LoginResponse> {
  return new Promise((resolve, reject) => {
    httpClient
      .post("/auth/login", { email }, { withCredentials: true })
      .then((res) => {
        console.log("api - login res:", res);
        resolve(res.data);
      })
      .catch((err) => {
        console.error("api - login error:", err);
        reject({ error: err });
      });
  });
}
