import { pbkdf2Hash, pbkdf2Verify } from "../../../../utils/crypto";

export async function hashMasterPassword(password: string) {
	try {
		const hash = await pbkdf2Hash(password);
		if (hash) return hash;
	} catch (err) {
		console.error("hashMasterPassword hash error:", err);
	}
}

export async function verifyMasterPassword(password: string, hash: string) {
	try {
		const verified = await pbkdf2Verify(password, hash);
		return verified;
	} catch (err) {
		console.error("verifyMasterPassword error:", err);
	}
}
