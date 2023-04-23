import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Spinner } from '../../../../components/Common'
import { logout } from '../../api'
import { useAuth } from '../../store'

export function Logout() {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [errorMsg, setErrorMsg] = useState<string>('')

	const navigate = useNavigate()
	const { setAccessToken } = useAuth()

	const onLogout = async () => {
		setIsLoading(true)
		const res = await logout()

		if (res.success && res.accessToken === null) {
			setIsLoading(false)
			setAccessToken(null)
			navigate('/')
		} else {
			setIsLoading(false)
			setErrorMsg(res.message ? res.message : '')
		}
	}

	if (isLoading) return <Spinner />

	return (
		<>
			<Button title='Log out' theme='tertiary' onClick={onLogout} />
			{errorMsg.length ? (
				<p className='w-full text-center text-red-500 text-md my-4'>{errorMsg}</p>
			) : null}
		</>
	)
}
