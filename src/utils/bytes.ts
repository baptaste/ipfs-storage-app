export function uint8ArrayToArrayBuffer(array: Uint8Array): ArrayBuffer {
	// return array.buffer.slice(array.byteOffset, array.byteLength + array.byteOffset);
	const buffer = new ArrayBuffer(array.length);
	const view = new Uint8Array(buffer);

	for (let i = 0; i < array.length; i++) {
		view[i] = array[i];
	}

	return buffer;
}

export function arrayBufferToUint8Array(array: ArrayBuffer): Uint8Array {
	return new Uint8Array(array);
}
