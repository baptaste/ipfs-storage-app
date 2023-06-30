import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DangerZone } from "../../../../../components/Common";
import { deleteAccount } from "../../api";
import { setHeaderToken } from "../../../../../lib/axios";
import { useAuth } from "../../store";

export function DeleteAccount() {
	const { user, setUser, setAccessToken } = useAuth();
	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const navigate = useNavigate();

	const onDeleteAccount = async () => {
		if (!user) return;

		setLoading(true);

		const res = await deleteAccount(user._id);

		if (res.success) {
			setLoading(false);
			setUser(null);
			setAccessToken(null);
			setHeaderToken(null);
			navigate("/auth/login", { state: "account_deleted" });
		} else {
			setLoading(false);
			setError(res.message ? res.message : "");
		}
	};

	return (
		<>
			{error.length ? (
				<p className="w-full text-center text-red-500 text-base my-4">{error}</p>
			) : null}

			<DangerZone
				title="Delete account"
				subtitle="Permanently delete your account."
				text="It involves the loss of all your data, including your profile, passwords etc.,
					  along with your authentification associations.
					  Once you delete your account, there is no going back so please be certain."
				confirmation="Delete account"
				loading={loading}
				onConfirm={onDeleteAccount}
			/>
		</>
	);
}
