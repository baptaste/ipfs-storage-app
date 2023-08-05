import * as React from "react";
import {
  CheckCircleIcon,
  ClipboardDocumentIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/outline";

import { PasswordIcon, Spinner } from "../../../../../components/Common";
import { useNotes } from "../../store";
import { useClipboard } from "../../../../../hooks/useClipboard";
import { useAuth } from "../../../auth";
import { decryptText } from "../../../../../utils/encryption";
import { toastError } from "../../../../../lib/toast";
import { uint8ArrayToArrayBuffer } from "../../../../../utils/bytes";
import { retrieveNote } from "../../api";
import type { INote } from "../../types";

interface NoteProps {
  note: INote;
}

export function DecryptableNote(props: NoteProps) {
  const { note } = props;
  const { dispatch } = useNotes();
  const { user } = useAuth();

  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const { copied, copy } = useClipboard();

  const onRetrieveNote = async (): Promise<void> => {
    if (!note || !user) return;
    setIsLoading(true);

    const res = await retrieveNote(note.encryption_id);

    if (res.success && res.data) {
      console.log("onRetrieveNote - res.data.encrypted", res.data.encrypted);
      const encryptedArray = new Uint8Array(
        Object.values(res.data.encrypted).map((value) => value),
      );
      const vectorArray = new Uint8Array(Object.values(res.data.vector).map((value) => value));
      const encryptedArrayBuffer = uint8ArrayToArrayBuffer(encryptedArray);
      console.log("onRetrieveNote - res.data.encrypted as arrayBuff", encryptedArrayBuffer);
      const decrypted = await decryptText(
        {
          encrypted: encryptedArrayBuffer,
          vector: vectorArray,
        },
        user._id,
        user.password_key,
      );
      if (decrypted) {
        setIsLoading(false);
        dispatch({ type: "retrieve", noteId: note._id, value: decrypted });
      } else {
        setIsLoading(false);
        setError("An error occurred while decrypting your note.");
        toastError("An error occurred while decrypting your note");
      }
    } else {
      setIsLoading(false);
      setError(res.message || "An error occurred while recovering your note.");
      toastError("An error occurred while recovering your note");
    }
  };

  const toggleNoteVisibility = (): void => {
    if (!note) return;
    dispatch({ type: "visibility", noteId: note._id });
  };

  const onCopy = async () => {
    if (!note || note.plaintext === null) return;
    await copy(note.plaintext);
  };

  const renderIcon = () => {
    if (isLoading) return <Spinner size="small" />;

    if (note.plaintext === null) {
      return <PasswordIcon onClick={onRetrieveNote} size="small" />;
    }
    return (
      <div className="flex items-center">
        {note.visible ? (
          <EyeSlashIcon
            className="h-7 w-7 pt-0.5 text-slate-500 cursor-pointer"
            onClick={toggleNoteVisibility}
          />
        ) : (
          <EyeIcon
            className="h-7 w-7 pt-0.5 text-slate-500 cursor-pointer"
            onClick={toggleNoteVisibility}
          />
        )}

        {copied ? (
          <CheckCircleIcon
            onClick={onCopy}
            className="h-7 w-7 pt-0.5 ml-3 text-green-700 cursor-pointer"
          />
        ) : (
          <ClipboardDocumentIcon
            onClick={onCopy}
            className="h-7 w-7 pt-0.5 ml-3 text-slate-500 cursor-pointer"
          />
        )}
      </div>
    );
  };

  return (
    <>
      <div
        id="DecryptableNote"
        className="w-full flex flex-col items-stretch justify-between rounded-md"
      >
        <div className="w-full flex flex-col items-stretch justify-between p-4 bg-slate-200 rounded-md">
          <div className="h-full w-full flex items-start justify-between">
            <p
              className={`h-full pr-2 rounded-md text-base text-slate-900 bg-transparent ${
                note.visible ? "text-ellipsis" : ""
              }`.trim()}
            >
              {note.plaintext && note.visible ? note.plaintext : "****************"}
            </p>
            {renderIcon()}
          </div>
        </div>
      </div>
      {error ? <p className="text-red-500">{error}</p> : null}
    </>
  );
}
