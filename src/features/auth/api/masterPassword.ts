import httpClient from '../../../lib/axios';
import type { User } from './types.d';

interface MasterPasswordHashResponse {
	success: boolean;
	hash: string;
	message?: string;
}

export function getMasterPasswordHash(email: string): Promise<MasterPasswordHashResponse> {
	return new Promise((resolve, reject) => {
		httpClient
			.get(`/auth/password/${email}`, { withCredentials: true })
			.then((res) => {
				console.log('api - getMasterPasswordHash - res:', res);
				resolve(res.data);
			})
			.catch((err) => {
				console.log('api - getMasterPasswordHash err:', err);
				reject(err);
			});
	});
}
