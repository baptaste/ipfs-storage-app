import * as React from "react";

import { FeatureNames, FeatureType, FeaturesRoutes, IFeatureItem } from "../../manager";
import {
  ClockIcon,
  PasswordIcon,
  SearchInput,
  Spinner,
  TimeSortIcon,
} from "../../../components/Common";
import { IPasswords } from "../../src/passwords/types";
import { INotes } from "../../src/notes/types";

import { hideOnInaccurateRoutePath } from "../../../utils/views";
import { FeatureLink } from "../FeatureLink";
import { useFeatureList } from "../../hooks/useFeatureList";
import { localStorage } from "../../../utils/localStorage";

export interface FeatureListProps {
  data: IPasswords | INotes;
  dispatch: (action: any) => void;
  loading: boolean;
  name: FeatureNames;
  route: FeaturesRoutes;
  type: FeatureType;
  error?: any;
}

export function FeatureList(props: FeatureListProps) {
  const { data, name, route, type, dispatch, loading, error } = props;

  // const [items, setItems] = React.useState<IPasswords | INotes | []>(data);

  const [filterSort, setFilterSort] = React.useState<"latest" | "oldest">("latest");
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [searchFocused, setSearchFocused] = React.useState<boolean>(false);

  const deferredSearchValue = React.useDeferredValue<string>(searchValue);
  const suggestionListVisible: boolean = searchFocused && !searchValue.length;

  const itemSortKey: string = name === FeatureNames.passwords ? "displayed_name" : "title";

  const values = useFeatureList(data, filterSort, itemSortKey, name, deferredSearchValue);

  // if (!data.length) {
  //   return <EmptyFeature name={name} redirectTo={route} />;
  // }

  if (error) {
    return (
      <div className="FeatureList w-full flex flex-col justify-center items-center">
        <p className="text-red-500">{error.message}</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="FeatureList w-full h-2/3 flex flex-col justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const handleSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value.toLowerCase());
  };

  const addItemToLocalStorage = (item: IFeatureItem) => {
    const suggestedItems: IFeatureItem[] | null = localStorage.get(`${name}_suggested`);
    if (!suggestedItems) {
      return localStorage.set(`${name}_suggested`, [{ ...item }]);
    }
    if (suggestedItems.length === 3) {
      suggestedItems.shift();
    }
    suggestedItems.push(item);
    localStorage.set(`${name}_suggested`, suggestedItems);
  };

  const dispatchOwnContextItem = (item: IFeatureItem) => {
    const stateKey = type as string;
    dispatch({ type, [stateKey]: item });
  };

  React.useEffect(() => {
    if (!searchFocused) {
      setSearchValue("");
    }
  }, [searchFocused]);

  return (
    <div
      className={`FeatureList ${hideOnInaccurateRoutePath(
        route,
      )} md:flex min-h-screen h-screen w-full md:w-[400px] md:min-w-[400px] flex flex-col items-center gap-10 md:pt-[90px] overflow-y-scroll`.trim()}
    >
      {/* Searchbar */}
      {data.length ? (
        <div className="w-full px-6">
          <SearchInput
            focused={searchFocused}
            value={searchValue}
            onChange={handleSearchValueChange}
            onFocus={() => setSearchFocused(true)}
            onCancel={() => setSearchFocused(false)}
            onBlur={() => {
              if (!suggestionListVisible) {
                setSearchFocused(false);
              }
            }}
          />
        </div>
      ) : null}

      {/* Search list */}
      {values.searchList.length && !suggestionListVisible ? (
        <section className="SearchList w-full flex flex-col gap-2">
          <p className="w-full pl-6 text-lg text-slate-500">
            {values.searchList.length} result{values.searchList.length > 1 ? "s" : ""} for "
            {searchValue}"
          </p>
          <ul className="w-full flex flex-col items-center">
            {values.searchList.map((item) => (
              <FeatureLink
                key={item._id}
                item={item}
                path={`${route}/${item._id}`}
                icon={<PasswordIcon active={item.plaintext !== null} size="small" />}
                onClick={() => {
                  addItemToLocalStorage(item);
                  dispatchOwnContextItem(item);
                }}
              />
            ))}
          </ul>
        </section>
      ) : null}

      {/* Suggestion list */}
      {values.suggestionList != null && values.suggestionList?.length && suggestionListVisible ? (
        <section className="SuggestionList w-full flex flex-col gap-2">
          <div className="w-full flex items-center gap-2 pl-6">
            <ClockIcon />
            <p className="text-lg text-slate-500">Recent search</p>
          </div>
          <ul className="w-full flex flex-col items-center">
            {values.suggestionList.map((item) => (
              <FeatureLink
                key={item._id}
                item={item}
                path={`${route}/${item._id}`}
                onClick={() => {
                  dispatchOwnContextItem(item);
                  setSearchFocused(false);
                }}
              />
            ))}
          </ul>
        </section>
      ) : null}

      {/* Date list */}
      <section className="Datelist w-full flex flex-col gap-2">
        {filterSort === "latest" ? (
          <p
            role="button"
            onClick={() => setFilterSort("oldest")}
            className="flex items-center gap-2 pl-6 text-lg text-slate-500 cursor-pointer"
          >
            <TimeSortIcon direction="up" />
            Latest
          </p>
        ) : (
          <p
            role="button"
            onClick={() => setFilterSort("latest")}
            className="flex items-center gap-2 pl-6 text-lg text-slate-500 cursor-pointer"
          >
            <TimeSortIcon direction="down" />
            Oldest
          </p>
        )}
        <ul className="w-full flex flex-col items-center">
          {values.dateList.map((item) => (
            <FeatureLink
              key={item._id}
              item={item}
              path={`${route}/${item._id}`}
              onClick={() => dispatchOwnContextItem(item)}
            />
          ))}
        </ul>
      </section>

      {/* Alphanumeric list */}
      <section className="AlphanumericList w-full mb-20">
        <ul className="w-full flex flex-col items-center gap-6">
          {values.alphanumericList.map((list) => (
            <div key={list[0]._id} className="w-full">
              <div className="w-full flex items-center justify-between mb-4 py-2 pl-8 pr-6 bg-slate-300">
                <p className="text-lg text-slate-900">
                  {list[0][itemSortKey].slice(0, 1).toUpperCase()}
                </p>
                <span className="px-2 rounded-md text-sm text-slate-500 bg-slate-200">
                  {list.length}
                </span>
              </div>
              {list.map((item) => (
                <FeatureLink
                  key={item._id}
                  item={item}
                  path={`${route}/${item._id}`}
                  onClick={() => dispatchOwnContextItem(item)}
                />
              ))}
            </div>
          ))}
        </ul>
      </section>
    </div>
  );
}
