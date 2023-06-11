import type { IPassword, IPasswords } from "../types";
import type { IPasswordsState } from "../types";
import { getTargetIdx } from "../../../../utils/array";

export const initialPasswordsState: IPasswordsState = {
	passwords: [] as IPasswords,
	password: null,
	loading: false,
	error: null,
};

export const passwordsReducer = (state: IPasswordsState, action: any): IPasswordsState => {
	if (action.type === "passwords") {
		return {
			...state,
			passwords: action.passwords,
		};
	} else if (action.type === "password") {
		return {
			...state,
			password: action.password,
		};
	} else if (action.type === "loading") {
		return {
			...state,
			loading: action.loading,
		};
	} else if (action.type === "error") {
		return {
			...state,
			error: action.error,
		};
	} else if (action.type === "retrieve") {
		return {
			...state,
			passwords: state.passwords.map((password: IPassword) => {
				if (password._id === action.passwordId) {
					return { ...password, plaintext: action.value, visible: true };
				}
				return password;
			}),
		};
	} else if (action.type === "visibility") {
		return {
			...state,
			passwords: state.passwords.map((password: IPassword) => {
				if (password._id === action.passwordId) {
					return { ...password, visible: !password.visible };
				}
				return password;
			}),
		};
	} else if (action.type === "delete") {
		const index = getTargetIdx(state.passwords, action.passwordId);
		const result = [...state.passwords];
		result.splice(index, 1);
		return {
			...state,
			passwords: result,
		};
	} else if (action.type === "create") {
		const newPassword = { ...action.password, plaintext: null, visible: false };
		return {
			...state,
			passwords: [...state.passwords, newPassword],
		};
	} else if (action.type === "update") {
		return {
			...state,
			passwords: state.passwords.map((password: IPassword) => {
				if (password._id === action.passwordId) {
					if (action.updateType === "title") {
						return { ...action.password };
					}
					if (action.updateType === "password" || action.updateType === "all") {
						return { ...action.password, plaintext: null, visible: false };
					}
				}
				return password;
			}),
		};
	}

	// default
	return state;
};
