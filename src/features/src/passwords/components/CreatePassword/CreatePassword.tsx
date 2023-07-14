import * as React from "react";
import { useNavigate } from "react-router-dom";

import { AppButton, AppInput, InputPassword } from "../../../../../components/Common";
import { usePasswords } from "../../store";
import { createPassword } from "../../api";
import { useAuth } from "../../../auth";
import { encryptText } from "../../../../../utils/encryption";
import { useManager } from "../../../../store";
import { FeaturesRoutes } from "../../../../routes";

export function CreatePassword() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { dispatch } = usePasswords();
  const manager = useManager();

  const [state, setState] = React.useState<any>({
    error: undefined,
    password: "",
    title: undefined,
    websiteUrl: undefined,
  });

  const [isLoadingNewPassword, setIsLoadingNewPassword] = React.useState<boolean>(false);

  const handleChange = (input: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev: any) => ({
      ...prev,
      error: undefined,
      [input]: event.target.value,
    }));
  };

  const onCreatePassword = async () => {
    if (!user) return;
    if (!state.password) {
      return setState((prev: any) => ({
        ...prev,
        error: "Password is required.",
      }));
    }
    setIsLoadingNewPassword(true);
    const encryptionData = await encryptText(state.password, user._id, user.password_key);
    console.log("CreatePassword encryptText - encryptionData:", encryptionData);
    if (encryptionData?.encrypted) {
      const res = await createPassword(encryptionData, state.title, state.websiteUrl);
      if (res.success) {
        setIsLoadingNewPassword(false);
        const password = { ...res.password, plaintext: null, visible: false };
        dispatch({ type: "create", password });
        manager.dispatch({
          type: "set_notification",
          notification: {
            status: "success",
            content: "Password created successfully !",
          },
        });
        navigate(FeaturesRoutes.passwords);
      } else {
        setIsLoadingNewPassword(false);
        setState((prev: any) => ({
          ...prev,
          error: res.message || "An error occurred while creating your password.",
        }));
        manager.dispatch({
          type: "set_notification",
          notification: {
            status: "error",
            content: "An error occurred while creating your password.",
          },
        });
      }
    } else {
      setIsLoadingNewPassword(false);
      setState((prev: any) => ({
        ...prev,
        error: "An error occurred while encrypting your password.",
      }));
      manager.dispatch({
        type: "set_notification",
        notification: {
          status: "error",
          content: "An error occurred while creating your password.",
        },
      });
    }
  };

  return (
    <div className="CreatePassword w-full md:w-1/2 flex flex-col justify-between gap-6 md:justify-normal md:pt-[90px] md:px-6">
      <h1 className="text-center text-2xl text-slate-900 font-bold">Create password</h1>
      <div className="w-full flex flex-col items-center gap-6">
        <InputPassword
          label="Enter a password"
          placeholder="Password"
          value={state.password}
          onChange={(e) => handleChange("password", e)}
          required
          error={state.error}
        />
        <AppInput
          type="text"
          label="Website address"
          placeholder="Ex: https://www.amazon.com"
          value={state.websiteUrl}
          onChange={(e) => handleChange("websiteUrl", e)}
        />
        <AppInput
          type="text"
          label="Title"
          placeholder="Name your password"
          value={state.title}
          onChange={(e) => handleChange("title", e)}
        />
      </div>
      <AppButton
        title="Create"
        onClick={onCreatePassword}
        disabled={!state.password || (!state.title && !state.websiteUrl)}
        theme="secondary"
        isLoading={isLoadingNewPassword}
      />
    </div>
  );
}
