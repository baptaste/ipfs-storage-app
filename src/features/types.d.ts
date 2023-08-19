export interface User {
  _id: string;
  email: string;
  password_key: string;
  preferences: UserPreferences;
  created_at: string;
}

export interface UserPreferences {
  language: string;
}

export interface IpfsDataType {
  cid: string;
  size: number;
  path: string;
}
