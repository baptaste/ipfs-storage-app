import { useLocation } from "react-router-dom";

export function hideOnInaccurateRoutePath(path: string) {
  const location = useLocation();
  return location.pathname !== path ? "hidden" : "";
}
