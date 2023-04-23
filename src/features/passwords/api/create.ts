import httpClient from '../../../lib/axios'
import { StorageHost } from '../../auth/api/types'
import { IPassword } from '../types'

export type CreatePasswordResponse = {
	success: boolean
	password?: IPassword
	message?: string
}

export function createPassword(
	title: string,
	password: string,
	storage: StorageHost
): Promise<CreatePasswordResponse> {
	return new Promise((resolve, reject) => {
		httpClient
			.post(
				'/passwords/create',
				{ title, password, storage },
				{
					withCredentials: true
				}
			)
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				console.log('api - createPassword err:', err)
				reject(err)
			})
	})
}
