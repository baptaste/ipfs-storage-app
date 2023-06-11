import { createContext, useContext } from "react";
import { FeaturesRoutes } from "../routes";
import { AuthProvider } from "../src/auth";
import { AuthContext } from "../src/auth/store/context";
import { PasswordsContext, PasswordsProvider } from "../src/passwords";

const featuresContext = {
	auth: AuthContext,
	passwords: PasswordsContext,
};

export enum FeatureNames {
	auth = "auth",
	dashboard = "dashboard",
	passwords = "passwords",
	settings = "settings",
}

export interface IFeature {
	name: FeatureNames;
	route: FeaturesRoutes;
}

export interface IFeaturesContext {
	feature: IFeature | null;
	loading: boolean;
	error: any;
	dispatch: (action: any) => void;
}

export interface IFeaturesState {
	feature: IFeature | null;
	loading: false;
	error: null;
}

export const initialFeaturesState: IFeaturesState = {
	feature: null,
	loading: false,
	error: null,
};

export const FeaturesContext = createContext<IFeaturesContext>({} as IFeaturesContext);

export const useFeatures = () => useContext(FeaturesContext);
