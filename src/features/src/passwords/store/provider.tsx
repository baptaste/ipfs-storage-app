import * as React from "react";

import { useAuth } from "../../auth";
import { fetchPasswords } from "../api";
import { getPasswordsWithUtilityProps } from "../utils/password";
import { PasswordsContext } from "./context";
import { initialPasswordsState, passwordsReducer } from "./reducer";

interface PasswordsProviderProps {
  children?: React.ReactNode;
}

export function PasswordsProvider(props?: PasswordsProviderProps) {
  const { loggedIn } = useAuth();
  const [state, dispatch] = React.useReducer(passwordsReducer, initialPasswordsState);

  React.useEffect(() => {
    console.log("PasswordsProvider - loggedIn:", loggedIn);
    if (loggedIn) {
      console.log("PasswordsProvider mount, call fetchPasswords... loggedIn:", loggedIn);
      dispatch({ type: "loading", loading: true });

      fetchPasswords()
        .then((res) => {
          if (res.success && res.passwords) {
            const passwords = getPasswordsWithUtilityProps(res.passwords);
            console.log("PasswordsProvider - res.passwords", res.passwords);
            dispatch({ type: "passwords", passwords });
          }
        })
        .catch((error) => dispatch({ type: "error", error }))
        .finally(() => dispatch({ type: "loading", loading: false }));
    }
  }, [loggedIn]);

  const passwordsValue = React.useMemo(() => {
    return {
      passwords: state.passwords,
      password: state.password,
      error: state.error,
      loading: state.loading,
      dispatch,
    };
  }, [state.passwords, state.password, state.error, state.loading, dispatch]);

  return (
    <PasswordsContext.Provider value={passwordsValue}>{props?.children}</PasswordsContext.Provider>
  );
}
