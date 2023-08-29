import * as React from "react";

import { ManagerContext, initialManagerState } from "./context";
import { managerReducer } from "./reducer";
import { toastError, toastSuccess } from "../../lib/toast";
import { ProviderProps } from "../provider";

export function ManagerProvider({ children }: ProviderProps) {
  const [state, dispatch] = React.useReducer(managerReducer, initialManagerState);
  const { error, feature, loading, notification } = state;

  const manager = React.useMemo(() => {
    return {
      dispatch,
      error,
      feature,
      loading,
      notification,
    };
  }, [state, dispatch]);

  /// DEV ONLY ///
  React.useEffect(() => {
    console.log("ManagerProvider - state", state);
  }, [state]);
  /// END DEV ONLY ///

  React.useEffect(() => {
    let timeoutID: number;
    const animationDuration: number = 5000;

    if (notification) {
      if (notification.status === "success") {
        toastSuccess(notification.content);
      } else if (notification.status === "error") {
        toastError(notification.content);
      }
      timeoutID = setTimeout(() => {
        // Reset notification
        manager.dispatch({
          type: "set_notification",
          notification: undefined,
        });
      }, animationDuration);
    }

    return () => {
      clearTimeout(timeoutID);
    };
  }, [JSON.stringify(notification)]);

  return <ManagerContext.Provider value={manager}>{children}</ManagerContext.Provider>;
}
