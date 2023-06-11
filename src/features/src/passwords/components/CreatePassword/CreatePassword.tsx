import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../components/Common";
import { Input, InputPassword } from "../../../../../components/Form";
import { usePasswords } from "../../store";
import { createPassword } from "../../api";
import { toastError } from "../../../../../lib/toast";
import { useAuth } from "../../../auth";
import { encryptText } from "../../../../../utils/encryption";

export function CreatePassword() {
	const { user } = useAuth();
	const navigate = useNavigate();
	const { dispatch } = usePasswords();

	const [state, setState] = useState<any>({
		password: "",
		title: undefined,
		websiteUrl: undefined,
		// error: false,
		// errorMsg: '',
	});

	const [isLoadingNewPassword, setIsLoadingNewPassword] = useState<boolean>(false);

	const handleChange = (input: string, event: React.ChangeEvent<HTMLInputElement>) => {
		setState((state: any) => ({
			...state,
			// error: false,
			// errorMsg: '',
			error: undefined,
			[input]: event.target.value,
		}));
	};

	const onCreatePassword = async () => {
		if (!user) return;
		if (!state.password) {
			return setState((state: any) => ({
				...state,
				// error: true,
				error: "Password is required.",
			}));
		}
		setIsLoadingNewPassword(true);
		const data = await encryptText(state.password, user._id, user.password_key);
		console.log("encryptText - data:", data);
		// TODO convert encrypted password arr buffer using formData because it cannot be send
		// as arraybuffer to server (see: https://stackoverflow.com/questions/48291288/how-to-send-array-buffer-data-along-with-string-json-to-nodejs-server)
		if (data?.encrypted) {
			const res = await createPassword(
				data.encrypted,
				data.vector,
				state.title,
				state.websiteUrl,
			);
			if (res.success) {
				setIsLoadingNewPassword(false);
				const password = { ...res.password, plaintext: null, visible: false };
				dispatch({ type: "create", password });
				navigate("/dashboard/passwords", { state: "created" });
			} else {
				setIsLoadingNewPassword(false);
				setState((state: any) => ({
					...state,
					// error: true,
					error: res.message || "An error occurred while creating your password.",
				}));
				toastError("An error occurred while creating your password.");
			}
		} else {
			setIsLoadingNewPassword(false);
			setState((state: any) => ({
				...state,
				// error: true,
				error: "An error occurred while encrypting your password.",
			}));
			toastError("An error occurred while encrypting your password.");
		}
	};

	return (
		<>
			<div className="w-full h-full flex flex-col items-center justify-between mt-5">
				<div className="w-full flex flex-col items-center">
					<InputPassword
						label="Enter a password"
						placeholder="Password"
						value={state.password}
						onChange={(e) => handleChange("password", e)}
						required
						error={state.error}
					/>
					<Input
						type="text"
						label="Website address"
						placeholder="Ex: https://www.amazon.com"
						value={state.websiteUrl}
						onChange={(e) => handleChange("websiteUrl", e)}
					/>
					<Input
						type="text"
						label="Title"
						placeholder="Name your password"
						value={state.title}
						onChange={(e) => handleChange("title", e)}
					/>
				</div>

				<Button
					title="Create"
					onClick={onCreatePassword}
					disabled={!state.password || (!state.title && !state.websiteUrl)}
					theme="secondary"
					isLoading={isLoadingNewPassword}
				/>
			</div>
		</>
	);
}
