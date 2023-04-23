import React, { useRef, useState } from 'react'
import { useNavigate, redirect, Link } from 'react-router-dom'
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { Button } from '../../../../components/Common/Button'
import { Input } from '../../../../components/Form/Input'
import { InputPassword } from '../../../../components/Form/InputPassword'
import { register } from '../../api'
import { Spinner } from '../../../../components/Common'
import { VisiterLayout } from '../../../../components/Layout'
import { StorageHost, UserPreferences, UserStorage } from '../../api/types.d'
import { toastError } from '../../../../lib/toast'

interface IRegisterState {
	[key: string]: string | boolean
	email: string
	password: string
	loading: boolean
	error: boolean
	errorMsg: string
}

export function Register() {
	const navigate = useNavigate()

	const [state, setState] = useState<IRegisterState>({
		email: '',
		password: '',
		loading: false,
		error: false,
		errorMsg: ''
	})

	const handleChange = (input: string, event: React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => ({ ...state, error: false, errorMsg: '', [input]: event.target.value }))
	}

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		setState((state) => ({ ...state, loading: true }))

		const storage: UserStorage = {
			use_blockchain: true,
			use_ipfs: false,
			host: StorageHost.blockchain
		}

		const preferences: UserPreferences = {
			language: 'en'
		}

		const res = await register(state.email, state.password, storage, preferences)

		if (res.success) {
			setState((state) => ({ ...state, loading: false }))
			navigate('/auth/login', { state: 'account_created' })
		} else {
			setState((state) => ({
				...state,
				loading: false,
				error: true,
				errorMsg: res.message ? res.message : ''
			}))
			toastError('An error occurred while creating your account')
		}
	}

	return (
		<VisiterLayout title='Create Account'>
			<h1 className='text-2xl font-bold mb-5'>Welcome friend!</h1>
			<div className='text-lg'>
				Already an account ?{' '}
				<Link to={'/auth/login'} className='font-bold'>
					Log in
				</Link>
			</div>

			<form
				onSubmit={handleSubmit}
				className='w-full my-4 flex flex-col items-center justify-evenly'
			>
				{state.errorMsg?.length ? (
					<p className='w-full text-center text-red-500 text-md my-4'>{state.errorMsg}</p>
				) : null}

				<Input
					type='email'
					name='Email'
					placeholder='Email'
					value={state.email}
					error={state.error}
					onChange={(e) => handleChange('email', e)}
				/>

				<InputPassword
					name='Password'
					value={state.password}
					error={state.error}
					placeholder='Password'
					onChange={(e) => handleChange('password', e)}
				/>

				<Button
					title='Register'
					type='submit'
					disabled={!state.email.length || !state.password.length || state.error}
					isLoading={state.loading}
				/>
			</form>
		</VisiterLayout>
	)
}
