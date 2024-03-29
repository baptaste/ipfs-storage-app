import * as React from "react";
import { NoSymbolIcon } from "@heroicons/react/24/outline";

interface UnavailableIconProps {
  onClick?: () => void;
}

export function UnavailableIcon({ onClick = () => {} }: UnavailableIconProps) {
  return (
    <div className="w-10 h-10 flex items-center justify-center p-2 rounded-lg bg-slate-600/[.3] cursor-default">
      <NoSymbolIcon className="w-6 h-6 text-slate-500" onClick={onClick} />
    </div>
  );
}
