import httpClient from "../../../../lib/axios";

export type DeleteUserResponse = {
  success: boolean;
  deleted: boolean;
  message?: string;
};

export function deleteUser(userId: string): Promise<DeleteUserResponse> {
  return new Promise((resolve, reject) => {
    httpClient
      .delete(`/users/delete/${userId}`, { withCredentials: true })
      .then((res) => {
        console.log("deleteUser - res:", res);
        resolve(res.data);
      })
      .catch((err) => {
        console.log("api - deleteUser, err:", err);
        reject(err.response.data);
      });
  });
}
