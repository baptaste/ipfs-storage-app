import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../components/Common";
import { InputPassword } from "../../../../../components/Form";
import { useAuth } from "../../../auth";
import { changePassword } from "../../api";

export function ChangePassword() {
	const navigate = useNavigate();
	const { user } = useAuth();

	const [state, setState] = useState<any>({
		password: "",
		passwordConfirm: "",
		error: "",
	});

	const [loading, setLoading] = useState<boolean>(false);

	const handleChange = (input: string, event: React.ChangeEvent<HTMLInputElement>) => {
		setState((state: any) => ({
			...state,
			error: "",
			[input]: event.target.value,
		}));
	};

	const onChangePassword = async () => {
		if (!user) return;

		setLoading(true);
		const res = await changePassword(state.password);

		if (res.success) {
			setLoading(false);
			navigate("/settings", { state: "password_updated" });
		} else {
			setLoading(false);
			setState((state: any) => ({
				...state,
				error: res.message ? res.message : "",
			}));
		}
	};

	return (
		<>
			{state.error.length ? (
				<p className="w-full text-center text-red-500 text-base mb-4">{state.error}</p>
			) : null}

			<div className="w-full h-full flex flex-col items-center justify-between">
				<div className="w-full flex flex-col items-center ">
					<InputPassword
						placeholder="New password"
						value={state.password}
						onChange={(e) => handleChange("password", e)}
					/>
					<InputPassword
						placeholder="Confirm new password"
						value={state.passwordConfirm}
						onChange={(e) => handleChange("passwordConfirm", e)}
					/>
					<p className="">
						Your password must contains at least 8 characters. Avoid the use of common
						passwords.
					</p>
				</div>

				<Button
					title="Save new password"
					onClick={onChangePassword}
					disabled={
						!state.password ||
						!state.passwordConfirm ||
						state.password !== state.passwordConfirm
					}
					theme="secondary"
					isLoading={loading}
				/>
			</div>
		</>
	);
}
