import * as React from "react";

import { FeatureNames, FeatureType, FeaturesRoutes, IFeatureItem } from "../../manager";
import { ClockIcon, SearchInput, Spinner, TimeSortIcon } from "../../../components/Common";
import { IPasswords } from "../../src/passwords/types";
import { INotes } from "../../src/notes/types";

import { hideOnInaccurateRoutePath } from "../../../utils/views";
import { FeatureLink } from "../FeatureLink";
import { useFeatureList } from "../../hooks/useFeatureList";

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

  const [filterSort, setFilterSort] = React.useState<"latest" | "oldest">("latest");
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [searchFocused, setSearchFocused] = React.useState<boolean>(false);

  const deferredSearchValue = React.useDeferredValue<string>(searchValue);
  const suggestionListVisible: boolean = searchFocused && !searchValue.length;

  const itemSortKey: string = name === FeatureNames.passwords ? "displayed_name" : "title";

  const values = useFeatureList(data, filterSort, itemSortKey, name, deferredSearchValue);

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

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value.toLowerCase());
  };

  const handleSearchFocus = () => {
    setSearchFocused(true);
  };

  const handleSearchBlur = () => {
    if (!suggestionListVisible && !values.searchList.length) {
      setSearchFocused(false);
      setSearchValue("");
    }
  };

  const handleSearchCancel = () => {
    setSearchFocused(false);
    setSearchValue("");
  };

  const dispatchOwnContextItem = (item: IFeatureItem) => {
    const stateKey = type as string;
    dispatch({ type, [stateKey]: item });
  };

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
            onChange={handleSearchChange}
            onFocus={handleSearchFocus}
            onCancel={handleSearchCancel}
            onBlur={handleSearchBlur}
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
                type={type}
                // icon={<PasswordIcon active={item.plaintext !== null} size="small" />}
                onClick={() => {
                  values.addItemToLocalStorage(item);
                  dispatchOwnContextItem(item);
                  setSearchValue("");
                  setSearchFocused(false);
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
            {values.suggestionList.reverse().map((item) => (
              <FeatureLink
                key={item._id}
                item={item}
                path={`${route}/${item._id}`}
                type={type}
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
          <button
            onClick={() => setFilterSort("oldest")}
            className="flex items-center gap-2 pl-6 text-lg text-slate-500 cursor-pointer"
          >
            <TimeSortIcon direction="up" />
            Latest
          </button>
        ) : (
          <button
            onClick={() => setFilterSort("latest")}
            className="flex items-center gap-2 pl-6 text-lg text-slate-500 cursor-pointer"
          >
            <TimeSortIcon direction="down" />
            Oldest
          </button>
        )}
        <ul className="w-full flex flex-col items-center">
          {values.dateList.map((item) => (
            <FeatureLink
              key={item._id}
              item={item}
              path={`${route}/${item._id}`}
              type={type}
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
                  type={type}
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
