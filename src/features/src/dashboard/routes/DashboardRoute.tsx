import { Outlet, useLocation } from "react-router-dom";
import { MainLayout, Sidebar } from "../../../../components/Layout";
import { isMobile } from "../../../../utils/browser";
import { FeaturesLinks } from "../../../components";
import { FeaturesRoutes } from "../../../routes";
import { Dashboard } from "../components";

export function DashboardRoute() {
	const location = useLocation();
	return (
		<MainLayout title="Dashboard">
			{!isMobile() ? (
				<Sidebar>
					<FeaturesLinks />
				</Sidebar>
			) : null}

			{location.pathname === FeaturesRoutes.dashboard ? <Dashboard /> : null}

			<Outlet />

			{/* {isMobile() && location.pathname !== "/dashboard" ? null : (
				<Sidebar>
					<FeaturesLinks />
				</Sidebar>
			)} */}

			{/* <Sidebar>
				<Dashboard />
			</Sidebar> */}
		</MainLayout>
	);
}
