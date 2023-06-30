import * as React from "react";
import { useLocation } from "react-router-dom";
import { FeaturesLinks } from "../../../components";
import { FeaturesRoutes } from "../../../routes";

export function Dashboard() {
	const location = useLocation();

	return (
		<div className="Dashboard w-full">
			<div
				className={`${
					location.pathname === FeaturesRoutes.dashboard ? "block" : "hidden"
				} md:hidden`}
			>
				<FeaturesLinks />
			</div>
		</div>
	);
}
