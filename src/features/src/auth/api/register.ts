import httpClient from "../../../../lib/axios";
import type { User, UserPreferences } from "./types";

export type RegisterResponse = {
	success: boolean;
	user?: User | null;
	message?: string;
};

export function register(
	email: string,
	password: string,
	preferences: UserPreferences,
): Promise<RegisterResponse> {
	return new Promise((resolve, reject) => {
		httpClient
			.post("/users/create", {
				email,
				password,
				preferences,
			})
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				console.error("api - register error:", err);
				reject(err);
			});
	});
}
