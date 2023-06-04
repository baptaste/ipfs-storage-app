import * as React from 'react';
import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
import { useAuth } from '../features/auth';
import { lazyImport } from '../utils/imports';
import { protectedRoutes } from './protected';
import { publicRoutes } from './public';

const Landing = lazyImport('../features/landing', 'Landing');

export function AppRoutes() {
	const navigate = useNavigate();
	const context = useAuth();
	const { loggedIn, error } = context;

	const commonRoutes = [
		{ path: '/', element: loggedIn ? <Navigate to='/dashboard' replace /> : <Landing /> },
		{ path: '*', element: <Navigate to='/' replace /> },
	];

	const routes = loggedIn ? protectedRoutes : publicRoutes;

	const elements = useRoutes([...routes, ...commonRoutes]);

	React.useEffect(() => {
		console.log('AppRoutes index - Context:', context);

		if (loggedIn) {
			navigate('/dashboard');
		}

		if (error && (error.response?.status === 401 || error.response?.status === 403)) {
			const { message } = error.response.data;
			console.log('AppRoutes - error:', error);
			if (message === 'Forbidden - Token expired') {
				navigate('/auth/login'); // user has invalid token and needs to login again
			} else if (message === 'Forbidden - JsonWebTokenError: jwt must be provided') {
				navigate('/auth/register'); // user doesnt have a token yet, needs to sign up
			}
		}
	}, [loggedIn, error]);

	return <>{elements}</>;
}
