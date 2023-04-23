import { Routes, Route } from 'react-router-dom'
import { lazyImport } from '../utils/imports'

const DashboardRoute = lazyImport('../features/dashboard', 'DashboardRoute')

const PasswordListRoute = lazyImport('../features/passwords', 'PasswordListRoute')
const CreatePasswordRoute = lazyImport('../features/passwords', 'CreatePasswordRoute')
const PasswordRoute = lazyImport('../features/passwords', 'PasswordRoute')
const UpdatePasswordRoute = lazyImport('../features/passwords', 'UpdatePasswordRoute')

const SettingsRoute = lazyImport('../features/settings', 'SettingsRoute')
const ChangePasswordRoute = lazyImport('../features/settings', 'ChangePasswordRoute')

function ProtectedRoutes() {
	return (
		<Routes>
			<Route path='dashboard'>
				<Route index element={<DashboardRoute />} />

				<Route path='passwords'>
					<Route index element={<PasswordListRoute />} />
					<Route path='create' element={<CreatePasswordRoute />} />
					<Route path=':passwordId'>
						<Route index element={<PasswordRoute />} />
						<Route path='update' element={<UpdatePasswordRoute />} />
					</Route>
				</Route>
			</Route>

			<Route path='settings'>
				<Route index element={<SettingsRoute />} />
				<Route path='password' element={<ChangePasswordRoute />} />
			</Route>
		</Routes>
	)
}

export const protectedRoutes = [
	{
		path: '/*',
		element: <ProtectedRoutes />
	}
]
