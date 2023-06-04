export {};

declare global {
	interface Window {
		showOpenFilePicker?: (options?: any) => void;
	}
	interface Document {
		startViewTransition?: (callback: () => void) => void;
	}
}
