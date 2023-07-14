import type { IPassword, IPasswords, IPasswordsState } from "../types";
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
  }
  if (action.type === "password") {
    return {
      ...state,
      password: action.password,
    };
  }
  if (action.type === "loading") {
    return {
      ...state,
      loading: action.loading,
    };
  }
  if (action.type === "error") {
    return {
      ...state,
      error: action.error,
    };
  }
  if (action.type === "retrieve") {
    return {
      ...state,
      passwords: state.passwords.map((password: IPassword) => {
        if (password._id === action.passwordId) {
          return { ...password, plaintext: action.value, visible: true };
        }
        return password;
      }),
    };
  }
  if (action.type === "visibility") {
    return {
      ...state,
      passwords: state.passwords.map((password: IPassword) => {
        if (password._id === action.passwordId) {
          return { ...password, visible: !password.visible };
        }
        return password;
      }),
    };
  }
  if (action.type === "delete") {
    const index = getTargetIdx(state.passwords, action.passwordId);
    const result = [...state.passwords];
    result.splice(index, 1);
    return {
      ...state,
      passwords: result,
    };
  }
  if (action.type === "create") {
    const newPassword = { ...action.password, plaintext: null, visible: false };
    return {
      ...state,
      passwords: [...state.passwords, newPassword],
    };
  }
  if (action.type === "update") {
    return {
      ...state,
      passwords: state.passwords.map((password: IPassword) => {
        if (password._id === action.passwordId) {
          return { ...action.password, plaintext: null, visible: false };
        }
        return password;
      }),
    };
  }

  // default
  return state;
};
