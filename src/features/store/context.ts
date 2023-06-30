import { createContext, useContext } from "react";
import { FeaturesRoutes } from "../routes";
import { AuthProvider } from "../src/auth";
import { AuthContext } from "../src/auth/store/context";
import { PasswordsContext, PasswordsProvider } from "../src/passwords";

// const ManagerContext = {
// 	auth: AuthContext,
// 	passwords: PasswordsContext,
// };

export enum FeatureNames {
	auth = "auth",
	dashboard = "dashboard",
	passwords = "passwords",
	settings = "settings",
}

export interface IFeature {
	creating: boolean;
	itemId: string | null;
	name: FeatureNames | null;
	route: FeaturesRoutes | null;
	updating: boolean;
}

export interface INotification {
	status: "success" | "error";
	content: string;
}

export const initialFeature: IFeature = {
	creating: false,
	itemId: null,
	name: null,
	route: null,
	updating: false,
};

export interface IManagerContext {
	dispatch: (action: any) => void;
	error: null;
	feature: IFeature;
	loading: boolean;
	notification?: INotification;
}

export interface IManagerState {
	error: null;
	feature: IFeature;
	loading: boolean;
	notification?: INotification;
}

export const initialManagerState: IManagerState = {
	error: null,
	feature: initialFeature,
	loading: false,
	notification: undefined,
};

export const ManagerContext = createContext<IManagerContext>({} as IManagerContext);

export const useManager = () => useContext(ManagerContext);
