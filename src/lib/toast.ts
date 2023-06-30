import { toast, ToastOptions } from "react-toastify";

const options: ToastOptions = {
	position: window.innerWidth < 700 ? "bottom-center" : "bottom-right",
	autoClose: 5000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: false,
	progress: undefined,
	theme: "light",
};

export function toastSuccess(msg: string) {
	return toast.success(msg, { ...options, toastId: "success1" });
}

export function toastError(msg: string) {
	return toast.error(msg, { ...options, toastId: "error1" });
}
