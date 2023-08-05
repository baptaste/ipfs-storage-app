import * as React from "react";
import { useNavigate } from "react-router-dom";

import { AppButton, AppInput, AppTextArea } from "../../../../../components/Common";
import { useNotes } from "../../store";
import { createNote } from "../../api";
import { useAuth } from "../../../auth";
import { encryptText } from "../../../../../utils/encryption";
import { FeaturesRoutes, useManager } from "../../../../manager";
import { extractTitleFromText } from "../../../../../utils/string";

export function CreateNote() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { dispatch } = useNotes();
  const manager = useManager();

  const [state, setState] = React.useState<any>({
    note: "",
    title: undefined,
    error: undefined,
  });

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleChange = (
    input: string,
    event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setState((prev: any) => ({
      ...prev,
      error: undefined,
      [input]: event.target.value,
    }));
  };

  const onCreate = async () => {
    if (!user) return;
    if (!state.note) {
      return setState((prev: any) => ({
        ...prev,
        error: "Note is required.",
      }));
    }
    setLoading(true);
    const encryptionData = await encryptText(state.note, user._id, user.password_key);
    console.log("CreateNote encryptText - encryptionData:", encryptionData);
    if (encryptionData?.encrypted) {
      let noteTitle = state.title;
      if (!noteTitle) {
        noteTitle = extractTitleFromText(state.note);
        console.log("user didn't choose a title, here is one:", noteTitle);
      }
      const res = await createNote(encryptionData, noteTitle);
      if (res.success) {
        setLoading(false);
        const note = { ...res.note, plaintext: null, visible: false };
        dispatch({ type: "create", note });
        manager.dispatch({
          type: "set_notification",
          notification: {
            status: "success",
            content: "Note created successfully !",
          },
        });
        navigate(FeaturesRoutes.notes);
      } else {
        setLoading(false);
        setState((prev: any) => ({
          ...prev,
          error: res.message || "An error occurred while creating your note.",
        }));
        manager.dispatch({
          type: "set_notification",
          notification: {
            status: "error",
            content: "An error occurred while creating your note.",
          },
        });
      }
    } else {
      setLoading(false);
      setState((prev: any) => ({
        ...prev,
        error: "An error occurred while encrypting your note.",
      }));
      manager.dispatch({
        type: "set_notification",
        notification: {
          status: "error",
          content: "An error occurred while creating your note.",
        },
      });
    }
  };

  return (
    <div
      id="CreateNote"
      className="w-full md:w-1/2 flex flex-col justify-between gap-6 md:justify-normal md:pt-[90px] md:px-6"
    >
      <h1 className="text-center text-2xl text-slate-900 font-bold">Create note</h1>
      {state.error ? <p className="w-full text-red-500 text-sm">{state.error}</p> : null}
      <div className="w-full flex flex-col items-center gap-6">
        <AppInput
          type="text"
          label="Title"
          placeholder="Name your note"
          value={state.title}
          onChange={(e) => handleChange("title", e)}
        />
        <AppTextArea
          name="note"
          label="Enter a note"
          placeholder="Note"
          value={state.note}
          onChange={(e) => handleChange("note", e)}
          required
        />
      </div>
      <AppButton
        title="Create"
        onClick={onCreate}
        disabled={!state.note}
        theme="secondary"
        isLoading={loading}
      />
    </div>
  );
}
