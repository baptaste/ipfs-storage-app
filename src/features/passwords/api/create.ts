import httpClient from '../../../lib/axios';
import { arrayBufferToUint8Array } from '../../../utils/bytes';
import { IPassword } from '../types';

export type CreatePasswordResponse = {
	success: boolean;
	password?: IPassword;
	message?: string;
};

export function createPassword(
	encryptedPassword: ArrayBuffer,
	encryptionVector: Uint8Array,
	title?: string,
	websiteUrl?: string,
): Promise<CreatePasswordResponse> {
	console.log(
		'createPassword - encryptedPassword',
		encryptedPassword,
		'vector',
		encryptionVector,
	);
	let data: any = {
		password: arrayBufferToUint8Array(encryptedPassword),
		vector: encryptionVector,
	};
	if (title) data.title = title;
	if (websiteUrl) data.websiteUrl = websiteUrl;

	return new Promise((resolve, reject) => {
		httpClient
			.post('/passwords/create', data, {
				withCredentials: true,
			})
			.then((res) => {
				resolve(res.data);
			})
			.catch((err) => {
				console.log('api - createPassword err:', err);
				reject(err);
			});
	});
}
