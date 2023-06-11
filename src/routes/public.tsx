import { Route, Routes } from "react-router-dom";
import { lazyImport } from "../utils/imports";

const Login = lazyImport("../features/src/auth", "Login");
const Register = lazyImport("../features/src/auth", "Register");

function PublicRoutes() {
	return (
		<Routes>
			<Route path="login" element={<Login />} />
			<Route path="register" element={<Register />} />
		</Routes>
	);
}

export const publicRoutes = [
	{
		path: "/auth/*",
		element: <PublicRoutes />,
	},
];
