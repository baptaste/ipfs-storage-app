export interface IPassword {
	_id: string
	owner_id: string
	encryption_id: string
	title: string
	plaintext: string | null
	visible: boolean
	created_at: string
	updated_at?: string
}

export type IPasswords = IPassword[]

export type DispatchActionType =
	| 'passwords'
	| 'loading'
	| 'error'
	| 'retrieve'
	| 'visibility'
	| 'delete'
	| 'create'

export interface IPasswordsState {
	passwords: IPasswords
	loading: boolean
	error: any
}
