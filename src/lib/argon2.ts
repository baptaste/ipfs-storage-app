import * as argon2 from 'argon2';

export async function argon2Hash(plaintext: string): Promise<string | null> {
	try {
		const hash: string = await argon2.hash(plaintext, { type: argon2.argon2id });
		if (hash.length) return hash;
	} catch (error) {
		console.error(error);
	}
	return null;
}

export async function argon2Verify(hash: string, plaintext: string): Promise<boolean> {
	try {
		const match: boolean = await argon2.verify(hash, plaintext);
		if (match === false) return false;
		return true;
	} catch (error) {
		console.error(error);
	}
	return false;
}
