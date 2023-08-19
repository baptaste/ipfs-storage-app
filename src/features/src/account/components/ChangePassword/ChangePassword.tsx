import * as React from "react";
import { useNavigate } from "react-router-dom";

import { AppButton, InputPassword } from "../../../../../components/Common";
import { useAuth } from "../../../auth";

import { useManager } from "../../../../manager";

export function ChangePassword() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const manager = useManager();

  const [state, setState] = React.useState<any>({
    password: "",
    passwordConfirm: "",
    error: "",
  });

  const [loading, setLoading] = React.useState<boolean>(false);

  const handleChange = (input: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setState((state: any) => ({
      ...state,
      error: "",
      [input]: event.target.value,
    }));
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
    <>
      {state.error.length ? (
        <p className="w-full text-center text-red-500 text-base mb-4">{state.error}</p>
      ) : null}

      <div className="w-full h-full flex flex-col items-center justify-between">
        <div className="w-full flex flex-col items-center ">
          <InputPassword
            placeholder="New password"
            value={state.password}
            onChange={(e) => handleChange("password", e)}
          />
          <InputPassword
            placeholder="Confirm new password"
            value={state.passwordConfirm}
            onChange={(e) => handleChange("passwordConfirm", e)}
          />
          <p className="">
            Your password must contains at least 8 characters. Avoid the use of common passwords.
          </p>
        </div>

        <AppButton
          title="Save new password"
          onClick={() => null}
          disabled={
            !state.password || !state.passwordConfirm || state.password !== state.passwordConfirm
          }
          theme="secondary"
          isLoading={loading}
        />
      </div>
    </>
  );
}
