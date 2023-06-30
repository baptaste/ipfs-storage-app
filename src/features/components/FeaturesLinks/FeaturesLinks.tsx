import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
	UnavailableIcon,
	PasswordIcon,
	HomeIcon,
	SettingsIcon,
	LogoutIcon,
} from "../../../components/Common";
import { isMobile } from "../../../utils/browser";
import { updateView } from "../../../utils/viewTransition";
import { FeaturesRoutes } from "../../routes";
import { FeatureNames, useManager } from "../../store";
import { capitalize } from "../../../utils/string";
import { Cog6ToothIcon } from "@heroicons/react/24/solid";
import { logout, useAuth } from "../../src/auth";

interface FeatureLink {
	available: boolean;
	name: FeatureNames | string;
	route: FeaturesRoutes | null;
	icon: JSX.Element;
	className?: string;
}

export function FeaturesLinks() {
	const navigate = useNavigate();
	const location = useLocation();
	const manager = useManager();
	const { setAccessToken } = useAuth();

	const handleFeatureLinkClick = (route: FeaturesRoutes | null) => {
		if (route == null || location.pathname === route) return;
		if (!isMobile()) return navigate(route);
		updateView("new", () => navigate(route));
	};

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
				type: "set_notification",
				notification: {
					status: "error",
					content: "An error occurred while logout to your account.",
				},
			});
		}
	};

	const links: FeatureLink[] = [
		{
			name: capitalize(FeatureNames.dashboard),
			route: FeaturesRoutes.dashboard,
			icon: <HomeIcon active={location.pathname === FeaturesRoutes.dashboard} />,
			available: true,
		},
		{
			name: capitalize(FeatureNames.passwords),
			route: FeaturesRoutes.passwords,
			icon: <PasswordIcon active={location.pathname.includes(FeaturesRoutes.passwords)} />,
			available: true,
		},
		// Coming soon
		{ name: "Notes", route: null, icon: <UnavailableIcon />, available: false },
		{ name: "Media", route: null, icon: <UnavailableIcon />, available: false },
		{ name: "Finance", route: null, icon: <UnavailableIcon />, available: false },
	];

	return (
		<nav className="FeaturesLinks w-ful h-full flex flex-col justify-between ">
			<ul className="flex flex-col gap-6">
				{links.map((link) => (
					<li id={link.name} className="w-full rounded-xl">
						<button
							key={link.name}
							onClick={() => handleFeatureLinkClick(link.route)}
							className={`text-slate-50 ${
								link.available ? "cursor-pointer" : "cursor-default"
							}`}
						>
							<div className="w-full flex items-center justify-between">
								<div className="flex items-center justify-between">
									{link.icon}
									<p
										className={`text-base ml-5 ${
											link.available
												? "text-slate-900 md:text-slate-50"
												: "text-slate-500"
										}`}
									>
										{link.name}
									</p>
								</div>
							</div>
						</button>
					</li>
				))}
			</ul>

			<ul className="flex flex-col gap-6">
				<li id="settings" className="w-full rounded-xl">
					<button
						onClick={() => handleFeatureLinkClick(FeaturesRoutes.settings)}
						className="text-slate-50"
					>
						<div className="w-full flex items-center justify-between">
							<div className="flex items-center justify-between">
								<SettingsIcon
									active={location.pathname === FeaturesRoutes.settings}
								/>
								<p className="text-base ml-5 text-slate-900 md:text-slate-50">
									Settings
								</p>
							</div>
						</div>
					</button>
				</li>
				<li id="logout" className="w-full rounded-xl">
					<button onClick={onLogout} className="text-slate-50">
						<div className="w-full flex items-center justify-between">
							<div className="flex items-center justify-between">
								<LogoutIcon />
								<p className="text-base ml-5 text-slate-900 md:text-slate-50">
									Logout
								</p>
							</div>
						</div>
					</button>
				</li>
			</ul>
		</nav>
	);
}
