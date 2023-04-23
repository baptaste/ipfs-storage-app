import { createContext, useContext } from 'react'
import type { IPasswords } from '../types.d'

export interface IPasswordsContext {
	passwords: IPasswords
	loading: boolean
	error: any
	dispatch: (action: any) => void
}

export const PasswordsContext = createContext<IPasswordsContext>({} as IPasswordsContext)

export const usePasswords = () => useContext(PasswordsContext)
