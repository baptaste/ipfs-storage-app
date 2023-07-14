import * as React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";

interface IEditIconProps {
  onClick?: () => void;
}

export function EditIcon({ onClick = () => {} }: IEditIconProps) {
  return <PencilSquareIcon className="w-7 h-7 text-slate-500" onClick={onClick} />;
}
