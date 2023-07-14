import { createContext, useContext } from "react";
import type { IPassword, IPasswords } from "../types";

export interface IPasswordsContext {
  passwords: IPasswords;
  password: IPassword | null;
  loading: boolean;
  error: any;
  dispatch: (action: any) => void;
}

export const PasswordsContext = createContext<IPasswordsContext>({} as IPasswordsContext);

export const usePasswords = () => useContext(PasswordsContext);
