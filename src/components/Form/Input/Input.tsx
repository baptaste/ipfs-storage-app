import * as React from "react";
import { useClipboard } from "../../../hooks/useClipboard";
import type { IInputProps } from "./Input.d";
import { CheckCircleIcon, ClipboardDocumentIcon } from "@heroicons/react/24/outline";

export function Input(props: IInputProps) {
	const {
		type = "text",
		placeholder,
		value = "",
		label = null,
		name = type,
		error = undefined,
		validated = false,
		disabled = false,
		required = false,
		copyable = false,
		onClick,
		onChange,
	} = props;

	const [focused, setFocused] = React.useState(false);
	const { copied, copy } = useClipboard();

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

	const onCopy = async () => {
		await copy(value);
	};

	return (
		<div
			className={`Input w-full flex flex-col items-stretch justify-between mb-5 rounded-md ${
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
						className={`w-fit absolute left-4 top-4 text-md text-slate-400 ${
							value.length ? "visible" : "invisible"
						}`}
					>
						{placeholder} {required ? "*" : null}
					</p>
				) : null}

				<input
					type={type}
					value={value}
					name={name}
					placeholder={placeholder}
					className={`w-full break-all rounded-md text-lg ${getInputColor()} bg-transparent focus:outline-none ${
						copyable && disabled ? " pt-2 pr-12 text-ellipsis" : ""
					}`.trim()}
					disabled={disabled}
					required={required}
					onClick={onClick}
					onChange={onChange}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
				/>

				{copyable ? (
					copied ? (
						<CheckCircleIcon
							onClick={onCopy}
							className="absolute right-4 h-7 w-7 mt-2 pt-0.5 text-green-700 cursor-pointer"
						/>
					) : (
						<ClipboardDocumentIcon
							onClick={onCopy}
							className="absolute right-4 h-7 w-7 mt-2 pt-0.5 text-slate-500 cursor-pointer"
						/>
					)
				) : null}
			</div>
			{error ? <p className="w-full text-red-500 text-sm pt-2">{error}</p> : null}
		</div>
	);
}
