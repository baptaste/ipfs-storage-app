import * as React from "react";
import { useNavigate, Link } from "react-router-dom";
import { AppButton, AppInput, InputPassword } from "../../../../../components/Common";
import { VisiterLayout } from "../../../../../components/Layout";
import { UserPreferences } from "../../api/types";
import { createUser } from "../../services/createUser";
import { useManager } from "../../../../manager";

interface IRegisterState {
  [key: string]: string | boolean;
  email: string;
  password: string;
  loading: boolean;
  error: boolean;
  errorMsg: string;
}

export function Register() {
  const navigate = useNavigate();
  const manager = useManager();

  const [state, setState] = React.useState<IRegisterState>({
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setState((prev) => ({ ...prev, loading: true }));

    const preferences: UserPreferences = {
      language: "en",
    };

    const res = await createUser(state.email, state.password, preferences);

    if (res?.success) {
      setState((prev) => ({ ...prev, loading: false }));
      manager.dispatch({
        type: "set_notification",
        notification: {
          status: "success",
          content: "Account created successfully. Thanks for registering !",
        },
      });
      navigate("/auth/login");
    } else {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: true,
        errorMsg: res?.message ? res.message : "",
      }));
      manager.dispatch({
        type: "set_notification",
        notification: {
          status: "error",
          content: "An error occurred while creating your account. Please try again.",
        },
      });
    }
  };

  return (
    <VisiterLayout>
      <div className="w-full md:w-[400px] h-full flex flex-col items-center justify-center gap-6">
        <div>
          <h1 className="text-center text-2xl font-bold">Welcome friend !</h1>
          Already an account ?{" "}
          <Link to="/auth/login" className="font-bold">
            Log in
          </Link>
        </div>
        <form onSubmit={handleSubmit} className="w-full my-4 flex flex-col items-center gap-6">
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
            title="Register"
            type="submit"
            disabled={!state.email.length || !state.password.length || state.error}
            isLoading={state.loading}
          />
        </form>
      </div>
    </VisiterLayout>
  );
}
