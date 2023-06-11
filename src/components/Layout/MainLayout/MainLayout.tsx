import * as React from "react";
import { HeaderNav, TabNav } from "../../Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import { updateView } from '../../../utils/browser';
import { Outlet, useLocation } from "react-router-dom";
import { isMobile } from "../../../utils/browser";
import { Sidebar } from "../Sidebar";

interface MainLayoutProps {
	children: React.ReactNode;
	title: string;
	headerRightIcon?: React.ReactNode;
}

export function MainLayout({ children, title, headerRightIcon = null }: MainLayoutProps) {
	const darkTheme = "dark:bg-slate-900 dark:text-slate-50";
	const location = useLocation();

	// React.useEffect(() => {
	// 	if (location.pathname !== '/dashboard') {
	// 		updateView();
	// 	}
	// }, [location.pathname]);

	if (isMobile()) {
		console.log("on passe dans if isMobile");

		return (
			<div className="MainLayout h-auto flex flex-col flex-1 items-center overflow-y scroll bg-slate-50 text-slate-900 px-4 pt-[100px] pb-20">
				<HeaderNav rightIcon={headerRightIcon} />
				{children}
				<TabNav />
				<ToastContainer />
			</div>
		);
	}

	return (
		<div className="MainLayout relative top-0 left-0 md:left-[245px] w-full h-auto md:w-[calc(100%-245px)] min-h-screen flex md:justify-between md:gap-6 overflow-y scroll bg-slate-50 text-slate-900 px-10 pb-10 pt-24">
			{/* <Sidebar /> */}
			<HeaderNav rightIcon={headerRightIcon} />
			{children}
			<ToastContainer />
		</div>
	);
}
