import * as React from "react";

import { sortByDate, sortByName } from "../../../../../utils/array";
import { localStorage } from "../../../../../utils/localStorage";
import { usePasswords } from "../../store";
import { IPasswords } from "../../types";

interface PasswordListResult {
  alphanumericList: IPasswords[];
  dateList: IPasswords;
  searchList: IPasswords;
  suggestionList: IPasswords | null;
}

export function usePasswordList(
  filterSort: "latest" | "oldest",
  searchValue?: string,
): PasswordListResult {
  const { passwords } = usePasswords();

  const alphanumericList: IPasswords[] = React.useMemo(() => {
    let result: IPasswords = JSON.parse(JSON.stringify(passwords));
    result = sortByName(result, "displayed_name");
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    const fullList: IPasswords[] = chars.split("").map((char) => {
      return result.filter((password) => {
        if (char === password.displayed_name.charAt(0).toLowerCase()) return password;
        return null;
      });
    });
    return fullList.filter((list) => list.length);
  }, [passwords]);

  const dateList: IPasswords = React.useMemo(() => {
    let result: IPasswords = JSON.parse(JSON.stringify(passwords));
    result = sortByDate(result, filterSort === "oldest", 3);
    return result;
  }, [passwords, filterSort]);

  const searchList: IPasswords = React.useMemo(() => {
    if (!searchValue) return [];
    let result: IPasswords = JSON.parse(JSON.stringify(passwords));
    result = result
      .filter((password) => password.displayed_name.toLowerCase().includes(searchValue))
      .filter((item, i) => (i < 5 ? item : null));
    return result;
  }, [passwords, searchValue]);

  const suggestionList: IPasswords | null = localStorage.get("passwords_suggested");

  return {
    alphanumericList,
    dateList,
    searchList,
    suggestionList,
  };
}
