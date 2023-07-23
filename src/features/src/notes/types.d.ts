export interface INote {
  _id: string;
  encryption_id: string;
  owner_id: string;
  created_at: string;
  ipfs: IpfsDataType;
  plaintext: string | null; // client-only property
  visible: boolean; // client-only property
  title?: string;
  updated_at?: string;
}

export type INotes = INote[];

export type DispatchActionType =
  | "notes"
  | "loading"
  | "error"
  | "retrieve"
  | "visibility"
  | "delete"
  | "create";
