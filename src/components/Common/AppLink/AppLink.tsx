import * as React from "react";
import { Link } from "react-router-dom";

enum LinkThemes {
  primary = "border-solid border-2 bg-primary hover:bg-primary-hover color-white border-primary",
  secondary = "border-solid border-2 bg-white color-primary border-primary",
  none = "",
}

export interface AppLinkProps {
  path: string;
  classes?: string;
  children?: React.ReactNode;
  text?: string;
  theme?: "primary" | "secondary" | "none";
  // disabled?: boolean;
  // icon?: JSX.Element | null;
  // onClick?: ((e?: React.MouseEvent) => void) | undefined;
  // onMouseEnter?: (e: React.MouseEvent) => void;
  // onMouseLeave?: (e: React.MouseEvent) => void;
}

export function AppLink(props: AppLinkProps) {
  const { path, text = "", classes = "", children, theme = "primary" } = props;
  const linkTheme = LinkThemes[theme];
  const defaultClasses = `w-full md:min-w-[260px] flex items-center justify-center gap-4 text-center p-3 font-bold text-lg rounded-md drop-shadow-md cursor-pointer transition-colors ${linkTheme}`;
  const className = classes.length ? `${defaultClasses} ${classes}` : defaultClasses;

  return (
    <Link to={path} className={className}>
      {text}
      {children}
    </Link>
  );
}
