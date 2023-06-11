import { Button } from "../Button";

interface IModalProps {
	isVisible: boolean;
	title: string;
	children?: React.ReactNode;
	buttonsShown?: boolean;
	confirmText?: string;
	cancelText?: string;
	onConfirm?: () => void;
	onCancel?: () => void;
	onClickOutside?: () => void;
}

export function Modal({
	isVisible,
	title,
	children = null,
	buttonsShown = true,
	confirmText = "Confirm",
	cancelText = "Cancel",
	onConfirm = () => {},
	onCancel = () => {},
	onClickOutside = () => {},
}: IModalProps) {
	if (!isVisible) return null;

	return (
		<div className="Modal absolute left-0 right-0 bottom-0 flex flex-col items-center justify-centertext-slate-900">
			<div
				onClick={onClickOutside}
				className="ModalBackground fixed z-0 left-0 right-0 top-0 bottom-0 bg-slate-900/[.3]"
			></div>

			<div className="ModalContainer z-50 w-full h-full min-h-[50%] flex flex-col items-center justify-center p-4 rounded-t-3xl bg-slate-50 ring-2 ring-slate-500">
				<p className="text-xl font-bold pt-3 pb-10 text-slate-900">{title}</p>

				<div className="ModalContent w-full">{children}</div>

				{buttonsShown ? (
					<div className="ModalButtons w-full flex items-center justify-evenly">
						<div className="flex-1 pr-2">
							<Button title={cancelText} onClick={onCancel} theme="secondary" />
						</div>
						<div className="flex-1 pl-2">
							<Button title={confirmText} onClick={onConfirm} theme="tertiary" />
						</div>
					</div>
				) : null}
			</div>
		</div>
	);
}
