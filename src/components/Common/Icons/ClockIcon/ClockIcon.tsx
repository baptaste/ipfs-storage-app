import * as React from "react";

import { ClockIcon as Icon } from "@heroicons/react/24/outline";

interface ClockIconProps {
  size?: "small" | "medium";
  onClick?: () => void;
}

export function ClockIcon(props: ClockIconProps) {
  const { size = "medium", onClick } = props;

  return (
    <div className="flex items-center justify-center rounded-lg cursor-pointer">
      <Icon
        className={`${size === "small" ? "w-5 h-5" : "w-6 h-6"} text-slate-900`}
        onClick={onClick}
      />
    </div>
  );
}
