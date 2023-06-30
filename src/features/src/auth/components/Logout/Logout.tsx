import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Spinner } from "../../../../../components/Common";
import { logout } from "../../api";
import { useAuth } from "../../store";
import { useManager } from "../../../../store";

export function Logout() {
	const navigate = useNavigate();
	const { setAccessToken } = useAuth();
	const manager = useManager();

	const onLogout = async () => {
		manager.dispatch({ type: "set_loading", loading: true });
		const res = await logout();
		if (res.success && res.accessToken === null) {
			manager.dispatch({ type: "set_loading", loading: false });
			setAccessToken(null);
			navigate("/");
		} else {
			manager.dispatch({ type: "set_loading", loading: false });
			manager.dispatch({
				type: "set_error",
				error: "An error occurred while logout to your account.",
			});
			manager.dispatch({
				type: "set_notification",
				notification: {
					status: "error",
					content: "An error occurred while logout to your account.",
				},
			});
		}
	};

	if (manager.loading) return <Spinner />;

	return <Button title="Log out" theme="tertiary" onClick={onLogout} />;
}
