import * as React from "react";
import { useNavigate } from "react-router-dom";

import { AppButton, InputPassword } from "../../../../../components/Common";
import { useAuth } from "../../../auth";

import { useManager } from "../../../../manager";

interface ChangePasswordState {
  oldPassword: string;
  newPassword: string;
  confirmedPassword: string;
  loading: boolean;
  error?: string;
}

export function ChangePassword() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const manager = useManager();

  const [state, setState] = React.useState<ChangePasswordState>({
    oldPassword: "",
    newPassword: "",
    confirmedPassword: "",
    loading: false,
    error: undefined,
  });

  const handleChange = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, [key]: event.target.value }));
  };

  // const onChangePassword = async () => {
  //   if (!user) return;

  //   setLoading(true);
  //   const res = await changePassword(state.password);

  //   if (res.success) {
  //     setLoading(false);
  //     manager.dispatch({
  //       type: "set_notification",
  //       notification: {
  //         status: "success",
  //         content: "Your account password has been updated successfully !",
  //       },
  //     });
  //     navigate("/settings");
  //   } else {
  //     setLoading(false);
  //     setState((state: any) => ({
  //       ...state,
  //       error: res.message ? res.message : "",
  //     }));
  //     manager.dispatch({
  //       type: "set_notification",
  //       notification: {
  //         status: "error",
  //         content: "An error occurred while updating your account password. Please try again.",
  //       },
  //     });
  //   }
  // };

  return (
    <div id="ChangePassword" className="w-full h-full flex flex-col gap-6">
      <InputPassword
        placeholder="Old password"
        value={state.oldPassword}
        onChange={(e) => handleChange("oldPassword", e)}
      />
      <InputPassword
        placeholder="New password"
        value={state.newPassword}
        onChange={(e) => handleChange("newPassword", e)}
      />
      <InputPassword
        placeholder="Confirm new password"
        value={state.confirmedPassword}
        onChange={(e) => handleChange("confirmedPassword", e)}
      />
      <p className="text-sm text-slate-500">
        Your password must contains at least 8 characters. Avoid the use of common passwords.
      </p>

      <AppButton
        title="Update master password"
        theme="secondary"
        onClick={() => null}
        isLoading={state.loading}
        disabled={
          !state.oldPassword ||
          !state.newPassword ||
          !state.confirmedPassword ||
          state.newPassword !== state.confirmedPassword
        }
      />

      {state.error?.length ? (
        <p className="w-full text-center text-red-500 text-base mb-4">{state.error}</p>
      ) : null}
    </div>
  );
}
