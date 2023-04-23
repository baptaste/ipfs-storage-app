export type User = {
	_id: string
	email: string
	storage: UserStorage
	preferences: UserPreferences
	created_at: string
}

export type UserStorage = {
	use_blockchain: boolean
	use_ipfs: boolean
	host: StorageHost
}

export type UserPreferences = {
	language: string
}

export enum StorageHost {
	ipfs = 'ipfs',
	blockchain = 'blockchain'
}
