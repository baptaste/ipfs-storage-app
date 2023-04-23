import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../../../../components/Common'
import { Input, InputPassword } from '../../../../components/Form'
import { usePasswords } from '../../store'
import { createPassword } from '../../api'
import { toastError } from '../../../../lib/toast'
import { useAuth } from '../../../auth'

export function CreatePassword() {
	const { user } = useAuth()
	const navigate = useNavigate()
	const { dispatch } = usePasswords()

	const [state, setState] = useState<any>({
		title: '',
		password: '',
		error: false,
		errorMsg: ''
	})

	const [isLoadingNewPassword, setIsLoadingNewPassword] = useState<boolean>(false)

	const handleChange = (input: string, event: React.ChangeEvent<HTMLInputElement>) => {
		setState((state: any) => ({
			...state,
			error: false,
			errorMsg: '',
			[input]: event.target.value
		}))
	}

	const onCreatePassword = async () => {
		if (!user) return
		setIsLoadingNewPassword(true)

		const res = await createPassword(state.title, state.password, user.storage.host)

		if (res.success) {
			setIsLoadingNewPassword(false)
			const password = { ...res.password, plaintext: null, visible: false }
			dispatch({ type: 'create', password })
			navigate('/dashboard/passwords', { state: 'created' })
		} else {
			setState((state: any) => ({
				...state,
				error: true,
				errorMsg: res.message
			}))
			toastError('An error occurred while creating your password')
		}
	}

	return (
		<>
			{state.errorMsg?.length ? (
				<p className='w-full text-center text-red-500 text-md mb-4'>{state.errorMsg}</p>
			) : null}

			<div className='w-full h-full flex flex-col items-center justify-between mt-5'>
				<div className='w-full flex flex-col items-center'>
					<Input
						type='text'
						label='Choose a title'
						placeholder='Google.com, Apple.com...'
						value={state.title}
						onChange={(e) => handleChange('title', e)}
					/>
					<InputPassword
						label='Enter a password'
						placeholder='Password'
						value={state.password}
						onChange={(e) => handleChange('password', e)}
					/>
				</div>

				<Button
					title='Create'
					onClick={onCreatePassword}
					disabled={!state.title || !state.password}
					theme='secondary'
					isLoading={isLoadingNewPassword}
				/>
			</div>
		</>
	)
}
