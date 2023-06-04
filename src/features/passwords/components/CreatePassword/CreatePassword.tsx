import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../../../components/Common';
import { Input, InputPassword } from '../../../../components/Form';
import { usePasswords } from '../../store';
import { createPassword } from '../../api';
import { toastError } from '../../../../lib/toast';
import { useAuth } from '../../../auth';
import { encryptText } from '../../../auth/services/encryption';

export function CreatePassword() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { dispatch } = usePasswords();

	const [state, setState] = useState<any>({
		title: '',
		password: '',
		error: false,
		errorMsg: '',
	});

	const [isLoadingNewPassword, setIsLoadingNewPassword] = useState<boolean>(false);

	const handleChange = (input: string, event: React.ChangeEvent<HTMLInputElement>) => {
		setState((state: any) => ({
			...state,
			error: false,
			errorMsg: '',
			[input]: event.target.value,
		}));
	};

	const onCreatePassword = async () => {
		if (!user) return;
		setIsLoadingNewPassword(true);
		const data = await encryptText(state.password, user._id, user.password_key);
		console.log('encryptText - data:', data);
		// TODO convert encrypted password arr buffer using formData because it cannot be send
		// as arraybuffer to server (see: https://stackoverflow.com/questions/48291288/how-to-send-array-buffer-data-along-with-string-json-to-nodejs-server)
		if (data?.encrypted) {
			const res = await createPassword(state.title, data.encrypted, data.vector);
			if (res.success) {
				setIsLoadingNewPassword(false);
				const password = { ...res.password, plaintext: null, visible: false };
				dispatch({ type: 'create', password });
				navigate('/dashboard/passwords', { state: 'created' });
			} else {
				setIsLoadingNewPassword(false);
				setState((state: any) => ({
					...state,
					error: true,
					errorMsg: res.message || 'An error occurred while creating your password.',
				}));
				toastError('An error occurred while creating your password.');
			}
		} else {
			setIsLoadingNewPassword(false);
			setState((state: any) => ({
				...state,
				error: true,
				errorMsg: 'An error occurred while encrypting your password.',
			}));
			toastError('An error occurred while encrypting your password.');
		}
	};

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
	);
}
