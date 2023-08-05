import * as React from "react";
import { useLocation } from "react-router-dom";

import { useAuth } from "../../../features/src/auth";
import {
  FeatureNames,
  FeaturesRoutes,
  initialFeature,
  useManager,
} from "../../../features/manager";
import { capitalize } from "../../../utils/string";
import { RightLink } from "./RightLink";
import { LeftLink } from "./LeftLink";

export function HeaderNav() {
  const location = useLocation();
  const { loggedIn } = useAuth();
  const manager = useManager();
  const { route, itemId, creating, updating } = manager.feature;

  // Reset manager states on location path changes
  React.useEffect(() => {
    // Reset entire feature
    if (route && location.pathname === FeaturesRoutes.dashboard) {
      manager.dispatch({ type: "set_feature", feature: initialFeature });
    }
    // Reset feature item id
    if (itemId != null && route != null && location.pathname === route) {
      manager.dispatch({ type: "set_feature_item_id", itemId: null });
    }
    // Reset feature creating status
    if (creating && !location.pathname.includes("create")) {
      manager.dispatch({ type: "set_is_creating_item", creating: false });
    }
    // Reset feature updating status
    if (updating && !location.pathname.includes("update")) {
      manager.dispatch({ type: "set_is_updating_item", updating: false });
    }
  }, [route, itemId, creating, updating, location.pathname]);

  const getHeaderTitle = () => {
    const title = manager.feature.name || FeatureNames.dashboard;
    return capitalize(title);
  };

  return (
    <nav
      role="navigation"
      className={`HeaderNav fixed top-0 left-0 ${
        loggedIn ? "md:left-[245px] md:w-[calc(100%-245px)]" : "w-full"
      } w-screen h-16 z-50 flex items-center justify-center px-6 py-4 border-b border-solid border-1 border-slate-300 bg-slate-50 text-slate-900`.trim()}
    >
      <LeftLink />
      <p className="flex-1 text-center text-lg font-bold">{getHeaderTitle()}</p>
      <RightLink />
    </nav>
  );
}
