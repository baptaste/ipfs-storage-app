import { useState } from 'react'
import { PasswordIcon, Spinner } from '../../../../components/Common'
import { retrievePassword } from '../../api'
import { usePasswords } from '../../store'
import type { IPassword } from '../../types.d'
import { useClipboard } from '../../../../hooks/useClipboard'
import {
	CheckCircleIcon,
	ClipboardDocumentIcon,
	EyeIcon,
	EyeSlashIcon
} from '@heroicons/react/24/outline'
import { useAuth } from '../../../auth'

export function DecryptablePassword({ password }: { password: IPassword }) {
	const { dispatch } = usePasswords()
	const { user } = useAuth()

	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string>('')
	const { copied, copy } = useClipboard()

	const onRetrievePassword = async (): Promise<void> => {
		if (!password || !user) return
		setIsLoading(true)

		const res = await retrievePassword(password.encryption_id)

		if (res.success && res.decrypted) {
			setIsLoading(false)
			dispatch({ type: 'retrieve', passwordId: password._id, value: res.decrypted })
		} else {
			setIsLoading(false)
			setError(res.message ? res.message : '')
		}
	}

	const togglePasswordVisibility = (): void => {
		if (!password) return
		dispatch({ type: 'visibility', passwordId: password._id })
	}

	const onCopy = async () => {
		if (!password || password.plaintext === null) return
		await copy(password.plaintext)
	}

	const renderIcon = () => {
		if (isLoading) return <Spinner size='small' />

		if (password.plaintext === null) {
			return <PasswordIcon onClick={onRetrievePassword} />
		} else {
			return (
				<div className='flex items-center'>
					{password.visible ? (
						<EyeSlashIcon
							className='h-7 w-7 pt-0.5 text-zinc-500 dark:text-zinc-400 cursor-pointer'
							onClick={togglePasswordVisibility}
						/>
					) : (
						<EyeIcon
							className='h-7 w-7 pt-0.5 text-zinc-500 dark:text-zinc-400 cursor-pointer'
							onClick={togglePasswordVisibility}
						/>
					)}

					{copied ? (
						<CheckCircleIcon
							onClick={onCopy}
							className='h-7 w-7 pt-0.5 ml-3 text-green-700 cursor-pointer'
						/>
					) : (
						<ClipboardDocumentIcon
							onClick={onCopy}
							className='h-7 w-7 pt-0.5 ml-3 text-zinc-500 dark:text-zinc-400 cursor-pointer'
						/>
					)}
				</div>
			)
		}
	}

	return (
		<>
			<div className='DecryptablePassword w-full flex flex-col items-stretch justify-between mb-5 rounded-md'>
				<div className='min-h-[96px] w-full flex flex-col items-stretch justify-between p-4 bg-zinc-200 dark:bg-zinc-800 rounded-md'>
					<p className='text-md text-zinc-400'>Password</p>
					<div className='h-2/3 w-full flex items-start justify-between'>
						<input
							disabled={true}
							type={password.plaintext && password.visible ? 'text' : 'password'}
							value={password.plaintext ?? '****************'}
							className={`w-full pr-2 break-all rounded-md text-lg text-zinc-900 dark:text-zinc-50 bg-transparent ${
								password.visible ? 'text-ellipsis' : null
							}`}
						/>
						{renderIcon()}
					</div>
				</div>
			</div>
			{error ? <p className='text-red-500'>{error}</p> : null}
		</>
	)
}
