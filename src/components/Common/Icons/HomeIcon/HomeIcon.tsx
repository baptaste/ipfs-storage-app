import * as React from "react";
import { HomeIcon as Icon } from "@heroicons/react/24/outline";

interface IHomeIconProps {
  active: boolean;
  onClick?: () => void;
}

export function HomeIcon({ active, onClick = () => {} }: IHomeIconProps) {
  return (
    <div
      className={`flex items-center justify-center p-2 rounded-lg ${
        active ? "bg-primary" : "bg-slate-600/[.3]"
      }`}
    >
      <Icon className="w-6 h-6 text-slate-50" onClick={onClick} />
    </div>
  );
}
