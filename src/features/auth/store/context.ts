import { createContext, useContext } from 'react'
import type { User } from '../api/types.d'

export interface IAuthContext {
	accessToken: string | null
	setAccessToken: (data: string | null) => void
	loggedIn: boolean
	user: User | null
	setUser: (data: any) => void
	error: any
	loading: boolean
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext)

export const useAuth = () => useContext(AuthContext)
