import * as React from "react";

import { capitalize } from "../../../../../utils/string";
import { Logout, useAuth } from "../../../auth";
import { DeleteAccount } from "../DeleteAccount";
import { ChangePassword } from "../ChangePassword";
import { AppButton, AppInput } from "../../../../../components/Common";
import { updateUser } from "../../api";
import { useManager } from "../../../../manager";

interface AccountState {
  email: string;
  loading: boolean;
  error?: string;
}

export function Account() {
  // const navigate = useNavigate();
  const { user } = useAuth();
  const manager = useManager();

  const [state, setState] = React.useState<AccountState>({
    email: user?.email || "",
    loading: false,
    error: undefined,
  });

  const handleChange = (key: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({ ...prev, [key]: event.target.value }));
  };

  const setError = (displayedError: string, serverError?: string) => {
    setState((prev) => ({
      ...prev,
      loading: false,
      error: displayedError,
    }));
    manager.dispatch({
      type: "set_notification",
      notification: {
        status: "error",
        content: displayedError,
      },
    });
    if (serverError) {
      console.error(serverError);
    }
  };

  const resetEmailState = () => {
    setState((prev) => ({ ...prev, email: user?.email || "" }));
  };

  const handleUpdateAccount = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!user) return;
    let res;
    let updateType: string = "";
    if (state.email !== user?.email) {
      updateType = "email";
      res = await updateUser({ ...user, email: state.email });
    }
    if (!res?.success) {
      return setError(
        `An error occurred while updating your ${updateType}. Please try again.`,
        res?.message,
      );
    }
    manager.dispatch({
      type: "set_notification",
      notification: {
        status: "success",
        content: `${capitalize(updateType)} updated successfully !`,
      },
    });
  };

  return (
    <main className="Account w-full md:w-1/2 md:mx-auto flex flex-col gap-6 justify-between md:justify-normal md:pt-[90px] px-6">
      {user ? (
        <>
          <form onSubmit={handleUpdateAccount}>
            <section id="preferences" className="w-full flex flex-col gap-6">
              <h1 className="font-bold text-xl pb-2 text-slate-900 border-b border-solid border-1 border-slate-300">
                Preferences
              </h1>
              <div className="w-full flex flex-col mb-5">
                <p className="text-lg">Language</p>
                <p className="text-base">{capitalize(user.preferences.language)}</p>
              </div>
            </section>
            <section id="profile" className="w-full flex flex-col gap-6">
              <h1 className="font-bold text-xl pb-2 text-slate-900 border-b border-solid border-1 border-slate-300">
                Profile
              </h1>
              <div className="w-full flex flex-col gap-2">
                <p className="font-bold">Email</p>
                <AppInput
                  type="email"
                  name="Email"
                  value={state.email}
                  error={!!state.error}
                  onChange={(e) => handleChange("email", e)}
                />
                {state.email !== user?.email ? (
                  <div className="flex items-center gap-6">
                    <AppButton
                      type="submit"
                      title="Save"
                      theme="success"
                      isLoading={state.loading}
                    />
                    <AppButton title="Cancel" onClick={resetEmailState} />
                  </div>
                ) : null}
              </div>
            </section>
          </form>

          <div className="w-full flex flex-col gap-2">
            <p className="font-bold">Master password</p>
            <ChangePassword />
          </div>
          <div className="w-full">
            <Logout />
          </div>
          <div className="w-full">
            <DeleteAccount />
          </div>
        </>
      ) : null}
    </main>
  );
}
