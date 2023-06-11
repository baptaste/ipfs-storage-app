import httpClient from "../../../../lib/axios";

export type LogoutResponse = {
	success: boolean;
	accessToken?: string | null;
	message?: string;
};

export function logout(): Promise<LogoutResponse> {
	return new Promise((resolve, reject) => {
		httpClient
			.get("/auth/logout", { withCredentials: true })
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				console.error("api - logout error:", err);
				reject(err);
			});
	});
}
