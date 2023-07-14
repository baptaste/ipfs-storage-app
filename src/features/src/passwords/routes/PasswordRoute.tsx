import * as React from "react";
import { Navigate, Outlet, useLocation, useParams } from "react-router-dom";
import { lazyImport } from "../../../../utils/imports";
import { usePasswords } from "../store";
import type { IPassword } from "../types";
import { useManager } from "../../../store";

const Password = lazyImport("../features/src/passwords", "Password");

export function PasswordRoute() {
  const { passwordId } = useParams();
  const { passwords } = usePasswords();
  const location = useLocation();
  const manager = useManager();

  const password: IPassword | null | undefined = React.useMemo(() => {
    if (!passwordId || !passwords) return null;
    return passwords.find((item: IPassword) => item._id === passwordId);
  }, [passwords, location.pathname]);

  // Navigate to previous page if there is no password or passwordId
  if (passwordId === undefined || passwordId !== password?._id || !password) {
    return <Navigate to={location.state.from} replace />;
  }

  React.useEffect(() => {
    manager.dispatch({ type: "set_feature_item_id", itemId: password._id });
  }, []);

  return (
    <>
      <Password password={password} />
      <Outlet />
    </>
  );
}
