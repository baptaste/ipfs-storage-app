export interface IPassword {
	_id: string;
	owner_id: string;
	encryption_id: string;
	ipfs: IpfsDataType;
	title?: string;
	plaintext: string | null;
	visible: boolean;
	website_url?: string;
	image_url?: string;
	created_at: string;
	updated_at?: string;
}

export interface IpfsDataType {
	cid: string;
	size: number;
	path: string;
}

export type IPasswords = IPassword[];

export type DispatchActionType =
	| 'passwords'
	| 'loading'
	| 'error'
	| 'retrieve'
	| 'visibility'
	| 'delete'
	| 'create';

export interface IPasswordsState {
	passwords: IPasswords;
	loading: boolean;
	error: any;
}
