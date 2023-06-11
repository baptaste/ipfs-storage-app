import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { PlusSmallIcon, RocketLaunchIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../../features/src/auth";
import { updateView } from "../../../utils/viewTransition";
import { isMobile } from "../../../utils/browser";
import { FeaturesRoutes } from "../../../features/routes";

interface HeaderNavProps {
	title?: string;
	rightIcon?: React.ReactNode;
}

export function HeaderNav(props: HeaderNavProps) {
	const { title, rightIcon } = props;
	const navigate = useNavigate();
	const location = useLocation();
	const goBack = () => navigate(-1);
	const { loggedIn } = useAuth();

	// option numero 1 : via props title passé a MainLayout (propre mais revoir completement l'UI avec les Outlet)
	// CURRENT option numero 2 : via l'obj location => nom de l'item mis dans location.state (pas ouf mais devrait marcher)
	// option numero 3 : créér un FeaturesProvider (feature courante, item courant) (+ chiant)
	function getCurrentPageName() {
		if (title) return title;
		if (location.state !== null && location.state.pageName) {
			return location.state.pageName;
		}
		switch (location.pathname) {
			case FeaturesRoutes.login:
				return "Login";
			case FeaturesRoutes.register:
				return "Register";
			case FeaturesRoutes.dashboard:
				return "Dashboard";
			case FeaturesRoutes.passwords:
				return "Passwords";
			case FeaturesRoutes.settings:
				return "Settings";
			default:
				return "Ipfs Storage App";
		}
	}

	const pageName = getCurrentPageName();

	const leftIcon = React.useMemo(() => {
		if (!loggedIn) {
			return (
				<Link to="/" className="justify-start absolute left-4">
					<RocketLaunchIcon className="w-8 h-8 text-slate-900 color-primary" />
				</Link>
			);
		}

		if (location.pathname !== FeaturesRoutes.dashboard) {
			return (
				<button
					className="GoBack justify-start absolute left-4"
					onClick={() => {
						if (!isMobile()) {
							goBack();
							return;
						}
						updateView("old", goBack);
					}}
				>
					<ArrowLeftIcon className="w-6 h-6 text-slate-500" />
				</button>
			);
		}

		return null;
	}, [loggedIn, location.pathname]);

	return (
		<header className="HeaderNav fixed top-0 left-0 md:left-[245px] w-full md:w-[calc(100%-245px)] w-screen h-16 z-50 flex items-center justify-center p-4 border-b border-solid border-1 border-slate-300 bg-slate-50 text-slate-900">
			{leftIcon}
			<p
				className={`flex-1 ${
					location.pathname !== "/dashboard" ? "text-center" : ""
				} text-lg font-bold`}
			>
				{pageName}
			</p>
			{rightIcon ? <div className="absolute right-4">{rightIcon}</div> : null}
		</header>
	);
}
