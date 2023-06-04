import httpClient from '../../../lib/axios';

export type RetrievePasswordResponse = {
	success: boolean;
	data?: {
		encrypted: Uint8Array;
		vector: Uint8Array;
	};
	message?: string;
};

export function retrievePassword(encryptionId: string): Promise<RetrievePasswordResponse> {
	return new Promise((resolve, reject) => {
		httpClient
			.post(
				'/passwords/retrieve',
				{ encryptionId },
				{
					withCredentials: true,
				},
			)
			.then((res) => {
				console.log(
					'retrievePassword res',
					res.data.data.encrypted,
					'typeof',
					typeof res.data.data.encrypted,
				);
				console.log(
					'retrievePassword res',
					res.data.data.vector,
					'typeof',
					typeof res.data.data.vector,
				);
				resolve(res.data);
				// resolve({
				// 	...res.data,
				// 	encrypted: new Uint8Array(
				// 		Object.values(res.data.data.encrypted).map((value) => value),
				// 	),
				// 	vector: new Uint8Array(
				// 		Object.values(res.data.data.vector).map((value) => value),
				// 	),
				// });
			})
			.catch((err) => {
				console.log('api - retrievePassword, catch err:', err);
				reject(err);
			});
	});
}
