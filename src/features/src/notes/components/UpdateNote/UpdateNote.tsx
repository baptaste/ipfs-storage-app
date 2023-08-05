import * as React from "react";
import { Navigate, useLocation, useNavigate, useParams } from "react-router-dom";

import { AppButton, AppInput, AppTextArea } from "../../../../../components/Common";
import { useNotes } from "../../store";
import { patchNote } from "../../api";
import { useAuth } from "../../../auth";
import { FeaturesRoutes, useManager } from "../../../../manager";
import { IEncryptedData, encryptText } from "../../../../../utils/encryption";
import type { INote } from "../../types";

export function UpdateNote() {
  const { noteId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { notes, dispatch } = useNotes();
  const manager = useManager();

  const currentNote: INote | null | undefined = React.useMemo(() => {
    if (noteId === undefined) return null;
    return notes.find((item: INote) => item._id === noteId);
  }, [notes]);

  const [state, setState] = React.useState<any>({
    note: "",
    title: currentNote?.title || undefined,
    error: undefined,
  });

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const handleChange = (
    input: string,
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setState((state: any) => ({
      ...state,
      error: undefined,
      [input]: event.target.value,
    }));
  };

  const onUpdateNote = async () => {
    if (!user) return;
    if (currentNote) {
      let payload = { ...state };
      setIsLoading(true);
      if (state.note.length) {
        const encryptionData = await encryptText(state.note, user._id, user.password_key);
        console.log("UpdateNote encryptText - encryptionData:", encryptionData);
        if (encryptionData) {
          payload = { ...payload, note: encryptionData as IEncryptedData };
        }
      }
      const res = await patchNote(currentNote.encryption_id, payload.note, payload.title);
      if (res.success) {
        setIsLoading(false);
        dispatch({
          type: "update",
          noteId,
          updateType: res.updateType,
          note: res.note,
        });
        manager.dispatch({
          type: "set_notification",
          notification: {
            status: "success",
            content: "Note updated successfully !",
          },
        });
        navigate(`${FeaturesRoutes.notes}/${noteId}`);
      } else {
        setIsLoading(false);
        setState((state: any) => ({
          ...state,
          error: res.message || "An error occurred while updating your note.",
        }));
        manager.dispatch({
          type: "set_notification",
          notification: {
            status: "error",
            content: "An error occurred while updating your note.",
          },
        });
      }
    }
  };

  if (noteId === undefined) {
    return <Navigate to={location.state.from} replace />;
  }

  return (
    <div
      id="UpdateNote"
      className="w-full md:w-1/2 flex flex-col justify-between gap-6 md:justify-normal md:pt-[90px] md:px-6"
    >
      <h1 className="text-center text-2xl text-slate-900 font-bold">Update note</h1>
      {state.error ? <p className="w-full text-red-500 text-sm">{state.error}</p> : null}
      <div className="w-full flex flex-col items-center gap-6">
        <AppInput
          type="text"
          label="New title"
          placeholder="Title of your note"
          value={state.title}
          onChange={(e) => handleChange("title", e)}
        />
        <AppTextArea
          label="New note"
          placeholder="Content of your note"
          value={state.note}
          onChange={(e) => handleChange("note", e)}
        />
      </div>
      <AppButton
        title="Save changes"
        onClick={onUpdateNote}
        disabled={!state.note.length && !state.title}
        theme="secondary"
        isLoading={isLoading}
      />
    </div>
  );
}
