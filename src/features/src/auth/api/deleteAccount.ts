import httpClient from "../../../../lib/axios";

export type DeleteAccountResponse = {
  success: boolean;
  deleted: boolean;
  message?: string;
};

export function deleteAccount(userId: string): Promise<DeleteAccountResponse> {
  return new Promise((resolve, reject) => {
    httpClient
      .delete(`/users/delete/${userId}`, { withCredentials: true })
      .then((res) => {
        console.log("deleteAccount - res:", res);
        resolve(res.data);
      })
      .catch((err) => {
        console.log("api - deleteAccount, err:", err);
        reject(err.response.data);
      });
  });
}
