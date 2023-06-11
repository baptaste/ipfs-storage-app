import * as React from "react";
import { DangerZone, PasswordIcon } from "../../../../../components/Common";
import { usePasswords } from "../../store";
import { formatDate } from "../../../../../utils/date";
import { deletePassword } from "../../api";
import type { IPassword } from "../../types";
import { Input } from "../../../../../components/Form";
import { DecryptablePassword } from "../DecryptablePassword";
import { useLocation, useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../../../../lib/toast";
import { useAuth } from "../../../auth";

export function Password({ password }: { password: IPassword }) {
	const location = useLocation();
	const navigate = useNavigate();
	const { dispatch } = usePasswords();
	const { user } = useAuth();

	const [loading, setLoading] = React.useState<boolean>(false);
	const [error, setError] = React.useState<string>("");

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

	const getWebsiteURL = () => {
		if (!password.website_url) return "#";
		let url = password.website_url;
		if (!url.startsWith("https://www.")) {
			url = "https://www." + password.website_url;
		}
		return new URL(url).href;
	};

	// Notify user whenever password update is triggered
	React.useEffect(() => {
		console.log("•••••• Password component, item", password);

		if (location.state !== null && location.state === "updated") {
			toastSuccess("Password updated successfully !");
		}
	}, [location.state]);

	return (
		<main className="Password w-full overflow-y-scroll flex flex-col justify-between md:justify-normal">
			{error ? <p className="text-red-500">{error}</p> : null}

			<section className="Password w-full flex items-center gap-6 mb-12 px-8 pb-8 border-b border-solid border-1 border-slate-300">
				{password.image_url ? (
					<img src={password.image_url} />
				) : (
					<PasswordIcon open={password.plaintext !== null} size="small" showThemeStatus />
				)}
				<h1 className="text-2xl text-slate-900">{password.displayed_name}</h1>
			</section>

			{password.website_url ? (
				<div className="w-full flex items-center mb-6">
					<p className="w-24 text-md font-bold">Website</p>
					<a target="_blank" href={getWebsiteURL()} className="text-md">
						{password.website_url}
					</a>
				</div>
			) : null}

			<div className="w-full flex items-center mb-6">
				<p className="w-24 text-md font-bold">Name</p>
				<p className="text-md">{password.displayed_name}</p>
			</div>

			<div className="w-full flex flex-col gap-4 mb-6">
				<p className="text-md font-bold">Password</p>
				<DecryptablePassword password={password} />
			</div>

			{/* <section className="Password w-full flex flex-col mb-5">
				<Input value={password.displayed_name} placeholder="Name" disabled copyable />
				<DecryptablePassword password={password} />
			</section>



			<section className="General w-full flex flex-col mb-5">
				<h1 className="font-bold text-xl mb-3 text-slate-900">General</h1>
				<div className="w-full flex flex-col justify-center">
					{password.updated_at ? (
						<div className="w-full flex flex-col mb-5">
							<p className="text-slate-900">Last modified on</p>
							<p>{formatDate(password.updated_at, true, "en-US")}</p>
						</div>
					) : null}
					<div className="w-full flex flex-col mb-5">
						<p className="text-slate-900">Created on</p>
						<p>{formatDate(password.created_at, true, "en-US")}</p>
					</div>
				</div>
			</section> */}

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
