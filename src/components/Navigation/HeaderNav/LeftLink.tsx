import * as React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";

import { useAuth } from "../../../features/src/auth";
import { FeaturesRoutes, useManager } from "../../../features/manager";
import { isMobile } from "../../../utils/browser";
import { updateView } from "../../../utils/viewTransition";
import { ArrowLeftIcon } from "../../Common";

export function LeftLink() {
  const navigate = useNavigate();
  const goBack = () => navigate(-1);
  const { pathname } = useLocation();
  const { loggedIn } = useAuth();
  const manager = useManager();
  const { route } = manager.feature;

  const leftLink = React.useMemo(() => {
    if (!loggedIn) {
      return (
        <Link to="/" className="justify-start absolute left-6">
          <RocketLaunchIcon className="w-8 h-8 text-slate-900 color-primary" />
        </Link>
      );
    }
    if (pathname !== FeaturesRoutes.dashboard) {
      const isOnFeatureRootPage = route != null && pathname === route;
      return (
        <button
          className="GoBack justify-start"
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
          <ArrowLeftIcon />
        </button>
      );
    }
    return null;
  }, [loggedIn, pathname, manager.feature]);

  return leftLink;
}
