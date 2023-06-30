import * as React from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import type { IInputPasswordProps } from "./InputPassword.d";

export function InputPassword(props: IInputPasswordProps) {
	const {
		type = "password",
		placeholder,
		value = "",
		label = null,
		name = type,
		error = undefined,
		validated = false,
		disabled = false,
		required = false,
		onClick,
		onChange,
	} = props;

	const [visible, setVisible] = React.useState(false);
	const [focused, setFocused] = React.useState(false);

	const getBorderColor = () => {
		if (focused) return "border-slate-500";
		if (error) return "border-red-500";
		if (validated) return "border-green-500";
		return "border-transparent";
	};

	const getInputColor = () => {
		if (error) return "text-red-600";
		if (validated) return "text-green-600";
		return "text-slate-900";
	};

	return (
		<div
			className={`InputPassword w-full flex flex-col items-stretch justify-between rounded-md ${
				!label ? "border-solid border-2 " + getBorderColor() : ""
			}`.trim()}
		>
			{label ? (
				<label
					htmlFor={name}
					className="w-full mb-3 font-bold text-left text-lg text-slate-900"
				>
					{label} {required ? "*" : null}
				</label>
			) : null}

			<div
				className={`min-h-[96px] w-full relative flex flex-col items-center justify-center p-4 bg-slate-200 rounded-md ${
					label ? "border-solid border-2 " + getBorderColor() : ""
				}`.trim()}
			>
				{label === null ? (
					<p
						className={`w-fit absolute left-4 top-4 text-base text-slate-400 ${
							value.length ? "visible" : "invisible"
						}`}
					>
						{placeholder} {required ? "*" : null}
					</p>
				) : null}

				<input
					type={visible ? "text" : "password"}
					value={value}
					name={name}
					placeholder={placeholder}
					className={`w-full pr-12 break-all rounded-md text-lg ${getInputColor()} bg-transparent focus:outline-none`}
					disabled={disabled}
					required={required}
					onClick={onClick}
					onChange={onChange}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
				/>

				{visible ? (
					<EyeSlashIcon
						className="h-7 w-7 text-slate-500 cursor-pointer absolute right-4"
						onClick={() => setVisible(false)}
					/>
				) : (
					<EyeIcon
						className="h-7 w-7 text-slate-500 cursor-pointer absolute right-4"
						onClick={() => setVisible(true)}
					/>
				)}
			</div>
			{error ? <p className="w-full text-red-500 text-sm pt-2">{error}</p> : null}
		</div>
	);
}
