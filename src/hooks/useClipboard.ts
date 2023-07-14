import { useState } from "react";
import { clipboardCopy } from "../utils/browser";

export const useClipboard = () => {
  const [copied, setCopied] = useState<boolean>(false);

  const copy = async (value: string): Promise<void> => {
    clipboardCopy(value)
      .then(() => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return { copied, copy };
};
