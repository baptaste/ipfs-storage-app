import { useMemo, useState } from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../../../components/Common";
import { Input, InputPassword } from "../../../../../components/Form";
import { usePasswords } from "../../store";
import { updatePassword } from "../../api";
import type { IPassword } from "../../types";
import { useAuth } from "../../../auth";

export function UpdatePassword() {
	const { passwordId } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const { user } = useAuth();
	const { passwords, dispatch } = usePasswords();

	const currentPassword: IPassword | null | undefined = useMemo(() => {
		if (passwordId === undefined) return null;
		return passwords.find((item: IPassword) => item._id === passwordId);
	}, [passwords]);

	const [state, setState] = useState<any>({
		title: "",
		password: "",
		error: false,
		errorMsg: "",
	});

	const [isLoading, setIsLoading] = useState<boolean>(false);

	const handleChange = (input: string, event: React.ChangeEvent<HTMLInputElement>) => {
		setState((state: any) => ({
			...state,
			error: false,
			errorMsg: "",
			[input]: event.target.value,
		}));
	};

	const onUpdatePassword = async () => {
		if (!user) return;

		if (currentPassword) {
			setIsLoading(true);

			const res = await updatePassword(
				currentPassword.encryption_id,
				state.title,
				state.password,
			);

			if (res.success) {
				setIsLoading(false);
				dispatch({
					type: "update",
					passwordId,
					updateType: res.updateType,
					password: res.password,
				});
				navigate(`/dashboard/passwords/${passwordId}`, { state: "updated" });
			} else {
				setIsLoading(false);
				setState((state: any) => ({
					...state,
					error: true,
					errorMsg: res.message ? res.message : "",
				}));
			}
		}
	};

	if (passwordId === undefined) {
		return <Navigate to={location.state.from} replace />;
	}

	return (
		<>
			{state.errorMsg?.length ? (
				<p className="w-full text-center text-red-500 text-md mb-4">{state.errorMsg}</p>
			) : null}

			<div className="w-full h-full flex flex-col items-center justify-between">
				<div className="w-full flex flex-col items-center">
					<Input
						type="text"
						label="New title"
						placeholder="Google.com, Apple.com..."
						value={state.title}
						onChange={(e) => handleChange("title", e)}
					/>
					<InputPassword
						label="New password"
						placeholder="Password"
						value={state.password}
						onChange={(e) => handleChange("password", e)}
					/>
				</div>

				<Button
					title="Save changes"
					onClick={onUpdatePassword}
					disabled={!state.title && !state.password}
					theme="secondary"
					isLoading={isLoading}
				/>
			</div>
		</>
	);
}
