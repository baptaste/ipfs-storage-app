import { BrowserRouter as Router } from 'react-router-dom'
import { Suspense } from 'react'
import { Spinner } from './components/Common'
import { AuthProvider } from './features/auth'
import { PasswordsProvider } from './features/passwords'
import { AppRoutes } from './routes'

export default function App() {
	return (
		<AuthProvider>
			<PasswordsProvider>
				<Router>
					<Suspense fallback={<Spinner size='screen' />}>
						<AppRoutes />
					</Suspense>
				</Router>
			</PasswordsProvider>
		</AuthProvider>
	)
}
