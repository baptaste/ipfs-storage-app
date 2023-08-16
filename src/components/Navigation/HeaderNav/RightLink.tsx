import * as React from "react";
import { Link, useLocation } from "react-router-dom";
import { RocketLaunchIcon } from "@heroicons/react/24/solid";

import { useAuth } from "../../../features/src/auth";
import { FeaturesRoutes, useManager } from "../../../features/manager";
import { CreateIcon, EditIcon } from "../../Common";

export function RightLink() {
  const { pathname } = useLocation();
  const { loggedIn } = useAuth();
  const manager = useManager();
  const { route, type, itemId, creating, updating } = manager.feature;

  let icon: JSX.Element | null = null;
  let path: string = "";
  let linkText: string = "";

  const createIcon = <CreateIcon />;
  const updateIcon = <EditIcon />;

  const rightLink = React.useMemo(() => {
    if (!loggedIn) {
      return (
        <Link to="/" className="justify-start absolute left-6">
          <RocketLaunchIcon className="w-8 h-8 text-slate-900 color-primary" />
        </Link>
      );
    }
    if (
      pathname !== FeaturesRoutes.dashboard &&
      pathname.includes(FeaturesRoutes.dashboard) &&
      route != null
    ) {
      if (itemId == null) {
        if (!creating) {
          icon = createIcon;
          path = `${route}/create`;
          linkText = "New";
        }
      } else if (!updating) {
        icon = updateIcon;
        path = `${route}/${itemId}/update`;
        linkText = "Edit";
      }
      if (creating || updating) {
        return null;
      }
      return (
        <Link
          to={path}
          className="md:min-w-[140px] md:flex md:items-center md:justify-center md:gap-2 md:py-1 md:px-4 md:border-solid md:border-2 md:bg-primary md:hover:bg-primary-hover md:color-white md:border-primary md:rounded-md md:drop-shadow-md cursor-pointer md:transition-colors"
        >
          {icon}
          <span className="hidden md:block">{`${linkText} ${type}`}</span>
        </Link>
      );
    }
  }, [loggedIn, pathname, route, type, itemId, creating, updating]);

  return rightLink;
}
