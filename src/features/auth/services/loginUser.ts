import { login, LoginResponse } from '../api';
import { getMasterPasswordHash } from '../api/masterPassword';
import { retrieveUserEncryptionKey } from './encryption';
import { verifyMasterPassword } from './masterPassword';

export interface LoginResult extends LoginResponse {
	encryptionKey?: CryptoKey | undefined;
}

export async function loginUser(
	email: string,
	plainPassword: string,
): Promise<LoginResult | undefined> {
	try {
		const passwordRecord = await getMasterPasswordHash(email);
		if (!passwordRecord.success) throw 'Error while getting master password record';
		const verified = await verifyMasterPassword(plainPassword, passwordRecord.hash);
		if (!verified) throw 'Invalid password';
		const res = await login(email);
		if (!res.success || !res.user) throw res.message;

		const { _id: userId, password_key } = res.user;
		console.log('loginUser - password_key: ', password_key);
		const unwrappedKey = await retrieveUserEncryptionKey(userId, password_key);
		console.log('loginUser - unwrappedKey: ', unwrappedKey);

		if (unwrappedKey) {
			return { ...res, encryptionKey: unwrappedKey } as LoginResult;
		} else {
			return res as LoginResponse;
		}
	} catch (err) {
		console.error('Login User err:', err);
		return {
			success: false,
			user: undefined,
			accessToken: null,
			message: err,
			encryptionKey: undefined,
		} as LoginResult;
	}
}
