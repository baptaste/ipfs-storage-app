import { createContext, useContext } from "react";
import { IpfsDataType } from "../types";

// const ManagerContext = {
// auth: AuthContext,
// passwords: PasswordsContext,
// };

export enum FeatureType {
  note = "note",
  password = "password",
}

export enum FeatureNames {
  auth = "auth",
  dashboard = "dashboard",
  notes = "notes",
  passwords = "passwords",
  settings = "settings",
}

export enum FeaturesRoutes {
  auth = "/auth",
  login = "/auth/login",
  register = "/auth/register",
  dashboard = "/dashboard",
  notes = "/dashboard/notes",
  passwords = "/dashboard/passwords",
  settings = "/settings",
}

export interface IFeature {
  creating: boolean;
  empty: boolean;
  itemId: string | null;
  name: FeatureNames | null;
  route: FeaturesRoutes | null;
  type: FeatureType | null;
  updating: boolean;
}

export interface IFeatureItem {
  [key: string]: any;
  _id: string;
  encryption_id: string;
  owner_id: string;
  created_at: string;
  ipfs: IpfsDataType;
  plaintext: string | null; // client-only property
  visible: boolean; // client-only property

  displayed_name?: string;
  description?: string;
  email?: string;
  image_url?: string;
  title?: string;
  updated_at?: string;
  website_url?: string;
}

export interface INotification {
  status: "success" | "error";
  content: string;
}

export const initialFeature: IFeature = {
  creating: false,
  empty: false,
  itemId: null,
  name: null,
  route: null,
  type: null,
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
