import { useEffect, useState } from "react";
import { DangerZone } from "../../../../components/Common";
import { usePasswords } from "../../store";
import { formatDate } from "../../../../utils/date";
import { deletePassword } from "../../api";
import type { IPassword } from "../../types.d";
import { Input } from "../../../../components/Form";
import { DecryptablePassword } from "../DecryptablePassword";
import { useLocation, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../../lib/toast";
import { useAuth } from "../../../auth";

export function Password({ password }: { password: IPassword }) {
	const location = useLocation();
	const navigate = useNavigate();
	const { dispatch } = usePasswords();
	const { user } = useAuth();

	const [loading, setLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");

	const onDeletePassword = async () => {
		if (!password || !user) return;

		setLoading(true);

		const res = await deletePassword(password.encryption_id);

		if (res.success && res.deleted) {
			setLoading(false);
			dispatch({ type: "delete", passwordId: password._id });
			navigate("/dashboard/passwords", { state: "deleted" });
		} else {
			setLoading(false);
			setError(res.message ? res.message : "");
			toastError("An error occurred while deleting your password");
		}
	};

	// Notify user whenever password update is triggered
	useEffect(() => {
		if (location.state !== null && location.state === "updated") {
			toastSuccess("Password updated successfully !");
		}
	}, [location.state]);

	return (
		<main className="Password w-full flex flex-col justify-between">
			{error ? <p className="text-red-500">{error}</p> : null}

			<section className="Password w-full flex flex-col mb-5">
				<Input value={password.displayed_name} placeholder="Name" disabled copyable />
				<DecryptablePassword password={password} />
			</section>

			<section className="General w-full flex flex-col mb-5">
				<h1 className="font-bold text-xl mb-3 text-zinc-900">General</h1>
				<div className="w-full flex flex-col justify-center">
					{password.updated_at ? (
						<div className="w-full flex flex-col mb-5">
							<p className="text-zinc-900">Last modified on</p>
							<p>{formatDate(password.updated_at, true, "en-US")}</p>
						</div>
					) : null}
					<div className="w-full flex flex-col mb-5">
						<p className="text-zinc-900">Created on</p>
						<p>{formatDate(password.created_at, true, "en-US")}</p>
					</div>
				</div>
			</section>

			<DangerZone
				title="Delete password"
				subtitle="Permanently delete a password."
				text="Once you delete a password, there is no going back so please be certain."
				loading={loading}
				onConfirm={onDeletePassword}
			/>
		</main>
	);
}
