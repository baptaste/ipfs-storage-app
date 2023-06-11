import { MainLayout } from "../../../../components/Layout";
import { lazyImport } from "../../../../utils/imports";

const UpdatePassword = lazyImport("../features/src/passwords", "UpdatePassword");

export function UpdatePasswordRoute() {
	return (
		<MainLayout title="Update password">
			<UpdatePassword />
		</MainLayout>
	);
}
