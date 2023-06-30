import * as React from "react";
import { HeaderNav, TabNav } from "../../Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { updateView } from '../../../utils/browser';
import { Outlet, useLocation } from "react-router-dom";
import { isMobile } from "../../../utils/browser";
import { Sidebar } from "../Sidebar";
import { useManager } from "../../../features/store";
import { FeaturesLinks } from "../../../features/components";
import { FeaturesRoutes } from "../../../features/routes";

interface MainLayoutProps {
	children: React.ReactNode;
}

export function MainLayout(props: MainLayoutProps) {
	const { children } = props;
	// const darkTheme = "dark:bg-slate-900 dark:text-slate-50";
	// const location = useLocation();
	const manager = useManager();

	return (
		<div
			className={`MainLayout relative top-0 left-0 md:left-[245px] w-full h-auto md:w-[calc(100%-245px)] min-h-screen flex md:justify-between overflow-y-scroll bg-slate-50 text-slate-900 px-4 pt-[100px] pb-20 md:px-0 md:pt-0 md:pb-10`.trim()}
		>
			<HeaderNav />
			<Sidebar>
				<FeaturesLinks />
			</Sidebar>
			{children}
			{manager.feature.route != null &&
			manager.feature.route.includes(FeaturesRoutes.dashboard) ? (
				<span className="Divider hidden md:block w-[1px] fixed top-0 left-[calc(245px+400px)] h-full border-r border-solid border-1 border-slate-300"></span>
			) : null}
			<TabNav />
			<ToastContainer />
		</div>
	);
}
