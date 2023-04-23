import httpClient from '../../../lib/axios'
import type { User, UserPreferences, UserStorage } from './types.d'

export type RegisterResponse = {
	success: boolean
	user?: User | null
	message?: string
}

export function register(
	email: string,
	password: string,
	storage: UserStorage,
	preferences: UserPreferences
): Promise<RegisterResponse> {
	return new Promise((resolve, reject) => {
		httpClient
			.post('/users/create', {
				email,
				plaintext: password,
				storage,
				preferences
			})
			.then((res) => {
				resolve(res.data)
			})
			.catch((err) => {
				console.error('api - register error:', err)
				reject(err)
			})
	})
}
