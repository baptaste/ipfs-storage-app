import { Spinner } from '../Spinner'
import type { IButtonProps } from './Button.d'

enum ButtonThemes {
	primary = 'bg-zinc-50 text-zinc-900 border-zinc-900',
	secondary = 'bg-zinc-900 text-zinc-50 border-zinc-900',
	tertiary = 'bg-zinc-900 text-zinc-50 border-zinc-900',
	quaternary = 'bg-zinc-50 text-zinc-900 border-zinc-900',
	disabled = 'bg-zinc-200 text-zinc-900/30 border-zinc-400',
	success = 'bg-green-700 text-zinc-50 border-green-700',
	danger = 'bg-red-500 text-zinc-50 border-red-500'
}

export function Button(props: IButtonProps) {
	const {
		title,
		type = 'button',
		name = type,
		theme = 'primary',
		disabled = false,
		icon = null,
		isLoading = false,
		marginHorizontalAuto = false,
		widthFull = false,
		onClick,
		onSubmit,
		onMouseEnter,
		onMouseLeave
	} = props
	const getTheme = () => ButtonThemes[disabled ? 'disabled' : theme]
	const buttonTheme = getTheme()

	let className = `w-full md:w-[260px] flex items-center justify-center text-center p-3 my-4 font-bold text-lg rounded-md drop-shadow-md cursor-pointer border-solid border-2 ${buttonTheme}`

	if (marginHorizontalAuto) className += ' mx-auto'
	if (widthFull) className = className.replace('md:w-[260px]', '').replace(/\s/, '')

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
				<Spinner size='small' />
			) : (
				<>
					{icon ? icon : null}
					{title}
				</>
			)}
		</button>
	)
}
