import * as React from "react";
import { DocumentTextIcon } from "@heroicons/react/24/outline";

interface INoteIconProps {
  active?: boolean;
  size?: "small" | "medium";
  onClick?: () => void;
}

export function NoteIcon({ active = false, size = "medium", onClick = () => {} }: INoteIconProps) {
  return (
    <div
      className={`flex items-center justify-center p-2 rounded-lg cursor-pointer ${
        active ? "bg-primary" : "bg-slate-700/[.7]"
      }`}
    >
      <DocumentTextIcon
        className={`${size === "small" ? "w-5 h-5" : "w-6 h-6"} text-slate-50`}
        onClick={onClick}
      />
    </div>
  );
}
