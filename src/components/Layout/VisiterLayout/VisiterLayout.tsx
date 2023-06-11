import { HeaderNav } from "../../Navigation";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function VisiterLayout({ children, title }: { children: React.ReactNode; title: string }) {
	const darkTheme = "dark:bg-slate-900 dark:text-slate-50";
	return (
		<div className="VisiterLayout w-full h-screen flex flex-col flex-1 items-center px-4 md:px-60 py-20 overflow-y-scroll bg-slate-50 text-slate-900">
			<HeaderNav />
			{children}
			<ToastContainer />
		</div>
	);
}
