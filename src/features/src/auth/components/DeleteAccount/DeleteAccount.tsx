import * as React from "react";
import { useNavigate } from "react-router-dom";
import { DangerZone } from "../../../../../components/Common";
import { deleteAccount } from "../../api";
import { setHeaderToken } from "../../../../../lib/axios";
import { useAuth } from "../../store";
import { useManager } from "../../../../manager";

export function DeleteAccount() {
  const { user, setUser, setAccessToken } = useAuth();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>("");
  const navigate = useNavigate();
  const manager = useManager();

  const onDeleteAccount = async () => {
    if (!user) return;

    setLoading(true);

    const res = await deleteAccount(user._id);

    if (res.success) {
      setLoading(false);
      setUser(null);
      setAccessToken(null);
      setHeaderToken(null);
      navigate("/auth/login");
      manager.dispatch({
        type: "set_notification",
        notification: {
          status: "success",
          content: "Your account has been deleted successfully.",
        },
      });
    } else {
      setLoading(false);
      setError(res.message ? res.message : "");
      manager.dispatch({
        type: "set_notification",
        notification: {
          status: "error",
          content: "An error occurred while deleting your account. Please try again.",
        },
      });
    }
  };

  return (
    <>
      {error.length ? (
        <p className="w-full text-center text-red-500 text-base my-4">{error}</p>
      ) : null}

      <DangerZone
        title="Delete account"
        subtitle="Permanently delete your account."
        text="It involves the loss of all your data, including your profile, passwords etc., along with your authentification associations. Once you delete your account, there is no going back so please be certain."
        confirmation="Delete account"
        loading={loading}
        onConfirm={onDeleteAccount}
      />
    </>
  );
}
