export declare interface IButtonProps {
	title: string

	type?: 'button' | 'reset' | 'submit'
	name?: string
	theme?: 'primary' | 'secondary' | 'tertiary' | 'quaternary' | 'success' | 'danger'
	disabled?: boolean
	icon?: JSX.Element | null
	isLoading?: boolean

	marginHorizontalAuto?: boolean
	widthFull?: boolean

	onClick?: ((e?: React.MouseEvent) => void) | undefined
	onSubmit?: ((e: FormEvent<HTMLFormElement>) => void) | undefined
	onMouseEnter?: (e: React.MouseEvent) => void
	onMouseLeave?: (e: React.MouseEvent) => void
}
