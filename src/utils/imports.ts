import { lazy } from "react";

export function lazyImport(filePath: string, componentName: string) {
  return lazy(async () => {
    return import(filePath).then((module) => {
      return { default: module[componentName] };
    });
  });
}
