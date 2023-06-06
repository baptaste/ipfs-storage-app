//////////////////////
////// HASHING //////
//////////////////////

export async function pbkdf2Hash(payload: string) {
	try {
		const encoder = new TextEncoder();
		const salt = window.crypto.getRandomValues(new Uint8Array(16));
		const iterations = 100000;

		const derivedKey = await window.crypto.subtle.importKey(
			'raw',
			encoder.encode(payload),
			{ name: 'PBKDF2' },
			false,
			['deriveBits'],
		);

		const keyMaterial = await window.crypto.subtle.deriveBits(
			{
				name: 'PBKDF2',
				salt,
				iterations,
				hash: 'SHA-256',
			},
			derivedKey,
			256,
		);

		const hashArray = Array.from(new Uint8Array(keyMaterial));
		const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');

		const encodedSalt = Array.from(new Uint8Array(salt))
			.map((byte) => byte.toString(16).padStart(2, '0'))
			.join('');

		return `${iterations.toString(16).padStart(8, '0')}.${encodedSalt}.${hashHex}`;
	} catch (err) {
		console.error('pbkdf2Hash error:', err);
	}
}

export async function pbkdf2Verify(password: string, hashedPassword: string) {
	try {
		const [iterationsStr, saltHex, hashHex] = hashedPassword.split('.');
		const iterations = parseInt(iterationsStr, 16);
		const salt = new Uint8Array(saltHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));

		const derivedKey = await window.crypto.subtle.importKey(
			'raw',
			new TextEncoder().encode(password),
			{ name: 'PBKDF2' },
			false,
			['deriveBits'],
		);

		const keyMaterial = await window.crypto.subtle.deriveBits(
			{
				name: 'PBKDF2',
				salt,
				iterations,
				hash: 'SHA-256',
			},
			derivedKey,
			256,
		);

		const hashArray = Array.from(new Uint8Array(keyMaterial));
		const hash = hashArray.map((byte) => byte.toString(16).padStart(2, '0')).join('');

		return hash === hashHex;
	} catch (err) {
		console.error('pbkdf2Verify error:', err);
	}
}

//////////////////////
////// WRAP KEY //////
//////////////////////

/*
Given some key material, a password supplied by the user,
to use as input to the deriveKey method and some random salt,
derive an AES-KW key using PBKDF2.
*/
async function getDerivedKey(password: string, salt: Uint8Array) {
	const keyMaterial = await window.crypto.subtle.importKey(
		'raw',
		new TextEncoder().encode(password),
		{ name: 'PBKDF2' },
		false,
		['deriveBits', 'deriveKey'],
	);
	return window.crypto.subtle.deriveKey(
		{
			name: 'PBKDF2',
			salt,
			iterations: 100000,
			hash: 'SHA-256',
		},
		keyMaterial,
		{ name: 'AES-KW', length: 256 },
		true,
		['wrapKey', 'unwrapKey'],
	);
}

/*
Wrap the given key.
Exports + encrypts the key
*/
async function wrapCryptoKey(password: string, keyToWrap: CryptoKey, salt: Uint8Array) {
	// get the key encryption key
	// const keyMaterial = await getKeyMaterial(password);
	// salt = window.crypto.getRandomValues(new Uint8Array(16));
	const wrappingKey = await getDerivedKey(password, salt);
	return window.crypto.subtle.wrapKey('raw', keyToWrap, wrappingKey, 'AES-KW');
}

/*
Generate an encrypt/decrypt secret key,
then wrap it.
*/
export interface IEncryptionKey {
	wrappedKey: ArrayBuffer;
	salt: Uint8Array;
}

export async function generateEncryptionKey(password: string): Promise<IEncryptionKey> {
	const salt = window.crypto.getRandomValues(new Uint8Array(16));
	return window.crypto.subtle
		.generateKey(
			{
				name: 'AES-GCM',
				length: 256,
			},
			true,
			['encrypt', 'decrypt'],
		)
		.then((secretKey) => {
			console.log('generateEncryptionKey - secretKey:', secretKey);
			return wrapCryptoKey(password, secretKey, salt);
		})
		.then((wrappedKey) => {
			console.log('generateEncryptionKey - wrappedKey:', wrappedKey);
			return { wrappedKey, salt };
		});
}

//////////////////////
////// UNWRAP KEY ////
//////////////////////

/*
  Convert an array of byte values to an ArrayBuffer.
  */
// function bytesToArrayBuffer(bytes: Uint8Array): ArrayBuffer {
// 	const buffer = new ArrayBuffer(bytes.length);
// 	const view = new Uint8Array(buffer);
// 	for (let i = 0; i < bytes.length; i++) {
// 		view[i] = bytes[i];
// 	}
// 	return buffer;
// }

/*
  Derive an AES-KW key using PBKDF2.
  */
// async function getUnwrappingKey(storedSalt: Uint8Array) {
// 	// 1. get the key material (user-supplied password)
// 	const keyMaterial = await getKeyMaterial();
// 	// 2 initialize the salt parameter.
// 	// The salt must match the salt originally used to derive the key.
// 	// In this example it's supplied as a constant "saltBytes".
// 	// const saltBuffer = bytesToArrayBuffer(storedSalt);
// 	// 3 derive the key from key material and salt
// 	return window.crypto.subtle.deriveKey(
// 		{
// 			name: 'PBKDF2',
// 			salt: storedSalt,
// 			iterations: 100000,
// 			hash: 'SHA-256',
// 		},
// 		keyMaterial,
// 		{ name: 'AES-KW', length: 256 },
// 		true,
// 		['wrapKey', 'unwrapKey'],
// 	);
// }

/*
  Unwrap an AES secret key from an ArrayBuffer containing the raw bytes.
  Takes an array containing the bytes, and returns a Promise
  that will resolve to a CryptoKey representing the secret key.
  */
async function unwrapSecretKey(
	password: string,
	storedWrappedKey: ArrayBuffer,
	storedSalt: Uint8Array,
) {
	// get the key encryption key
	// const keyMaterial = await getKeyMaterial(password);
	// 1. get the unwrapping key
	// const unwrappingKey = await getUnwrappingKey(storedSalt);
	const unwrappingKey = await getDerivedKey(password, storedSalt);
	// 2. unwrap the key
	return window.crypto.subtle.unwrapKey(
		'raw', // import format
		storedWrappedKey, // ArrayBuffer representing key to unwrap
		unwrappingKey, // CryptoKey representing key encryption key
		'AES-KW', // algorithm identifier for key encryption key
		'AES-GCM', // algorithm identifier for key to unwrap
		true, // extractability of key to unwrap
		['encrypt', 'decrypt'], // key usages for key to unwrap
	);
}

export async function getEncryptionKey(
	password: string,
	storedWrappedKey: ArrayBuffer,
	storedSalt: Uint8Array,
) {
	try {
		console.log(
			'getEncryptionKey - password:',
			password,
			'storedWrappedKey:',
			storedWrappedKey,
			'storedSalt:',
			storedSalt,
		);
		const key = await unwrapSecretKey(password, storedWrappedKey, storedSalt);
		console.log('getEncryptionKey - key:', key);
		return key;
	} catch (err) {
		console.error('getEncryptionKey err:', err);
	}
}

export async function encryptWithEncryptionKey(encryptionKey: CryptoKey, data: any) {
	const dataBuffer = new TextEncoder().encode(JSON.stringify(data));
	const initializationVector: Uint8Array = window.crypto.getRandomValues(new Uint8Array(12));
	try {
		const encryptedDataBuffer = await window.crypto.subtle.encrypt(
			{
				name: 'AES-GCM',
				iv: initializationVector,
			},
			encryptionKey,
			dataBuffer,
		);
		return {
			encryptedBuffer: encryptedDataBuffer,
			vector: initializationVector,
		};
	} catch (err) {
		console.error('encryptWithEncryptionKey err:', err);
	}
}

export async function decryptWithEncryptionKey(
	encryptionKey: CryptoKey,
	data: {
		encrypted: ArrayBuffer;
		vector: Uint8Array;
	},
) {
	try {
		const decryptedDataBuffer = await window.crypto.subtle.decrypt(
			{
				name: 'AES-GCM',
				iv: data.vector,
			},
			encryptionKey,
			data.encrypted,
		);
		const decryptedtDataString = new TextDecoder().decode(decryptedDataBuffer);
		// because result is being treated as a string literal
		// it is always starting and ending with double quotes
		return decryptedtDataString.replace(/^"|"$/g, ''); // removes the double quotes at the beginning (^") and end ("$)
	} catch (err) {
		console.error('decryptWithEncryptionKey err:', err);
	}
}
