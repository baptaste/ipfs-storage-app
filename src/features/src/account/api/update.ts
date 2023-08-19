import httpClient from "../../../../lib/axios";
import { User } from "../../../types";

interface UpdateUserResponse {
  success: boolean;
  user: User;
  message?: string;
}

export function updateUser(user: User): Promise<UpdateUserResponse> {
  return new Promise((resolve, reject) => {
    httpClient
      .patch(`/users/update/${user._id}`, user, { withCredentials: true })
      .then((res) => {
        console.log("api - updateUser - res:", res);
        resolve(res.data);
      })
      .catch((err) => {
        console.log("api - updateUser err:", err);
        reject(err);
      });
  });
}
