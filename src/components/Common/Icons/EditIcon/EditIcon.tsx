import * as React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/outline";

interface IEditIconProps {
  onClick?: () => void;
}

export function EditIcon({ onClick = () => {} }: IEditIconProps) {
  return (
    <PencilSquareIcon
      className="w-6 h-6 md:w-5 md:h-5 text-slate-500 md:text-slate-50"
      onClick={onClick}
    />
  );
}
