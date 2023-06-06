import { IEncryptionKey } from './crypto';

export interface IDBItem {
	userId: string;
	keyData: IEncryptionKey;
}

type IDatabase = IDBDatabase | null;

const DB_NAME = 'ipfsStorageApp';
const DB_VERSION = 1;
const OBJECT_STORE_NAME = 'cryptoKey';

function initDatabase(): Promise<IDatabase> {
	return new Promise((resolve, reject) => {
		const request = indexedDB.open(DB_NAME, DB_VERSION);
		request.onerror = (event) => {
			console.error('Failed to open IndexedDB:', (event.target as IDBOpenDBRequest).error);
			reject(
				new Error('Failed to open IndexedDB: ' + (event.target as IDBOpenDBRequest).error),
			);
		};
		request.onupgradeneeded = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			db.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'userId' });
			// You can add more indexes if needed
			// objectStore.createIndex('indexName', 'propertyName', { unique: false });
		};
		request.onsuccess = (event) => {
			const db = (event.target as IDBOpenDBRequest).result;
			resolve(db);
		};
	});
}

function getObjectStore(
	db: IDatabase,
	storeName: string,
	mode: IDBTransactionMode,
): IDBObjectStore {
	const transaction = db!.transaction(storeName, mode);
	return transaction.objectStore(storeName);
}

export async function createUserObjectStore(): Promise<void> {
	try {
		const db = await initDatabase();
		if (db!.objectStoreNames.contains(OBJECT_STORE_NAME)) {
			console.log('Object store "cryptoKey" already exists.');
			return;
		}
		db!.createObjectStore(OBJECT_STORE_NAME, { keyPath: 'userId' });
	} catch (error) {
		console.error('IndexedDB not initialized.', error);
	}
}

export async function addItem(item: IDBItem): Promise<void> {
	try {
		const db = await initDatabase();
		const objectStore = getObjectStore(db!, OBJECT_STORE_NAME, 'readwrite');
		console.log('addItem: objectStore:', objectStore);

		const request = objectStore.add(item);
		request.onerror = (event) => {
			console.error('Failed to add item:', (event.target as IDBRequest).error);
			throw new Error('Failed to add item: ' + (event.target as IDBRequest).error);
		};
		request.onsuccess = () => {
			console.log('IDBItem added successfully.');
		};
	} catch (error) {
		console.error('IndexedDB not initialized.', error);
	}
}

export function getItem(id: string): Promise<IDBItem | undefined> {
	return new Promise((resolve, reject) => {
		initDatabase()
			.then((db) => {
				const objectStore = getObjectStore(db!, OBJECT_STORE_NAME, 'readonly');
				const request = objectStore.get(id);
				request.onerror = (event) => {
					console.error('Failed to retrieve item:', (event.target as IDBRequest).error);
					reject(new Error('Failed to add item: ' + (event.target as IDBRequest).error));
				};
				request.onsuccess = () => {
					console.log('IDB getItem - request: ', request);
					resolve(request.result as IDBItem);
				};
			})
			.catch((err) => {
				console.error(err);
				reject(err);
			});
	});
}
