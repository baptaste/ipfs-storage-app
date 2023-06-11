import httpClient from "../../../../lib/axios";
import type { User } from "./types";

export type AccessTokenResponse = {
	success: boolean;
	user?: User;
	accessToken?: null | string;
	message?: string;
};

export function getAccessToken(): Promise<AccessTokenResponse> {
	return new Promise((resolve, reject) => {
		httpClient
			.get("/auth/refresh", { withCredentials: true })
			.then((res) => {
				console.log("REFRESH - res:", res);
				resolve(res.data);
			})
			.catch((err) => {
				console.log("api - refresh, catch err:", err);
				reject(err);
			});
	});
}
