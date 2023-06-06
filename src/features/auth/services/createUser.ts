import { generateEncryptionKey, pbkdf2Hash } from '../../../utils/crypto';
import { addItem, createUserObjectStore } from '../../../utils/indexedDB';
import { register } from '../api';
import { UserPreferences } from '../api/types';

export async function createUser(email: string, password: string, preferences: UserPreferences) {
	try {
		// 1. create indexedDB crypto key obj store
		await createUserObjectStore();
		// 2. hash/derive user master password using pbkdf2
		const passwordHash = await pbkdf2Hash(password);
		console.log('createUser service | pbkdf2Hash result:', passwordHash);
		if (passwordHash) {
			// 3. create encryption key derived from master password hash
			const keyData = await generateEncryptionKey(passwordHash);
			console.log('createUser service | generateEncryptionKey result:', keyData);
			if (keyData) {
				console.log('createUser service | Key successfully saved to indexedDB');
				// 5. register user to api
				const res = await register(email, passwordHash, preferences);
				console.log('createUser service | Api register user res:', res);

				if (res.success && res.user) {
					// 4. save wrapped encryption key into indexedDB
					await addItem({ userId: res.user._id, keyData });
					return res;
				}
			}
		}
	} catch (err) {
		console.error('Create User err:', err);
	}
}
