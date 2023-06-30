import { Outlet, useLocation } from "react-router-dom";
import { MainLayout, Sidebar } from "../../../../components/Layout";
import { isMobile } from "../../../../utils/browser";
import { FeaturesLinks } from "../../../components";
import { FeaturesRoutes } from "../../../routes";
import { Dashboard } from "../components";

export function DashboardRoute() {
	const location = useLocation();
	return (
		<MainLayout>
			{location.pathname === FeaturesRoutes.dashboard ? <Dashboard /> : null}
			<Outlet />
		</MainLayout>
	);
}
