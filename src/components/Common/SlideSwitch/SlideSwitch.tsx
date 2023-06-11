import { useState } from "react";

type SlideSwitchProps = {
	leftValue: string;
	rightValue: string;
	onChange: (v: string) => void;
	selected?: string;
	margin?: boolean;
};

export function SlideSwitch(props: SlideSwitchProps) {
	const { leftValue, rightValue, onChange, selected, margin = false } = props;
	const [active, setActive] = useState<string>(selected ? selected : leftValue);

	const onSwitch = (v: string) => {
		if (v === active) return;
		setActive(v);
		onChange(v);
	};

	const getBtnTextColor = (v: string) => {
		return active === v ? "text-slate-50" : "light:text-slate-900";
	};

	return (
		<div className="SlideSwitch h-[56px]">
			<div
				className={`SlideSwitch-container relative z-10 w-full max-w-[364px] h-full flex items-center ${
					margin ? "my-4" : ""
				} mx-auto py-2 bg-transparent rounded-full overflow-hidden`.trim()}
			>
				<button
					onClick={() => onSwitch(leftValue)}
					className={`z-10 w-1/2 px-4 py-2 rounded-l-full ${getBtnTextColor(leftValue)}
					ring-inset ring-1 ring-slate-700`.trim()}
				>
					{leftValue}
				</button>
				<button
					onClick={() => onSwitch(rightValue)}
					className={`z-10 w-1/2 px-4 py-2 rounded-r-full ${getBtnTextColor(rightValue)}
					ring-inset ring-1 ring-slate-700`.trim()}
				>
					{rightValue}
				</button>
				<div
					className={`absolute w-1/2 z-0 h-10 px-4 py-2 bg-green-700 transition-transform ease-in-out duration-300 ${
						active === leftValue
							? "translate-x-0 rounded-l-full"
							: "translate-x-full rounded-r-full"
					}
				`.trim()}
				></div>
			</div>
		</div>
	);
}
