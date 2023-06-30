import * as React from "react";
import { useLocation } from "react-router-dom";
import { hideOnInaccurateRoutePath } from "../../../utils/views";

interface SidebarProps {
	children: React.ReactNode | React.ReactNode[];
}

export function Sidebar(props: SidebarProps) {
	const { children } = props;
	// const location = useLocation();

	return (
		<section
			className={`hidden md:block w-full md:width-sidebar h-screen fixed left-0 top-0 bottom-0 px-6 pt-6 pb-12 overflow-y-scroll bg-slate-900`}
		>
			<div className="h-full flex flex-col justify-between">
				<h1 className="text-lg text-slate-300 pb-6">PinBook</h1>
				{children}
			</div>
		</section>
	);
}
