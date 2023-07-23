import * as React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  UnavailableIcon,
  PasswordIcon,
  HomeIcon,
  SettingsIcon,
  LogoutIcon,
  NoteIcon,
} from "../../../components/Common";
import { isMobile } from "../../../utils/browser";
import { updateView } from "../../../utils/viewTransition";

import { FeatureNames, FeaturesRoutes, useManager } from "../../manager";
import { capitalize } from "../../../utils/string";
import { logout, useAuth } from "../../src/auth";

interface NavItem {
  available: boolean;
  name: FeatureNames | string;
  route: FeaturesRoutes | null;
  icon: JSX.Element;
  className?: string;
}

export function FeaturesNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const manager = useManager();
  const { setAccessToken } = useAuth();

  const handleNavItemClick = (route: FeaturesRoutes | null) => {
    if (route == null || location.pathname === route) return;
    if (!isMobile()) return navigate(route);
    updateView("new", () => navigate(route));
  };

  const onLogout = async () => {
    manager.dispatch({ type: "set_loading", loading: true });
    const res = await logout();
    if (res.success && res.accessToken === null) {
      manager.dispatch({ type: "set_loading", loading: false });
      setAccessToken(null);
      navigate("/");
    } else {
      manager.dispatch({ type: "set_loading", loading: false });
      manager.dispatch({
        type: "set_notification",
        notification: {
          status: "error",
          content: "An error occurred while logout to your account.",
        },
      });
    }
  };

  const links: NavItem[] = [
    {
      name: capitalize(FeatureNames.dashboard),
      route: FeaturesRoutes.dashboard,
      icon: <HomeIcon active={location.pathname === FeaturesRoutes.dashboard} />,
      available: true,
    },
    {
      name: capitalize(FeatureNames.passwords),
      route: FeaturesRoutes.passwords,
      icon: <PasswordIcon active={location.pathname.includes(FeaturesRoutes.passwords)} />,
      available: true,
    },
    {
      name: capitalize(FeatureNames.notes),
      route: FeaturesRoutes.notes,
      icon: <NoteIcon active={location.pathname.includes(FeaturesRoutes.notes)} />,
      available: true,
    },
    // Coming soon
    // { name: "Notes", route: null, icon: <UnavailableIcon />, available: false },
    { name: "Media", route: null, icon: <UnavailableIcon />, available: false },
    { name: "Finance", route: null, icon: <UnavailableIcon />, available: false },
  ];

  return (
    <nav className="FeaturesNav w-ful h-full flex flex-col justify-between ">
      <ul className="w-full flex flex-col gap-2">
        {links.map((link) => (
          <li
            key={link.name}
            id={link.name}
            className="w-full py-2 md:hover:bg-slate-800 hover:bg-slate-200 transition-colors"
          >
            <button
              key={link.name}
              onClick={() => handleNavItemClick(link.route)}
              className={`flex items-center justify-between gap-6 px-6 text-slate-50 ${
                link.available ? "cursor-pointer" : "cursor-default"
              }`}
            >
              {link.icon}
              <p
                className={`text-base ${
                  link.available ? "text-slate-900 md:text-slate-50" : "text-slate-500"
                }`}
              >
                {link.name}
              </p>
            </button>
          </li>
        ))}
      </ul>

      <ul className="flex flex-col gap-2">
        <li
          id="settings"
          className="w-full py-2 md:hover:bg-slate-800 hover:bg-slate-200 transition-colors"
        >
          <button
            onClick={() => handleNavItemClick(FeaturesRoutes.settings)}
            className="flex items-center justify-between gap-6 px-6 text-slate-50"
          >
            <SettingsIcon active={location.pathname === FeaturesRoutes.settings} />
            <p className="text-base text-slate-900 md:text-slate-50">Settings</p>
          </button>
        </li>
        <li
          id="logout"
          className="w-full py-2 md:hover:bg-slate-800 hover:bg-slate-200 transition-colors"
        >
          <button
            onClick={onLogout}
            className="flex items-center justify-between gap-6 px-6 text-slate-50"
          >
            <LogoutIcon />
            <p className="text-base text-slate-900 md:text-slate-50">Log out</p>
          </button>
        </li>
      </ul>
    </nav>
  );
}
