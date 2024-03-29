import * as React from "react";
import { Link, useLocation } from "react-router-dom";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import type { IPassword } from "../../types";
import { formatDate } from "../../../../../utils/date";
import { PasswordIcon } from "../../../../../components/Common";
import { usePasswords } from "../../store";
import { FeaturesRoutes } from "../../../../manager";

interface IPasswordLinkProps {
  password: IPassword;
  onClick?: () => void;
}

export function PasswordLink({ password, onClick = () => {} }: IPasswordLinkProps) {
  const { pathname } = useLocation();
  const { dispatch } = usePasswords();
  const selected = pathname.includes(password._id);

  const onPasswordLinkClick = () => {
    dispatch({ type: "password", password });
    if (onClick) onClick();
  };

  return (
    <li
      id={password._id}
      role="button"
      onClick={onPasswordLinkClick}
      className={`PasswordLink w-full px-6 py-2 border-b border-solid border-1 border-slate-300 hover:bg-slate-200 transition-colors ${
        selected ? "bg-slate-200" : ""
      }`}
    >
      <Link
        to={`${FeaturesRoutes.passwords}/${password._id}`}
        state={{ from: pathname, pageName: password.displayed_name }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center justify-center">
          {password.image_url ? (
            <img
              src={password.image_url}
              alt="Password icon"
              className="w-9 h-9 flex items-center justify-center"
            />
          ) : (
            <PasswordIcon active={password.plaintext !== null} size="small" />
          )}

          <div className="w-full flex flex-col ml-4">
            <p className="text-base font-bold">{password.displayed_name}</p>
            {password.updated_at ? (
              <span className="text-sm text-slate-500">
                Modified on {formatDate(password.updated_at, false, "en-US")}
              </span>
            ) : (
              <span className="text-sm text-slate-500">
                Added on {formatDate(password.created_at, false, "en-US")}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center">
          <ArrowRightIcon className="w-6 h-6 text-slate-500" />
        </div>
      </Link>
    </li>
  );
}
