import * as React from "react";
import { IFeatureItem } from "../manager";
import { sortByDate, sortByName } from "../../utils/array";
import { localStorage } from "../../utils/localStorage";

interface FeatureListValues {
  alphanumericList: Array<IFeatureItem[]>;
  dateList: IFeatureItem[];
  searchList: IFeatureItem[];
  suggestionList: IFeatureItem[] | null;
  addItemToLocalStorage: (item: IFeatureItem) => void;
}

export function useFeatureList(
  data: IFeatureItem[],
  filterSort: "latest" | "oldest",
  itemKey: string,
  featureName: string,
  searchValue?: string,
): FeatureListValues {
  console.log("useFeatureList - data", data);

  const localStorageSuggestedItems: IFeatureItem[] | null = localStorage.get(
    `${featureName}_suggested`,
  );

  const addItemToLocalStorage = (item: IFeatureItem) => {
    if (!localStorageSuggestedItems) {
      return localStorage.set(`${featureName}_suggested`, [{ ...item }]);
    }
    const items = [...localStorageSuggestedItems];
    if (items.length === 3) {
      items.shift();
    }
    items.push(item);
    localStorage.set(`${featureName}_suggested`, items);
  };

  const checkForLocalStorageItemsToDelete = (): string[] => {
    const items: string[] = [];
    if (localStorageSuggestedItems != null) {
      const dataItemsId: string[] = data.map(({ _id }) => _id);
      const suggestedItemsId: string[] = localStorageSuggestedItems.map(({ _id }) => _id);
      if (suggestedItemsId.length) {
        suggestedItemsId.forEach((id) => {
          if (!dataItemsId.includes(id)) {
            items.push(id);
          }
        });
      }
    }
    return items;
  };

  const deleteItemsFromLocalStorage = (itemsId: string[]): void => {
    if (localStorageSuggestedItems != null && itemsId.length) {
      const newSuggestedItems: IFeatureItem[] = localStorageSuggestedItems.filter(
        ({ _id }) => !itemsId.includes(_id),
      );
      localStorage.set(`${featureName}_suggested`, newSuggestedItems);
    }
  };

  React.useEffect(() => {
    if (localStorageSuggestedItems != null) {
      const itemsIdToRemove = checkForLocalStorageItemsToDelete();
      if (itemsIdToRemove.length) {
        deleteItemsFromLocalStorage(itemsIdToRemove);
      }
    }
  }, [JSON.stringify(data), localStorageSuggestedItems]);

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

  const values = React.useMemo(() => {
    return {
      alphanumericList,
      dateList,
      searchList,
      suggestionList: localStorageSuggestedItems,
      addItemToLocalStorage,
    };
  }, [alphanumericList, dateList, searchList, localStorageSuggestedItems]);

  return values;
}
