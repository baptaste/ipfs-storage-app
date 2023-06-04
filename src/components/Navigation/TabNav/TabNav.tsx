import { Link } from 'react-router-dom'
import { Cog6ToothIcon, HomeIcon, PlusSmallIcon, UserIcon } from '@heroicons/react/24/outline'

export function TabNav() {
	const links = [
		{
			path: '/dashboard',
			name: 'Dashboard',
			icon: <HomeIcon className='w-7 h-7 text-zinc-900' />,
			containerClass: 'w-14 h-14 flex justify-center items-center'
		},
		{
			path: '/settings',
			name: 'Settings',
			icon: <Cog6ToothIcon className='w-7 h-7 text-zinc-900' />,
			containerClass: 'w-14 h-14 flex justify-center items-center'
		}
	]

	return (
		<div className='TabNav md:hidden fixed bottom-0 left-0 w-screen h-16 border-t border-solid border-1 border-zinc-300 bg-zinc-50 text-zinc-900'>
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
