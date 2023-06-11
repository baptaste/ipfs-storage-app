import { useMemo } from "react";
import { Link, Navigate, useLocation, useParams } from "react-router-dom";
import { lazyImport } from "../../../../utils/imports";
import { MainLayout } from "../../../../components/Layout";
import { usePasswords } from "../store";
import type { IPassword } from "../types";
import { EditIcon } from "../../../../components/Common";

const Password = lazyImport("../features/src/passwords", "Password");

export function PasswordRoute() {
	const { passwordId } = useParams();
	const { passwords } = usePasswords();
	const location = useLocation();

	const password: IPassword | null | undefined = useMemo(() => {
		if (!passwordId || !passwords) return null;
		return passwords.find((item: IPassword) => item._id === passwordId);
	}, [passwords, location.pathname]);

	// Navigate to previous page if there is no password or passwordId
	if (passwordId === undefined || passwordId !== password?._id || !password) {
		return <Navigate to={location.state.from} replace />;
	}

	// return (
	// 	<MainLayout
	// 		title={password.displayed_name}
	// 		headerRightIcon={
	// 			<Link to={`/dashboard/passwords/${password._id}/update`}>
	// 				<EditIcon />
	// 			</Link>
	// 		}
	// 	>
	// 		<Password password={password} />
	// 	</MainLayout>
	// );

	return <Password password={password} />;
}
