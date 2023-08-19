import * as React from "react";
import { useNavigate } from "react-router-dom";
import { AppButton, Spinner } from "../../../../../components/Common";
import { logout } from "../../api";
import { useAuth } from "../../store";
import { useManager } from "../../../../manager";
import { localStorage } from "../../../../../utils/localStorage";

export function Logout() {
  const navigate = useNavigate();
  const { setAccessToken } = useAuth();
  const manager = useManager();

  const onLogout = async () => {
    manager.dispatch({ type: "set_loading", loading: true });
    const res = await logout();
    if (res.success && res.accessToken === null) {
      manager.dispatch({ type: "set_loading", loading: false });
      setAccessToken(null);
      localStorage.clear("ipfs_storage_passwords_suggested");
      localStorage.clear("ipfs_storage_notes_suggested");
      navigate("/");
    } else {
      manager.dispatch({ type: "set_loading", loading: false });
      manager.dispatch({
        type: "set_error",
        error: "An error occurred while logout to your account.",
      });
      manager.dispatch({
        type: "set_notification",
        notification: {
          status: "error",
          content: "An error occurred while logout to your account.",
        },
      });
    }
  };

  if (manager.loading) return <Spinner />;

  return <AppButton title="Log out" theme="tertiary" onClick={onLogout} />;
}
