import * as React from "react";
import { Link } from "react-router-dom";

import { AppInput } from "../../../../../components/Common/AppInput";
import { InputPassword, AppButton } from "../../../../../components/Common";
import { VisiterLayout } from "../../../../../components/Layout";
import { setHeaderToken } from "../../../../../lib/axios";
import { useAuth } from "../../store";
import { loginUser } from "../../services/loginUser";
import { useManager } from "../../../../manager";

interface ILoginState {
  [key: string]: string | boolean;
  email: string;
  password: string;
  loading: boolean;
  error: boolean;
  errorMsg: string;
}

export function Login() {
  const { setAccessToken, setUser, setEncryptionKey } = useAuth();
  // const navigate = useNavigate();
  const manager = useManager();

  const [state, setState] = React.useState<ILoginState>({
    email: "",
    password: "",
    loading: false,
    error: false,
    errorMsg: "",
  });

  const handleChange = (input: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setState((prev) => ({
      ...prev,
      error: false,
      errorMsg: "",
      [input]: event.target.value,
    }));
  };

  const onSubmitLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setState((prev) => ({ ...prev, loading: true }));

    const res = await loginUser(state.email, state.password);
    console.log("Login - res:", res);

    if (!res?.success) {
      manager.dispatch({
        type: "set_notification",
        notification: {
          status: "error",
          content: "An error occurred while log in to your account. Please try again.",
        },
      });
      setState((prev) => ({
        ...prev,
        loading: false,
        error: true,
        errorMsg: res?.message || "Invalid credentials.",
      }));
      return;
    }

    if (res.accessToken && res.user && res.encryptionKey) {
      setState((prev) => ({ ...prev, loading: false }));
      setAccessToken(res.accessToken);
      setHeaderToken(res.accessToken);
      setUser(res.user);
      setEncryptionKey(res.encryptionKey);
      // navigate('/')
    }
  };

  return (
    <VisiterLayout>
      <div className="w-full md:w-[400px] h-full flex flex-col items-center justify-center gap-6">
        <div>
          <h1 className="w-full text-center text-2xl font-bold">Welcome back !</h1>
          Not yet registered ?{" "}
          <Link to="/auth/register" className="font-bold">
            Sign Up
          </Link>
        </div>

        <form onSubmit={onSubmitLogin} className="w-full my-4 flex flex-col items-center gap-6">
          {state.errorMsg?.length ? (
            <p className="w-full text-center text-red-500 text-base my-4">{state.errorMsg}</p>
          ) : null}
          <AppInput
            type="email"
            name="Email"
            placeholder="Email"
            value={state.email}
            error={state.error}
            onChange={(e) => handleChange("email", e)}
          />
          <InputPassword
            name="Password"
            value={state.password}
            error={state.error}
            placeholder="Password"
            onChange={(e) => handleChange("password", e)}
          />
          <AppButton
            title="Log in"
            type="submit"
            disabled={!state.email.length || !state.password.length || state.error}
            theme="secondary"
            isLoading={state.loading}
          />
        </form>
      </div>
    </VisiterLayout>
  );
}
