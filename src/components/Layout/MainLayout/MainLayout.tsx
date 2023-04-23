import { HeaderNav, TabNav } from '../../Navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function MainLayout({
	children,
	title,
	headerRightIcon = null
}: {
	children: React.ReactNode
	title: string
	headerRightIcon?: React.ReactNode
}) {
	return (
		<div className='MainLayout w-full h-screen flex flex-col flex-1 items-center px-4 md:px-60 pt-24 pb-20 overflow-y-scroll bg-zinc-50 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50'>
			<HeaderNav title={title} rightIcon={headerRightIcon} />
			{children}
			<TabNav />
			<ToastContainer />
		</div>
	)
}
