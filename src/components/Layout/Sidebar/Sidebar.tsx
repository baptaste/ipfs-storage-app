import * as React from "react";
import { useLocation } from "react-router-dom";
import { hideOnInaccurateRoutePath } from "../../../utils/views";

interface SidebarProps {
	children: React.ReactNode | React.ReactNode[];
}

export function Sidebar(props: SidebarProps) {
	const { children } = props;
	const location = useLocation();

	return (
		<div
			className={`${hideOnInaccurateRoutePath(
				"/dashboard",
			)} md:block w-full md:width-sidebar h-screen fixed left-0 top-0 px-4 py-12 overflow-y-scroll bg-slate-900`}
		>
			{children}
		</div>
	);
}
