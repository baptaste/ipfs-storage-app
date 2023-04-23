import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeftIcon } from '@heroicons/react/24/outline'
import { PlusSmallIcon, RocketLaunchIcon } from '@heroicons/react/24/solid'
import { useMemo } from 'react'
import { useAuth } from '../../../features/auth'

export function HeaderNav({
	title,
	rightIcon = null
}: {
	title: string
	rightIcon?: React.ReactNode
}) {
	const navigate = useNavigate()
	const { pathname } = useLocation()
	const goBack = () => navigate(-1)
	const { loggedIn } = useAuth()

	const leftIcon = useMemo(() => {
		if (!loggedIn) {
			return (
				<Link to='/' className='justify-start absolute left-4'>
					<RocketLaunchIcon className='w-8 h-8 text-zinc-900 dark:text-zinc-50' />
				</Link>
			)
		}

		if (pathname !== '/dashboard') {
			return (
				<button className='GoBack justify-start absolute left-4' onClick={goBack}>
					<ArrowLeftIcon className='w-6 h-6 text-zinc-500 dark:text-zinc-300' />
				</button>
			)
		}

		return null
	}, [loggedIn, pathname])

	return (
		<header className='HeaderNav fixed top-0 left-0 w-screen h-16 z-50 flex items-center justify-center p-4 border-b border-solid border-1 border-zinc-300 dark:border-zinc-800 bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50'>
			{leftIcon}
			<p className={`flex-1 ${pathname !== '/dashboard' && 'text-center'} text-lg font-bold`}>
				{title}
			</p>
			{rightIcon ? <div className='absolute right-4'>{rightIcon}</div> : null}
		</header>
	)
}
