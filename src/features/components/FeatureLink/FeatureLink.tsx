import * as React from "react";
import { Link, useLocation } from "react-router-dom";

import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { formatDate } from "../../../utils/date";
import { UnavailableIcon } from "../../../components/Common";
import { IFeatureItem } from "../../manager";

interface IFeatureLinkProps {
  item: IFeatureItem;
  path: string;
  icon?: React.JSX.Element;
  onClick?: () => void;
}

export function FeatureLink(props: IFeatureLinkProps) {
  const { item, path, icon, onClick } = props;
  const { pathname } = useLocation();
  const selected = pathname.includes(item._id);
  const linkIcon = icon || <UnavailableIcon onClick={() => {}} />;

  return (
    <li
      role="button"
      id={item._id}
      onClick={onClick}
      className={`FeatureLink w-full px-6 py-2 border-b border-solid border-1 border-slate-300 hover:bg-slate-200 transition-colors ${
        selected ? "bg-slate-200" : ""
      }`}
    >
      <Link
        to={path}
        state={{ from: pathname }}
        className="flex items-center justify-between gap-4"
      >
        <div className="flex justify-center">
          {item.image_url ? (
            <img
              src={item.image_url}
              alt={`${item.displayed_name || item.title} icon`}
              className="w-10 h-10 flex items-center justify-center"
            />
          ) : (
            linkIcon
          )}

          <div className="w-full flex flex-col ml-4">
            {item.displayed_name ? (
              <p className="text-base font-bold">{item.displayed_name}</p>
            ) : (
              <p className="text-base font-bold">{item.title}</p>
            )}

            {item.updated_at ? (
              <span className="text-sm text-slate-500">
                Modified on {formatDate(item.updated_at, false, "en-US")}
              </span>
            ) : (
              <span className="text-sm text-slate-500">
                Added on {formatDate(item.created_at, false, "en-US")}
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
