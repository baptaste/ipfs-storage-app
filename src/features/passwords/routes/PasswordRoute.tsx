import { useMemo } from 'react'
import { Link, Navigate, useLocation, useParams } from 'react-router-dom'
import { lazyImport } from '../../../utils/imports'
import { MainLayout } from '../../../components/Layout'
import { usePasswords } from '../store'
import type { IPassword } from '../types.d'
import { EditIcon } from '../../../components/Common'

const Password = lazyImport('../features/passwords', 'Password')

export function PasswordRoute() {
	const { passwordId } = useParams()
	const { passwords } = usePasswords()
	const location = useLocation()

	const password: IPassword | null | undefined = useMemo(() => {
		if (!passwordId || !passwords) return null
		console.log('PasswordRoute useMemo, passwords change!', passwords)
		return passwords.find((item: IPassword) => item._id === passwordId)
	}, [passwords])

	// Navigate to previous page if there is no password or passwordId
	if (passwordId === undefined || passwordId !== password?._id || !password) {
		return <Navigate to={location.state.from} replace />
	}

	return (
		<MainLayout
			title={password.title}
			headerRightIcon={
				<Link to={`/dashboard/passwords/${password._id}/update`}>
					<EditIcon />
				</Link>
			}
		>
			<Password password={password} />
		</MainLayout>
	)
}
