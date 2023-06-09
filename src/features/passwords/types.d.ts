export interface IPassword {
	_id: string;
	encryption_id: string;
	owner_id: string;
	created_at: string;
	ipfs: IpfsDataType;
	displayed_name: string;
	plaintext: string | null; // client-only property
	visible: boolean; // client-only property

	image_url?: string;
	title?: string;
	updated_at?: string;
	website_url?: string;
}

export interface IpfsDataType {
	cid: string;
	size: number;
	path: string;
}

export type IPasswords = IPassword[];

export type DispatchActionType =
	| "passwords"
	| "loading"
	| "error"
	| "retrieve"
	| "visibility"
	| "delete"
	| "create";

export interface IPasswordsState {
	passwords: IPasswords;
	loading: boolean;
	error: any;
}
