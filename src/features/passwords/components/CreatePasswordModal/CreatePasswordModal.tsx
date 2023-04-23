import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Spinner } from '../../../../components/Common'
import { Input, InputPassword } from '../../../../components/Form'
import { MainLayout } from '../../../../components/Layout'
import { createPassword } from '../../api'

interface ICreatePasswordModalProps {
	onSuccess: (data: any) => void
	onCancel: () => void
}

const FAKE_USER_ID = '639878749179d3bf8bfd088c' // user._id in real situation

export function CreatePasswordModal({ onSuccess, onCancel }: ICreatePasswordModalProps) {
	// const { user } = useAuth()
	// const navigate = useNavigate()

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
		setIsLoadingNewPassword(true)

		const { success, password, error } = await createPassword(
			FAKE_USER_ID, // user._id,
			state.title,
			state.password
		)

		if (success) {
			setIsLoadingNewPassword(false)
			onSuccess(password)
		} else if (error) {
			setState((state: any) => ({
				...state,
				error: true,
				errorMsg: error.response.data.message
			}))
		}
	}

	return (
		// <MainLayout title='Create password'>
		<>
			{state.errorMsg?.length ? (
				<p className='w-full text-center text-red-500 text-md mb-4'>{state.errorMsg}</p>
			) : null}
			<Input
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
			<div className='ModalButtons w-full flex items-center justify-evenly'>
				<div className='flex-1 pr-2'>
					<Button title='Cancel' onClick={onCancel} theme='quaternary' />
				</div>
				<div className='flex-1 pl-2'>
					<Button
						title='Save'
						onClick={onCreatePassword}
						disabled={!state.title || !state.password}
						theme='tertiary'
						isLoading={isLoadingNewPassword}
					/>
				</div>
			</div>
		</>
		// </MainLayout>
	)
}
