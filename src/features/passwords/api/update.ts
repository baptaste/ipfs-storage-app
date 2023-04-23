import httpClient from '../../../lib/axios'
import type { IPassword } from '../types.d'

export type UpdatePasswordResponse = {
	success: boolean
	password?: IPassword
	contractUpdated?: boolean
	updateType?: string
	message?: string
}

export function updatePassword(
	encryptionId: string,
	title: string,
	password: string
): Promise<UpdatePasswordResponse> {
	return new Promise((resolve, reject) => {
		httpClient
			.patch(
				'/passwords/update',
				{ encryptionId, title, password },
				{
					withCredentials: true
				}
			)
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				console.log('api - updatePassword, catch err:', err)
				reject(err)
			})
	})
}
