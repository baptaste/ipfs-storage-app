import httpClient from "../../../../lib/axios";
import type { IPasswords } from "../types";

export type PasswordsResponse = {
	success: boolean;
	passwords?: IPasswords;
	message?: string;
};

export function fetchPasswords(): Promise<PasswordsResponse> {
	return new Promise((resolve, reject) => {
		httpClient
			.get("/passwords", { withCredentials: true })
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				console.log("api - fetchPasswords, catch err:", err);
				reject(err);
			});
	});
}
