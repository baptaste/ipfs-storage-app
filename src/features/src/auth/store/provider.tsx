import * as React from "react";
import { AuthContext } from "./context";
import { getAccessToken } from "../api";

import { setHeaderToken } from "../../../../lib/axios";
import { retrieveUserEncryptionKey } from "../../../../utils/encryption";
import { User } from "../../../types";
import { useManager } from "../../../manager";

interface AuthProviderProps {
  children?: React.ReactNode;
}

export function AuthProvider(props?: AuthProviderProps) {
  const manager = useManager();

  const [accessToken, setAccessToken] = React.useState<string | null>(null);
  const [user, setUser] = React.useState<User | null>(null);
  const [encryptionKey, setEncryptionKey] = React.useState<CryptoKey | undefined>(undefined);
  const [error, setError] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  const resetStates = () => {
    setAccessToken(null);
    setUser(null);
    setEncryptionKey(undefined);
    setError(null);
    setLoading(false);
  };

  const initAuthUser = async () => {
    setLoading(true);
    try {
      const tokenRes = await getAccessToken();
      const { success, accessToken, user } = tokenRes;
      if (success && accessToken && user) {
        setAccessToken(accessToken);
        setHeaderToken(accessToken);
        setUser(user);
        const keyRes = await retrieveUserEncryptionKey(user._id, user.password_key);
        if (keyRes) {
          setEncryptionKey(keyRes);
        }
      }
    } catch (err) {
      console.error("getAccessToken err:", err);
      manager.dispatch({
        type: "set_notification",
        notification: {
          status: "error",
          content: "An error occured while initializing your account.",
        },
      });
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    let abort = false;
    setLoading(true);

    if (!abort) {
      (async () => {
        await initAuthUser();
      })();
    }

    return () => {
      abort = true;
      resetStates();
    };
  }, []);

  const authProviderValue = React.useMemo(() => {
    const loggedIn = accessToken !== null && user !== null && encryptionKey !== undefined;
    const valueObj = {
      accessToken,
      setAccessToken,
      loggedIn,
      user,
      setUser,
      encryptionKey,
      setEncryptionKey,
      error,
      loading,
    };
    return valueObj;
  }, [accessToken, user, encryptionKey, error, loading]);

  return <AuthContext.Provider value={authProviderValue}>{props?.children}</AuthContext.Provider>;
}
