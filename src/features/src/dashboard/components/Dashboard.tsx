import * as React from "react";
import { useLocation } from "react-router-dom";
import { isMobile } from "../../../../utils/browser";
import { FeaturesLinks } from "../../../components";
import { FeaturesRoutes } from "../../../routes";

export function Dashboard() {
	// const { user } = useAuth();
	const location = useLocation();
	return (
		<div className={`Dashboard w-full border-2 border-red`}>
			Dashboard
			{isMobile() && location.pathname === FeaturesRoutes.dashboard ? (
				<FeaturesLinks />
			) : null}
		</div>
	);
}
