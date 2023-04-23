import { LockOpenIcon, LockClosedIcon, TrashIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from 'react-router-dom'
import { usePasswords } from '../../store'
import type { IPassword } from '../../types.d'

interface IPasswordProps {
	password: IPassword
}

export function UnlockedPassword({ password }: IPasswordProps) {
	const { pathname } = useLocation()
	const { dispatch } = usePasswords()

	const togglePasswordVisibility = () => {
		dispatch({ type: 'visibility', passwordId: password._id })
	}

	const onDeletePassword = () => {
		dispatch({ type: 'delete', passwordId: password._id })
	}

	return (
		<li
			id={password._id}
			className='Password w-full mb-8 border-b border-solid border-1 border-zinc-300 dark:border-zinc-800'
		>
			<Link to={`/dashboard/passwords/${password._id}`} state={{ password, from: pathname }}>
				<div className='flex flex-col'>
					<p className='text-lg font-bold pb-2'>{password.title}</p>
					<div className='flex items-center justify-between'>
						{password.visible ? (
							<>
								<p className='h-fit text-green-600 text-lg font-bold pb-2 pr-6 break-all'>
									{password.plaintext}
								</p>
								<div className='flex items-center pb-3'>
									<TrashIcon
										className='w-6 h-6 text-red-500 cursor-pointer'
										onClick={onDeletePassword}
									/>
									<LockOpenIcon
										className='lock-open w-6 h-6 ml-3 text-zinc-500 dark:text-zinc-50 cursor-pointer'
										onClick={togglePasswordVisibility}
									/>
								</div>
							</>
						) : (
							<>
								<p className='text-zinc-300 dark:text-zinc-700 text-lg font-bold pb-2'>
									**************
								</p>
								<div className='flex items-center pb-3'>
									<TrashIcon
										className='w-6 h-6 text-red-500 cursor-pointer'
										onClick={onDeletePassword}
									/>
									<LockClosedIcon
										className='lock-closed w-6 h-6 ml-3 text-zinc-500 dark:text-zinc-50 cursor-pointer'
										onClick={togglePasswordVisibility}
									/>
								</div>
							</>
						)}
					</div>
				</div>
			</Link>
		</li>
	)
}
