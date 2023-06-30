import React, { useEffect, useRef, useState } from "react";
import { useNavigate, redirect, Link, useLocation } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Button } from "../../../../../components/Common/Button";
import { Input } from "../../../../../components/Form/Input";
import { InputPassword } from "../../../../../components/Form/InputPassword";
import { login } from "../../api";
import { Spinner } from "../../../../../components/Common";
import { VisiterLayout } from "../../../../../components/Layout";
import { setHeaderToken } from "../../../../../lib/axios";
import { toastError, toastSuccess } from "../../../../../lib/toast";
import { useAuth } from "../../store";
import { pbkdf2Verify } from "../../../../../utils/crypto";
import { verifyMasterPassword } from "../../services/masterPassword";
import { getMasterPasswordHash } from "../../api/masterPassword";
import { loginUser } from "../../services/loginUser";

interface ILoginState {
	[key: string]: string | boolean;
	email: string;
	password: string;
	loading: boolean;
	error: boolean;
	errorMsg: string;
}

export function Login() {
	const { setAccessToken, setUser, setEncryptionKey } = useAuth();
	//const navigate = useNavigate();
	const location = useLocation();

	const [state, setState] = useState<ILoginState>({
		email: "",
		password: "",
		loading: false,
		error: false,
		errorMsg: "",
	});

	const handleChange = (input: string, event: React.ChangeEvent<HTMLInputElement>) => {
		setState((state) => ({
			...state,
			error: false,
			errorMsg: "",
			[input]: event.target.value,
		}));
	};

	const onSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		setState((state) => ({ ...state, loading: true }));

		const res = await loginUser(state.email, state.password);
		console.log("Login - res:", res);

		if (!res?.success) {
			toastError("An error occurred while loggin your account");
			return setState((prev) => {
				return {
					...prev,
					loading: false,
					error: true,
					errorMsg: res?.message || "Invalid credentials.",
				};
			});
		}

		if (res.accessToken && res.user && res.encryptionKey) {
			setState((state) => ({ ...state, loading: false }));
			setAccessToken(res.accessToken);
			setHeaderToken(res.accessToken);
			setUser(res.user);
			setEncryptionKey(res.encryptionKey);
			// navigate('/')
		}
	};

	// Notify user whenever account update is triggered
	useEffect(() => {
		if (location.state !== null) {
			if (location.state === "account_created") {
				toastSuccess("Account created successfully. Thanks for registering !");
			} else if (location.state === "account_deleted") {
				toastSuccess("Your account has been deleted successfully.");
			}
		}
	}, [location.state]);

	return (
		<VisiterLayout title="Log in">
			<div className="w-full md:w-[400px] h-full flex flex-col items-center justify-center gap-6">
				<div>
					<h1 className="w-full text-center text-2xl font-bold">Welcome back !</h1>
					Not yet registered ?{" "}
					<Link to={"/auth/register"} className="font-bold">
						Sign Up
					</Link>
				</div>

				<form
					onSubmit={onSubmitLogin}
					className="w-full my-4 flex flex-col items-center gap-6"
				>
					{state.errorMsg?.length ? (
						<p className="w-full text-center text-red-500 text-base my-4">
							{state.errorMsg}
						</p>
					) : null}
					<Input
						type="email"
						name="Email"
						placeholder="Email"
						value={state.email}
						error={state.error}
						onChange={(e) => handleChange("email", e)}
					/>
					<InputPassword
						name="Password"
						value={state.password}
						error={state.error}
						placeholder="Password"
						onChange={(e) => handleChange("password", e)}
					/>
					<Button
						title="Log in"
						type="submit"
						disabled={!state.email.length || !state.password.length || state.error}
						theme="secondary"
						isLoading={state.loading}
					/>
				</form>
			</div>
		</VisiterLayout>
	);
}
