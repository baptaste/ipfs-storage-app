import * as React from "react";
import { ArrowLeftOnRectangleIcon as Icon } from "@heroicons/react/24/outline";

interface LogoutIconProps {
  onClick?: () => void;
}

export function LogoutIcon({ onClick = () => {} }: LogoutIconProps) {
  return (
    <div className="flex items-center justify-center p-2 rounded-lg bg-slate-600/[.3]">
      <Icon className="w-6 h-6 text-slate-50" onClick={onClick} />
    </div>
  );
}
