import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppButton, AppInput, InputPassword } from "../../../../../components/Common";
import { VisiterLayout } from "../../../../../components/Layout";

import { FeaturesRoutes, useManager } from "../../../../manager";
import { saveEncryptionKeyToIDBStore } from "../../services";
import { hashMasterPassword } from "../../../auth";
import { registerUser } from "../../api";

interface IRegisterState {
  email: string;
  password: string;
  loading: boolean;
  error?: string;
}

export function Register() {
  const navigate = useNavigate();
  const manager = useManager();

  const [state, setState] = React.useState<IRegisterState>({
    email: "",
    password: "",
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

  const handleRegisterSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!state.password.length || !state.email.length) return;
    setState((prev) => ({ ...prev, loading: true }));
    try {
      // hash/derive user master password using pbkdf2
      const masterPassword = await hashMasterPassword(state.password);
      if (!masterPassword) {
        return setError("An error occurred while creating your master password. Please try again.");
      }
      const res = await registerUser(state.email, masterPassword, {
        language: "english",
      });
      if (!res?.success || !res.user?._id) {
        return setError(
          "An error occurred while creating your account. Please try again.",
          res?.message,
        );
      }
      const isKeySaved = await saveEncryptionKeyToIDBStore(res.user._id, masterPassword);
      if (!isKeySaved) {
        return setError("An error occurred while creating your account. Please try again.");
      }
      setState((prev) => ({ ...prev, loading: false }));
      manager.dispatch({
        type: "set_notification",
        notification: {
          status: "success",
          content: "Account created successfully. Thanks for registering !",
        },
      });
      navigate(FeaturesRoutes.login);
    } catch (err) {
      return setError("An error occurred while creating your account. Please try again.");
    }
  };

  return (
    <VisiterLayout>
      <div className="w-full md:w-[400px] h-full flex flex-col items-center justify-center gap-6">
        <div>
          <h1 className="text-center text-2xl font-bold">Welcome friend !</h1>
          Already an account ?{" "}
          <Link to="/login" className="font-bold">
            Log in
          </Link>
        </div>
        <form
          onSubmit={handleRegisterSubmit}
          className="w-full my-4 flex flex-col items-center gap-6"
        >
          {state.error?.length ? (
            <p className="w-full text-center text-red-500 text-base my-4">{state.error}</p>
          ) : null}
          <AppInput
            type="email"
            name="Email"
            placeholder="Email"
            value={state.email}
            error={!!state.error}
            onChange={(e) => handleChange("email", e)}
          />
          <InputPassword
            name="Password"
            value={state.password}
            error={!!state.error}
            placeholder="Password"
            onChange={(e) => handleChange("password", e)}
          />
          <AppButton
            title="Register"
            type="submit"
            disabled={!state.email.length || !state.password.length || !!state.error}
            isLoading={state.loading}
          />
        </form>
      </div>
    </VisiterLayout>
  );
}
