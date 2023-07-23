import * as React from "react";
import { IFeatureItem } from "../manager";
import { sortByDate, sortByName } from "../../utils/array";
import { localStorage } from "../../utils/localStorage";

interface FeatureListResult {
  alphanumericList: Array<IFeatureItem[]>;
  dateList: IFeatureItem[];
  searchList: IFeatureItem[];
  suggestionList: IFeatureItem[] | null;
}

export function useFeatureList(
  data: IFeatureItem[],
  filterSort: "latest" | "oldest",
  itemKey: string,
  featureName: string,
  searchValue?: string,
): FeatureListResult {
  console.log("useFeatureList - data", data);

  const getAlphaNumericList = React.useCallback(() => {
    let result: IFeatureItem[] = JSON.parse(JSON.stringify(data));
    result = sortByName(result, itemKey);
    const chars = "abcdefghijklmnopqrstuvwxyz0123456789";
    const fullList: Array<IFeatureItem[]> = chars.split("").map((char) => {
      return result.filter((item) => {
        if (char === item[itemKey].charAt(0).toLowerCase()) return item;
        return null;
      });
    });
    return fullList.filter((list) => list.length);
  }, [data, itemKey]);

  const getDateList = React.useCallback(() => {
    let result: IFeatureItem[] = JSON.parse(JSON.stringify(data));
    result = sortByDate(result, filterSort === "oldest", 3);
    return result;
  }, [data, filterSort]);

  const getSearchList = React.useCallback(() => {
    if (!searchValue) return [];
    let result: IFeatureItem[] = JSON.parse(JSON.stringify(data));
    result = result
      .filter((item) => item[itemKey].toLowerCase().includes(searchValue))
      .filter((item, i) => (i < 5 ? item : null));
    return result;
  }, [data, searchValue, itemKey]);

  const alphanumericList = getAlphaNumericList();
  const dateList = getDateList();
  const searchList = getSearchList();
  const suggestionList: IFeatureItem[] | null = localStorage
    .get(`${featureName}_suggested`)
    ?.reverse();

  const values = React.useMemo(() => {
    return {
      alphanumericList,
      dateList,
      searchList,
      suggestionList,
    };
  }, [alphanumericList, dateList, searchList, suggestionList]);

  return values;
}
