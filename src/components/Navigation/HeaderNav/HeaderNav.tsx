import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { PlusSmallIcon, RocketLaunchIcon } from "@heroicons/react/24/solid";
import { useAuth } from "../../../features/src/auth";
import { updateView } from "../../../utils/viewTransition";
import { isMobile } from "../../../utils/browser";
import { FeaturesRoutes } from "../../../features/routes";
import { FeatureNames, initialFeature, useManager } from "../../../features/store";
import { EditIcon } from "../../Common";
import { capitalize } from "../../../utils/string";

export function HeaderNav() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const location = useLocation();
  const { loggedIn } = useAuth();
  const manager = useManager();

  // Reset manager states on location path changes
  React.useEffect(() => {
    // Reset feature
    if (manager.feature.route && location.pathname === FeaturesRoutes.dashboard) {
      manager.dispatch({ type: "set_feature", feature: initialFeature });
    }
    // Reset feature item id
    if (
      manager.feature.itemId &&
      manager.feature.route != null &&
      location.pathname === manager.feature.route
    ) {
      manager.dispatch({ type: "set_feature_item_id", itemId: null });
    }
    // Reset feature creating status
    if (manager.feature.creating && !location.pathname.includes("create")) {
      manager.dispatch({ type: "set_is_creating_item", creating: false });
    }
    // Reset feature updating status
    if (manager.feature.updating && !location.pathname.includes("update")) {
      manager.dispatch({ type: "set_is_updating_item", updating: false });
    }
  }, [manager.feature, location.pathname]);

  const getHeaderTitle = () => {
    const title = manager.feature.name || FeatureNames.dashboard;
    return capitalize(title);
  };

  const leftIcon = React.useMemo(() => {
    if (!loggedIn) {
      return (
        <Link to="/" className="justify-start absolute left-6">
          <RocketLaunchIcon className="w-8 h-8 text-slate-900 color-primary" />
        </Link>
      );
    }
    if (location.pathname !== FeaturesRoutes.dashboard) {
      const { route } = manager.feature;
      const isOnFeatureRootPage = route != null && location.pathname === route;
      return (
        <button
          className="GoBack justify-start absolute left-6"
          onClick={() => {
            if (isOnFeatureRootPage) {
              // Navigate to dashboard since user is on root feature page
              navigate(FeaturesRoutes.dashboard);
            } else {
              // Navigate to previous page since user is either on item, creation or update pages
              if (!isMobile()) return goBack();
              updateView("old", goBack);
            }
          }}
        >
          <ArrowLeftIcon className="w-6 h-6 text-slate-500" />
        </button>
      );
    }
    return null;
  }, [loggedIn, location.pathname, manager.feature]);

  const rightIcon = React.useMemo(() => {
    if (!loggedIn) {
      return (
        <Link to="/" className="justify-start absolute left-6">
          <RocketLaunchIcon className="w-8 h-8 text-slate-900 color-primary" />
        </Link>
      );
    }
    if (
      location.pathname !== FeaturesRoutes.dashboard &&
      location.pathname.includes(FeaturesRoutes.dashboard) &&
      manager.feature.route != null
    ) {
      const createIcon = <PlusSmallIcon className="w-8 h-8 text-slate-900" />;
      const updateIcon = <EditIcon />;
      let icon = null;
      let path = "";
      if (manager.feature.itemId == null) {
        if (!manager.feature.creating) {
          icon = createIcon;
          path = `${manager.feature.route}/create`;
        }
      } else if (!manager.feature.updating) {
        icon = updateIcon;
        path = `${manager.feature.route}/${manager.feature.itemId}/update`;
      }
      return (
        <Link to={path} className="absolute right-6">
          {icon}
        </Link>
      );
    }
    return null;
  }, [loggedIn, location.pathname, manager.feature]);

  return (
    <nav
      role="navigation"
      className={`HeaderNav fixed top-0 left-0 ${
        loggedIn ? "md:left-[245px] md:w-[calc(100%-245px)]" : "w-full"
      } w-screen h-16 z-50 flex items-center justify-center px-6 py-4 border-b border-solid border-1 border-slate-300 bg-slate-50 text-slate-900`.trim()}
    >
      {leftIcon}
      <p className="flex-1 text-center text-lg font-bold">{getHeaderTitle()}</p>
      {rightIcon}
    </nav>
  );
}
