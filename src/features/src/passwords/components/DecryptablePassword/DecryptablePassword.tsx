import { useState } from "react";
import { PasswordIcon, Spinner } from "../../../../../components/Common";
import { retrievePassword } from "../../api";
import { usePasswords } from "../../store";
import type { IPassword } from "../../types";
import { useClipboard } from "../../../../../hooks/useClipboard";
import {
	CheckCircleIcon,
	ClipboardDocumentIcon,
	EyeIcon,
	EyeSlashIcon,
} from "@heroicons/react/24/outline";
import { useAuth } from "../../../auth";
import { decryptWithEncryptionKey, getEncryptionKey } from "../../../../../utils/crypto";
import { getItem } from "../../../../../utils/indexedDB";
import { decryptText } from "../../../../../utils/encryption";
import { toastError } from "../../../../../lib/toast";
import { uint8ArrayToArrayBuffer } from "../../../../../utils/bytes";

export function DecryptablePassword({ password }: { password: IPassword }) {
	const { dispatch } = usePasswords();
	const { user } = useAuth();

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [error, setError] = useState<string>("");
	const { copied, copy } = useClipboard();

	const onRetrievePassword = async (): Promise<void> => {
		if (!password || !user) return;
		setIsLoading(true);

		const res = await retrievePassword(password.encryption_id);

		if (res.success && res.data) {
			console.log("onRetrievePassword - res.data.encrypted", res.data.encrypted);
			const encryptedArray = new Uint8Array(
				Object.values(res.data.encrypted).map((value) => value),
			);
			const vectorArray = new Uint8Array(
				Object.values(res.data.vector).map((value) => value),
			);
			const encryptedArrayBuffer = uint8ArrayToArrayBuffer(encryptedArray);
			console.log(
				"onRetrievePassword - res.data.encrypted as arrayBuff",
				encryptedArrayBuffer,
			);
			const decrypted = await decryptText(
				{
					encrypted: encryptedArrayBuffer,
					vector: vectorArray,
				},
				user._id,
				user.password_key,
			);
			if (decrypted) {
				setIsLoading(false);
				dispatch({ type: "retrieve", passwordId: password._id, value: decrypted });
			} else {
				setIsLoading(false);
				setError("An error occurred while decrypting your password.");
				toastError("An error occurred while decrypting your password");
			}
		} else {
			setIsLoading(false);
			setError(res.message || "An error occurred while recovering your password.");
			toastError("An error occurred while recovering your password");
		}
	};

	const togglePasswordVisibility = (): void => {
		if (!password) return;
		dispatch({ type: "visibility", passwordId: password._id });
	};

	const onCopy = async () => {
		if (!password || password.plaintext === null) return;
		await copy(password.plaintext);
	};

	const renderIcon = () => {
		if (isLoading) return <Spinner size="small" />;

		if (password.plaintext === null) {
			return <PasswordIcon onClick={onRetrievePassword} />;
		} else {
			return (
				<div className="flex items-center">
					{password.visible ? (
						<EyeSlashIcon
							className="h-7 w-7 pt-0.5 text-slate-500 cursor-pointer"
							onClick={togglePasswordVisibility}
						/>
					) : (
						<EyeIcon
							className="h-7 w-7 pt-0.5 text-slate-500 cursor-pointer"
							onClick={togglePasswordVisibility}
						/>
					)}

					{copied ? (
						<CheckCircleIcon
							onClick={onCopy}
							className="h-7 w-7 pt-0.5 ml-3 text-green-700 cursor-pointer"
						/>
					) : (
						<ClipboardDocumentIcon
							onClick={onCopy}
							className="h-7 w-7 pt-0.5 ml-3 text-slate-500 cursor-pointer"
						/>
					)}
				</div>
			);
		}
	};

	return (
		<>
			<div className="DecryptablePassword w-full flex flex-col items-stretch justify-between mb-5 rounded-md">
				<div className="min-h-[96px] w-full flex flex-col items-stretch justify-between p-4 bg-slate-200 rounded-md">
					<p className="text-md text-slate-400">Password</p>
					<div className="h-2/3 w-full flex items-start justify-between">
						<input
							disabled={true}
							type={password.plaintext && password.visible ? "text" : "password"}
							value={password.plaintext ?? "****************"}
							className={`w-full pr-2 break-all rounded-md text-lg text-slate-900 bg-transparent ${
								password.visible ? "text-ellipsis" : ""
							}`.trim()}
						/>
						{renderIcon()}
					</div>
				</div>
			</div>
			{error ? <p className="text-red-500">{error}</p> : null}
		</>
	);
}
