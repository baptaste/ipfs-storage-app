import * as React from "react";

import { XMarkIcon } from "@heroicons/react/24/outline";

interface CloseIconProps {
  size?: "small" | "medium";
  onClick?: () => void;
}

export function CloseIcon(props: CloseIconProps) {
  const { size = "medium", onClick } = props;

  return (
    <div className="w-10 h-10 flex items-center justify-center p-2 rounded-lg cursor-pointer">
      <XMarkIcon
        className={`${size === "small" ? "w-5 h-5" : "w-6 h-6"} text-slate-900`}
        onClick={onClick}
      />
    </div>
  );
}
