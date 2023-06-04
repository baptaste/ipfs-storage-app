import { Link } from 'react-router-dom';

enum LinkThemes {
	// primary = 'bg-zinc-50 text-zinc-900 border-zinc-900',
	// secondary = 'bg-zinc-900 text-zinc-50 border-zinc-900'

	primary = 'bg-primary color-white border-primary',
	secondary = 'bg-white color-primary border-primary',
}

interface AppLinkProps {
	path: string;
	text: string;
	classes?: string;
	theme?: 'primary' | 'secondary';
	disabled?: boolean;
	icon?: JSX.Element | null;
	onClick?: ((e?: React.MouseEvent) => void) | undefined;
	onMouseEnter?: (e: React.MouseEvent) => void;
	onMouseLeave?: (e: React.MouseEvent) => void;
}

export function AppLink(props: AppLinkProps) {
	const { path, text, theme = 'primary', classes = '' } = props;
	const linkTheme = LinkThemes[theme];
	const defaultClasses = `w-full md:w-[260px] flex items-center justify-center text-center p-3 mt-12 font-bold text-lg rounded-md drop-shadow-md cursor-pointer border-solid border-2 ${linkTheme}`;
	const className = classes.length ? `${classes} ${linkTheme}` : defaultClasses;

	return (
		<Link to={path} className={className}>
			{text}
		</Link>
	);
}
