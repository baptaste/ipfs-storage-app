import * as React from "react";
import { ArrowLeftIcon as Icon } from "@heroicons/react/24/outline";

interface IArrowLeftIconProps {
  onClick?: () => void;
}

export function ArrowLeftIcon({ onClick = () => {} }: IArrowLeftIconProps) {
  return <Icon className="w-6 h-6 text-slate-500" onClick={onClick} />;
}
