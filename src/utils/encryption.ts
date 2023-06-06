import { encryptWithEncryptionKey, decryptWithEncryptionKey, getEncryptionKey } from './crypto';
import { getItem } from './indexedDB';

export async function retrieveUserEncryptionKey(userId: string, passwordKey: string) {
	try {
		const idbItem = await getItem(userId);
		console.log('retrieveUserEncryptionKey - idbItem: ', idbItem, 'passwordKey:', passwordKey);
		if (idbItem) {
			const unwrappedKey = await getEncryptionKey(
				passwordKey,
				idbItem.keyData.wrappedKey,
				idbItem.keyData.salt,
			);
			console.log('retrieveUserEncryptionKey - unwrappedKey: ', unwrappedKey);
			return unwrappedKey;
		}
	} catch (err) {
		console.error('retrieveUserEncryptionKey error:', err);
		throw err;
	}
}

export async function encryptText(payload: string, userId: string, password: string) {
	const encryptionKey = await retrieveUserEncryptionKey(userId, password);
	if (encryptionKey) {
		const result = await encryptWithEncryptionKey(encryptionKey, payload);
		console.log('encryptWithEncryptionKey result:', result);
		if (result) {
			return { encrypted: result.encryptedBuffer, vector: result.vector };
		}
	}
}

export async function decryptText(
	data: {
		encrypted: ArrayBuffer;
		vector: Uint8Array;
	},
	userId: string,
	password: string,
) {
	const encryptionKey = await retrieveUserEncryptionKey(userId, password);
	if (encryptionKey) {
		const result = await decryptWithEncryptionKey(encryptionKey, data);
		console.log('decryptWithEncryptionKey result:', result);
		if (result) {
			return result;
		}
	}
}
