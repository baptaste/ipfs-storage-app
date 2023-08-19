import { createContext, useContext } from "react";
import { User } from "../../../types";

export interface IAuthContext {
  accessToken: string | null;
  setAccessToken: (data: string | null) => void;
  loggedIn: boolean;
  user: User | null;
  setUser: (data: any) => void;
  encryptionKey: CryptoKey | undefined;
  setEncryptionKey: (key: CryptoKey) => void;
  error: any;
  loading: boolean;
}

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

export const useAuth = () => useContext(AuthContext);
