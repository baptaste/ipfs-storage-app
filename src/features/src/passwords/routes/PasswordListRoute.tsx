import { Link, Outlet } from "react-router-dom";
import { lazyImport } from "../../../../utils/imports";
import { MainLayout } from "../../../../components/Layout";
import { PlusSmallIcon } from "@heroicons/react/24/outline";

const PasswordList = lazyImport("../features/src/passwords", "PasswordList");

export function PasswordListRoute() {
	// return (
	// 	<MainLayout
	// 		title='Passwords'
	// 		headerRightIcon={
	// 			<Link to='/dashboard/passwords/create'>
	// 				<PlusSmallIcon className='w-8 h-8 text-slate-900' />
	// 			</Link>
	// 		}
	// 	>
	// 		<PasswordList />
	// 	</MainLayout>
	// )
	return (
		<>
			<PasswordList />
			<Outlet />
		</>
	);
}
