import { useState } from 'react'
import { Spinner } from '../../../../components/Common'
import { LockClosedIcon, TrashIcon } from '@heroicons/react/24/outline'
import { retrievePassword } from '../../api'
import { IPassword } from '../../types'
import { usePasswords } from '../../store'
import { Link, useLocation } from 'react-router-dom'

interface ILockedPasswordProps {
	password: IPassword
	userId: string
}

export function LockedPassword({ password, userId }: ILockedPasswordProps) {
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const { pathname } = useLocation()
	const { dispatch } = usePasswords()

	const onRetrievePassword = async () => {
		setIsLoading(true)
		const res = await retrievePassword(password.encryption_id)

		if (res.success && res.decrypted) {
			setIsLoading(false)
			dispatch({ type: 'retrieve', passwordId: password._id, value: res.decrypted })
		} else {
			setIsLoading(false)
			//setError(res.message ? res.message : '')
		}
	}

	const onDeletePassword = () => {
		dispatch({ type: 'delete', passwordId: password._id })
	}

	return (
		<li
			id={password._id}
			className='LockedPassword w-full mb-8 border-b border-solid border-1 border-zinc-300'
		>
			<Link to={`/dashboard/passwords/${password._id}`} state={{ password, from: pathname }}>
				<div className='flex flex-col'>
					<p className='text-lg font-bold pb-2'>{password.title}</p>
					<div className='flex items-center justify-between'>
						<p className='text-zinc-300 text-lg font-bold pb-2'>**************</p>
						<div className='flex items-center pb-3'>
							{isLoading ? (
								<Spinner size='small' />
							) : (
								<>
									<TrashIcon
										className='w-6 h-6 text-red-500 cursor-pointer'
										onClick={onDeletePassword}
									/>
									<LockClosedIcon
										className='lock-closed w-6 h-6 ml-3 text-zinc-500 cursor-pointer'
										onClick={onRetrievePassword}
									/>
								</>
							)}
						</div>
					</div>
				</div>
			</Link>
		</li>
	)
}
