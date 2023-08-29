import * as React from "react";

import { useAuth } from "../../auth";
import { fetchPasswords } from "../api";
import { getPasswordsWithUtilityProps } from "../utils/password";
import { PasswordsContext } from "./context";
import { initialPasswordsState, passwordsReducer } from "./reducer";
import { useManager } from "../../../manager";

interface PasswordsProviderProps {
  children?: React.ReactNode;
}

export function PasswordsProvider(props?: PasswordsProviderProps) {
  const manager = useManager();
  const { loggedIn } = useAuth();

  const [state, dispatch] = React.useReducer(passwordsReducer, initialPasswordsState);

  const initPasswords = async () => {
    dispatch({ type: "loading", loading: true });
    try {
      const res = await fetchPasswords();
      if (res.success && res.passwords) {
        const passwords = getPasswordsWithUtilityProps(res.passwords);
        dispatch({ type: "passwords", passwords });
      }
    } catch (err) {
      dispatch({ type: "error", err });
      manager.dispatch({
        type: "set_notification",
        notification: {
          status: "error",
          content: "An error occured while initializing your passwords.",
        },
      });
    } finally {
      dispatch({ type: "loading", loading: false });
    }
  };

  React.useEffect(() => {
    let abort = false;

    if (!abort && loggedIn) {
      (async () => {
        await initPasswords();
      })();
    }

    return () => {
      abort = true;
    };
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
