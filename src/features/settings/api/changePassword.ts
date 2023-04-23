import httpClient from '../../../lib/axios'
import { User } from '../../auth/api/types'

export type ChangePasswordResponse = {
	success: boolean
	user?: User
	message?: string
}

export function changePassword(plaintext: string): Promise<ChangePasswordResponse> {
	return new Promise((resolve, reject) => {
		httpClient
			.patch(
				'/users/update/password',
				{ plaintext },
				{
					withCredentials: true
				}
			)
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				console.log('api - changePassword err:', err)
				reject(err)
			})
	})
}
