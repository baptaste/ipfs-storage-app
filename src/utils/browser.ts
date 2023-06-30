export const clipboardCopy = (value: string): Promise<void> => {
	return new Promise((resolve, reject) => {
		navigator.clipboard
			.writeText(value)
			.then(() => resolve())
			.catch((err) => reject(err));
	});
};

export function isMobile(): boolean {
	return window?.innerWidth <= 668;
}
