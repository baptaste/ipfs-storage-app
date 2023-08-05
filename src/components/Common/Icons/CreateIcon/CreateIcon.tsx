import * as React from "react";
import { PlusSmallIcon as Icon } from "@heroicons/react/24/outline";

interface ICreateIconProps {
  onClick?: () => void;
}

export function CreateIcon({ onClick = () => {} }: ICreateIconProps) {
  return (
    <Icon className="w-8 md:w-6 h-8 md:h-6 text-slate-500 md:text-slate-50" onClick={onClick} />
  );
}
