import { Link } from 'react-router-dom'
import { Cog6ToothIcon, HomeIcon, PlusSmallIcon, UserIcon } from '@heroicons/react/24/outline'

export function TabNav() {
	const links = [
		{
			path: '/dashboard',
			name: 'Dashboard',
			icon: <HomeIcon className='w-7 h-7 text-zinc-900 dark:text-zinc-50' />,
			containerClass: 'w-14 h-14 flex justify-center items-center'
		},
		// {
		// 	path: loggedIn ? '/dashboard' : '/auth/login',
		// 	name: loggedIn ? 'Dashboard' : 'Login',
		// 	icon: <PlusSmallIcon className='w-8 h-8 text-orange-500' />,
		// 	containerClass: `w-12 h-12 flex justify-center items-center bg-slate-50 rounded-full border-solid border-2 border-sky-500 drop-shadow-[0_10px_16px_rgba(0,0,0,0.2)] absolute bottom-10 left-[${
		// 		window.innerWidth / 2
		// 	}]`
		// },
		{
			path: '/settings',
			name: 'Settings',
			icon: <Cog6ToothIcon className='w-7 h-7 text-zinc-900 dark:text-zinc-50' />,
			containerClass: 'w-14 h-14 flex justify-center items-center'
		}
	]

	return (
		<div className='TabNav md:hidden fixed bottom-0 left-0 w-screen h-16 border-t border-solid border-1 border-zinc-300 dark:border-zinc-800 bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50'>
			<nav className='w-full h-full flex items-center justify-around bg-black-100'>
				{links.map(({ path, name, icon, containerClass }: any) => (
					<div key={name} className={containerClass}>
						<Link key={name} to={path} className='flex justify-center items-center'>
							{icon}
						</Link>
					</div>
				))}
			</nav>
		</div>
	)
}
