import * as React from "react";
import { AuthContext } from "./context";
import { getAccessToken } from "../api";
import type { User } from "../api/types";
import { setHeaderToken } from "../../../../lib/axios";
import { toastError } from "../../../../lib/toast";
import { retrieveUserEncryptionKey } from "../../../../utils/encryption";

interface AuthProviderProps {
	children?: React.ReactNode;
}

export function AuthProvider(props?: AuthProviderProps) {
	const [accessToken, setAccessToken] = React.useState<string | null>(null);
	const [user, setUser] = React.useState<User | null>(null);
	const [encryptionKey, setEncryptionKey] = React.useState<CryptoKey | undefined>(undefined);
	const [error, setError] = React.useState<any>(null);
	const [loading, setLoading] = React.useState<boolean>(false);

	React.useEffect(() => {
		setLoading(true);

		getAccessToken()
			.then((res) => {
				setLoading(false);
				console.log("AuthProvider - getAccessToken, res.user:", res.user);
				console.log("AuthProvider - getAccessToken, res.accessToken:", res.accessToken);
				if (res.success && res.user && res.accessToken) {
					setAccessToken(res.accessToken);
					setHeaderToken(res.accessToken);
					setUser(res.user);
					retrieveUserEncryptionKey(res.user._id, res.user.password_key)
						.then((key) => setEncryptionKey(key))
						.catch((err) => console.error(err));
				} else {
					setError(res.message);
					toastError("Error");
				}
			})
			.catch((err) => {
				console.error("getAccessToken err:", err);
				setLoading(false);
				setError(err);
			});

		return () => {
			setAccessToken(null);
			setUser(null);
			setEncryptionKey(undefined);
			setError(null);
			setLoading(false);
		};
	}, []);

	React.useEffect(() => {
		if (accessToken) {
			setHeaderToken(accessToken);
		}
	}, [accessToken]);

	const authProviderValue = React.useMemo(() => {
		const loggedIn = accessToken !== null && user !== null && encryptionKey !== undefined;
		const valueObj = {
			accessToken,
			setAccessToken,
			loggedIn,
			user,
			setUser,
			encryptionKey,
			setEncryptionKey,
			error,
			loading,
		};
		return valueObj;
	}, [accessToken, user, encryptionKey, error, loading]);

	return <AuthContext.Provider value={authProviderValue}>{props?.children}</AuthContext.Provider>;
}
