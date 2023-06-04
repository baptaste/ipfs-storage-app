import httpClient from '../../../lib/axios';
import { arrayBufferToUint8Array } from '../../../utils/bytes';
import { IPassword } from '../types';

export type CreatePasswordResponse = {
	success: boolean;
	password?: IPassword;
	message?: string;
};

export function createPassword(
	title: string,
	encryptedPassword: ArrayBuffer,
	encryptionVector: Uint8Array,
): Promise<CreatePasswordResponse> {
	console.log('createPassword - encryptedPassword', encryptedPassword);

	return new Promise((resolve, reject) => {
		httpClient
			.post(
				'/passwords/create',
				{
					title,
					password: arrayBufferToUint8Array(encryptedPassword),
					vector: encryptionVector,
				},
				{
					withCredentials: true,
				},
			)
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				console.log('api - createPassword err:', err);
				reject(err);
			});
	});
}
