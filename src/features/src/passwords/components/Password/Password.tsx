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
import { useManager } from "../../../../store";

export function Password({ password }: { password: IPassword }) {
	const location = useLocation();
	const navigate = useNavigate();
	const { dispatch } = usePasswords();
	const { user } = useAuth();
	const manager = useManager();

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

	if (manager.feature.updating) {
		return <></>;
	}

	return (
		<main className="Password w-full md:w-1/2 flex flex-col justify-between gap-6 md:justify-normal md:pt-[90px] md:px-6">
			{error ? <p className="text-red-500">{error}</p> : null}

			<section className="w-full flex items-center gap-6 mb-6 pb-8 border-b border-solid border-1 border-slate-300">
				{password.image_url ? (
					<img src={password.image_url} />
				) : (
					<PasswordIcon active={password.plaintext !== null} size="small" />
				)}
				<h1 className="text-2xl text-slate-900">{password.displayed_name}</h1>
			</section>

			{password.website_url ? (
				<div className="w-full flex items-center">
					<p className="w-24 text-base font-bold">Website</p>
					<a target="_blank" href={getWebsiteURL()} className="text-base">
						{password.website_url}
					</a>
				</div>
			) : null}

			<div className="w-full flex items-center">
				<p className="w-24 text-base font-bold">Name</p>
				<p className="text-base">{password.displayed_name}</p>
			</div>

			<div className="w-full flex flex-col gap-4">
				<p className="text-base font-bold">Password</p>
				<DecryptablePassword password={password} />
			</div>

			<div className="w-full flex items-center">
				<p className="w-24 text-base font-bold">Created on</p>
				<p className="text-base">{formatDate(password.created_at, true, "en-US")}</p>
			</div>

			{password.updated_at ? (
				<div className="w-full flex items-center">
					<p className="w-24 text-base font-bold">Last modified on</p>
					<p className="text-base">{formatDate(password.updated_at, true, "en-US")}</p>
				</div>
			) : null}
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
