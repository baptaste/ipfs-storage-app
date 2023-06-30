import * as React from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "../../../../../components/Common";
import { Input, InputPassword } from "../../../../../components/Form";
import { usePasswords } from "../../store";
import { updatePassword } from "../../api";
import type { IPassword } from "../../types";
import { useAuth } from "../../../auth";
import { FeaturesRoutes } from "../../../../routes";
import { useManager } from "../../../../store";
import { encryptText } from "../../../../../utils/encryption";

export function UpdatePassword() {
	const { passwordId } = useParams();
	const location = useLocation();
	const navigate = useNavigate();
	const { user } = useAuth();
	const { passwords, dispatch } = usePasswords();
	const manager = useManager();

	const currentPassword: IPassword | null | undefined = React.useMemo(() => {
		if (passwordId === undefined) return null;
		return passwords.find((item: IPassword) => item._id === passwordId);
	}, [passwords]);

	const [state, setState] = React.useState<any>({
		error: undefined,
		title: "",
		password: "",
	});

	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	const handleChange = (input: string, event: React.ChangeEvent<HTMLInputElement>) => {
		setState((state: any) => ({
			...state,
			error: undefined,
			[input]: event.target.value,
		}));
	};

	const onUpdatePassword = async () => {
		if (!user) return;
		if (currentPassword) {
			setIsLoading(true);
			const data = await encryptText(state.password, user._id, user.password_key);
			console.log("CreatePassword encryptText - data:", data);
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
				manager.dispatch({
					type: "set_notification",
					notification: {
						status: "success",
						content: "Password updated successfully !",
					},
				});
				navigate(`${FeaturesRoutes.passwords}/${passwordId}`);
			} else {
				setIsLoading(false);
				setState((state: any) => ({
					...state,
					error: res.message || "An error occurred while updating your password.",
				}));
				manager.dispatch({
					type: "set_notification",
					notification: {
						status: "error",
						content: "An error occurred while updating your password.",
					},
				});
			}
		}
	};

	if (passwordId === undefined) {
		return <Navigate to={location.state.from} replace />;
	}

	return (
		<div className="UpdatePassword w-full md:w-1/2 flex flex-col justify-between gap-6 md:justify-normal md:pt-[90px] md:px-6">
			<h1 className="text-center text-2xl text-slate-900 font-bold">Update password</h1>
			<div className="w-full flex flex-col items-center gap-6">
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
					error={state.error}
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
	);
}
