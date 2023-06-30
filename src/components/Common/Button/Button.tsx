import { Spinner } from "../Spinner";
import type { IButtonProps } from "./Button.d";

enum ButtonThemes {
	primary = "bg-slate-50 text-slate-900 border-slate-900",
	secondary = "bg-slate-900 text-slate-50 border-slate-900",
	tertiary = "bg-slate-900 text-slate-50 border-slate-900",
	quaternary = "bg-slate-50 text-slate-900 border-slate-900",
	disabled = "bg-slate-200 text-slate-900/30 border-slate-400",
	success = "bg-green-700 text-slate-50 border-green-700",
	danger = "bg-red-500 text-slate-50 border-red-500",
}

export function Button(props: IButtonProps) {
	const {
		title,
		type = "button",
		name = type,
		theme = "primary",
		disabled = false,
		icon = null,
		isLoading = false,
		marginHorizontalAuto = false,
		widthFull = false,
		onClick,
		onSubmit,
		onMouseEnter,
		onMouseLeave,
	} = props;
	const getTheme = () => ButtonThemes[disabled ? "disabled" : theme];
	const buttonTheme = getTheme();

	let className = `w-full flex items-center justify-center text-center p-3 font-bold text-lg rounded-md drop-shadow-md cursor-pointer border-solid border-2 ${buttonTheme}`;

	if (marginHorizontalAuto) className += " mx-auto";
	if (widthFull) className = className.replace("md:w-[260px]", "").replace(/\s/, "");

	return (
		<button
			type={type}
			name={name}
			disabled={disabled}
			className={className}
			onClick={onClick}
			onSubmit={onSubmit}
			onMouseEnter={onMouseEnter}
			onMouseLeave={onMouseLeave}
		>
			{isLoading ? (
				<Spinner size="small" />
			) : (
				<>
					{icon ? icon : null}
					{title}
				</>
			)}
		</button>
	);
}
