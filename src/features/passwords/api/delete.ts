import httpClient from '../../../lib/axios'

export type DeletePasswordResponse = {
	success: boolean
	deleted?: boolean
	message?: string
}

export function deletePassword(encryptionId: string): Promise<DeletePasswordResponse> {
	return new Promise((resolve, reject) => {
		httpClient
			.delete('/passwords/delete', {
				data: { encryptionId },
				withCredentials: true
			})
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				console.error('api - deletePassword, catch err:', err)
				reject(err)
			})
	})
}
