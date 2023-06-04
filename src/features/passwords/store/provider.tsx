import { useEffect, useMemo, ReactNode, useReducer } from 'react';
import { useAuth } from '../../auth';
import { fetchPasswords } from '../api';
import { IPassword } from '../types';
import { PasswordsContext } from './context';
import { initialPasswordsState, passwordsReducer } from './reducer';

export function PasswordsProvider({ children }: { children: ReactNode }) {
	const { loggedIn } = useAuth();
	const [state, dispatch] = useReducer(passwordsReducer, initialPasswordsState);

	useEffect(() => {
		console.log('PasswordsProvider - loggedIn:', loggedIn);
		if (loggedIn) {
			console.log('PasswordsProvider mount, call fetchPasswords... loggedIn:', loggedIn);
			dispatch({ type: 'loading', loading: true });

			fetchPasswords()
				.then((res) => {
					if (res.success && res.passwords) {
						const passwords = JSON.parse(JSON.stringify(res.passwords)).map(
							(password: IPassword) => {
								return { ...password, plaintext: null, visible: false };
							},
						);
						console.log('PasswordsProvider - res.passwords', res.passwords);
						dispatch({ type: 'passwords', passwords });
					}
				})
				.catch((error) => dispatch({ type: 'error', error }))
				.finally(() => dispatch({ type: 'loading', loading: false }));
		}
	}, [loggedIn]);

	const passwordsValue = useMemo(() => {
		return {
			passwords: state.passwords,
			error: state.error,
			loading: state.loading,
			dispatch,
		};
	}, [state.passwords, state.error, state.loading, dispatch]);

	return <PasswordsContext.Provider value={passwordsValue}>{children}</PasswordsContext.Provider>;
}
