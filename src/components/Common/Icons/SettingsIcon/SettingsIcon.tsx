import { Cog6ToothIcon as Icon } from "@heroicons/react/24/solid";

interface SettingsIconProps {
	active: boolean;
	onClick?: () => void;
}

export function SettingsIcon({ active, onClick = () => {} }: SettingsIconProps) {
	return (
		<div
			className={`flex items-center justify-center p-2 rounded-lg ${
				active ? "bg-primary" : "bg-slate-600/[.3]"
			}`}
		>
			<Icon className="w-6 h-6 text-slate-50" onClick={onClick} />
		</div>
	);
}
