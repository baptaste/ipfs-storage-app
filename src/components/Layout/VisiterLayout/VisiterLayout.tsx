import { HeaderNav } from '../../Navigation'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export function VisiterLayout({ children, title }: { children: React.ReactNode; title: string }) {
	const darkTheme = 'dark:bg-zinc-900 dark:text-zinc-50'
	return (
		<div className='VisiterLayout w-full h-screen flex flex-col flex-1 items-center px-4 md:px-60 py-20 overflow-y-scroll bg-zinc-50 text-zinc-900'>
			<HeaderNav />
			{children}
			<ToastContainer />
		</div>
	)
}
