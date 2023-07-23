import * as React from "react";

import { BarsArrowUpIcon, BarsArrowDownIcon } from "@heroicons/react/24/outline";

interface TimeSortIconProps {
  direction: "up" | "down";
  size?: "small" | "medium";
  onClick?: () => void;
}

export function TimeSortIcon(props: TimeSortIconProps) {
  const { direction = "up", size = "medium", onClick } = props;

  return (
    <div className="flex items-center justify-center rounded-lg cursor-pointer">
      {direction === "up" ? (
        <BarsArrowUpIcon
          className={`${size === "small" ? "w-5 h-5" : "w-6 h-6"} text-slate-900`}
          onClick={onClick}
        />
      ) : direction === "down" ? (
        <BarsArrowDownIcon
          className={`${size === "small" ? "w-5 h-5" : "w-6 h-6"} text-slate-900`}
          onClick={onClick}
        />
      ) : null}
    </div>
  );
}
