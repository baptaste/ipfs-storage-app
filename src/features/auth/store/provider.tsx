import { useEffect, useMemo, useState, ReactNode } from 'react'
import { AuthContext } from './context'
import { getAccessToken } from '../api'
import type { User } from '../api/types'
import { setHeaderToken } from '../../../lib/axios'
import { toastError } from '../../../lib/toast'

export function AuthProvider({ children }: { children: ReactNode }) {
	const [accessToken, setAccessToken] = useState<string | null>(null)
	const [user, setUser] = useState<User | null>(null)
	const [error, setError] = useState<any>(null)
	const [loading, setLoading] = useState<boolean>(false)

	useEffect(() => {
		setLoading(true)

		getAccessToken()
			.then((res) => {
				setLoading(false)
				console.log('AuthProvider - getAccessToken, res.user:', res.user)
				console.log('AuthProvider - getAccessToken, res.accessToken:', res.accessToken)
				if (res.success && res.user && res.accessToken) {
					setAccessToken(res.accessToken)
					setHeaderToken(res.accessToken)
					setUser(res.user)
				} else {
					setError(res.message)
					toastError('Error')
				}
			})
			.catch((err) => {
				console.error('getAccessToken err:', err)
				setLoading(false)
				setError(err)
			})

		return () => {
			setAccessToken(null)
			setUser(null)
			setError(null)
			setLoading(false)
		}
	}, [])

	useEffect(() => {
		if (accessToken) {
			setHeaderToken(accessToken)
		}
	}, [accessToken])

	const authValue = useMemo(() => {
		const loggedIn = accessToken !== null && user !== null
		return { accessToken, setAccessToken, loggedIn, user, setUser, error, loading }
	}, [accessToken, user, error, loading])

	return <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
}
