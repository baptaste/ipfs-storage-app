import * as React from "react";

import { LockClosedIcon } from "@heroicons/react/24/outline";

interface IPasswordIconProps {
  active?: boolean;
  size?: "small" | "medium";
  onClick?: () => void;
}

export function PasswordIcon(props: IPasswordIconProps) {
  const { active = false, size = "medium", onClick } = props;

  return (
    <div
      className={`w-10 h-10 flex items-center justify-center p-2 rounded-lg cursor-pointer ${
        active ? "bg-primary" : "bg-slate-700/[.7]"
      }`}
    >
      <LockClosedIcon
        className={`${size === "small" ? "w-5 h-5" : "w-6 h-6"} text-slate-50`}
        onClick={onClick}
      />
    </div>
  );
}
