import httpClient from '../../../lib/axios'

export type RetrievePasswordResponse = {
	success: boolean
	decrypted?: string
	message?: string
}

export function retrievePassword(encryptionId: string): Promise<RetrievePasswordResponse> {
	return new Promise((resolve, reject) => {
		httpClient
			.post(
				'/passwords/retrieve',
				{ encryptionId },
				{
					withCredentials: true
				}
			)
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				console.log('api - retrievePassword, catch err:', err)
				return reject(err)
			})
	})
}
