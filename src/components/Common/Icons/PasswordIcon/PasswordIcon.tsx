import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/outline'

interface IPasswordIconProps {
	open?: boolean
	size?: 'small' | 'medium'
	showThemeStatus?: boolean
	onClick?: () => void
}

export function PasswordIcon({
	open = false,
	size = 'medium',
	showThemeStatus = false,
	onClick = () => {}
}: IPasswordIconProps) {
	return (
		<div
			className={`flex items-center justify-center p-2 rounded-lg ${
				!open && showThemeStatus ? 'bg-zinc-700/[.7]' : 'bg-green-700'
			}`}
		>
			{open ? (
				<LockOpenIcon
					className={`${size === 'small' ? 'w-5 h-5' : 'w-6 h-6'} text-zinc-50`}
					onClick={onClick}
				/>
			) : (
				<LockClosedIcon
					className={`${size === 'small' ? 'w-5 h-5' : 'w-6 h-6'} text-zinc-50`}
					onClick={onClick}
				/>
			)}
		</div>
	)
}
