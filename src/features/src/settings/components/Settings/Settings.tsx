import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SlideSwitch } from "../../../../../components/Common";
import { toastSuccess } from "../../../../../lib/toast";
import { capitalize } from "../../../../../utils/string";
import { DeleteAccount, Logout, useAuth } from "../../../auth";

export function Settings() {
	const { user } = useAuth();
	const location = useLocation();

	useEffect(() => {
		if (location.state !== null && location.state === "password_updated") {
			toastSuccess("Account password updated successfully !");
		}
	}, [location.state]);

	return (
		<main className="Settings w-full flex flex-col justify-between">
			{user ? (
				<>
					{/* <section
						id='storage'
						className='w-full flex flex-col mb-10 border-b border-solid border-1 border-slate-300'
					>
						<h1 className='font-bold text-xl mb-3 text-slate-900'>Storage</h1>
						<div className='mb-5'>
							<SlideSwitch
								selected={storageHost ? capitalize(storageHost) : undefined}
								leftValue={capitalize(StorageHost.ipfs)}
								rightValue={capitalize(StorageHost.blockchain)}
								onChange={(v) => setStorageHost(v as StorageHost)}
							/>
						</div>
					</section> */}
					<section
						id="preferences"
						className="w-full flex flex-col mb-10 border-b border-solid border-1 border-slate-300"
					>
						<h1 className="font-bold text-xl mb-3 text-slate-900">Preferences</h1>
						<div className="w-full flex flex-col mb-5">
							<p className="text-lg">Language</p>
							<p className="text-md">{capitalize(user.preferences.language)}</p>
						</div>
					</section>
					<section id="account" className="w-full flex flex-col mb-5">
						<h1 className="font-bold text-xl mb-3 text-slate-900">Account</h1>
						<div className="w-full flex flex-col mb-5">
							<p className="text-lg">Email</p>
							<p className="text-md">{user.email}</p>
						</div>
						<div className="w-full flex flex-col mb-5">
							<p className="text-lg">Password</p>
							<Link to="/settings/password" className="text-lg">
								Change password
							</Link>
						</div>
						<div className="w-full mb-5">
							<Logout />
						</div>
						<div className="w-full mb-5">
							<DeleteAccount />
						</div>
					</section>
				</>
			) : null}
		</main>
	);
}
