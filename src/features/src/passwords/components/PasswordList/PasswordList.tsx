import * as React from "react";
import { EmptyFeature, Spinner } from "../../../../../components/Common";
import { usePasswords } from "../../store";
import { PasswordLink } from "../PasswordLink";
import type { IPassword, IPasswords } from "../../types";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/outline";
import { SearchInput } from "../../../../../components/Form";
import { localStorage } from "../../../../../utils/localStorage";
import { useLocation } from "react-router-dom";
import { toastSuccess } from "../../../../../lib/toast";
import { usePasswordList } from "./usePasswordList";
import { hideOnInaccurateRoutePath } from "../../../../../utils/views";
import { FeaturesRoutes } from "../../../../routes";
import { useManager } from "../../../../store";

export function PasswordList() {
	const location = useLocation();
	const { passwords, password, loading, error, dispatch } = usePasswords();

	const [filterSort, setFilterSort] = React.useState<"latest" | "oldest">("latest");
	const [searchValue, setSearchValue] = React.useState<string>("");
	const [searchFocused, setSearchFocused] = React.useState<boolean>(false);

	const deferredSearchValue = React.useDeferredValue<string>(searchValue);
	const suggestionListVisible: boolean = searchFocused && !searchValue.length;

	const { alphanumericList, dateList, searchList, suggestionList } = usePasswordList(
		filterSort,
		deferredSearchValue,
	);

	if (!passwords.length) {
		return <EmptyFeature name="passwords" redirectTo="/passwords/create" />;
	}

	if (error) {
		return (
			<div className="PasswordList w-full flex flex-col justify-center items-center">
				<p className="text-red-500">{error.message}</p>
			</div>
		);
	}

	if (loading) {
		return (
			<div className="PasswordList w-full h-2/3 flex flex-col justify-center items-center">
				<Spinner />
			</div>
		);
	}

	const handleSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value.toLowerCase());
	};

	const addFoundPasswordToLocalStorage = (password: IPassword) => {
		const searchItems: IPasswords | null = localStorage.get("passwords_suggested");
		if (!searchItems) {
			return localStorage.set("passwords_suggested", [{ ...password }]);
		}
		searchItems.push(password);
		localStorage.set("passwords_suggested", searchItems);
	};

	React.useEffect(() => {
		console.log("••••••••• PasswordList component - password", password);
		if (password && location.pathname === FeaturesRoutes.passwords) {
			dispatch({ type: "password", password: null });
		}
	}, [password, location.pathname]);

	// md:pt-[534px]

	return (
		<main
			className={`PasswordList ${hideOnInaccurateRoutePath(
				"/dashboard/passwords",
			)} md:flex min-h-screen h-screen w-full md:w-[400px] md:min-w-[400px] flex flex-col items-center gap-6 md:pt-[90px] overflow-y-scroll`.trim()}
		>
			{/* Searchbar */}
			{passwords.length > 1 ? (
				<div>
					<SearchInput
						value={searchValue}
						onChange={handleSearchValueChange}
						onFocus={() => setSearchFocused(true)}
						onBlur={() => setSearchFocused(false)}
						placeholder={`Search among ${passwords.length} items`}
					/>
				</div>
			) : null}

			{/* Search list */}
			{searchList.length && !suggestionListVisible ? (
				<section className="SearchList w-full flex flex-col">
					<p className="w-full pl-8 text-lg text-slate-500 mb-4">
						{searchList.length} results for "{searchValue}"
					</p>
					<ul className="w-full flex flex-col items-center">
						{searchList.map((password) => (
							<PasswordLink
								key={password._id}
								password={password}
								onClick={() => addFoundPasswordToLocalStorage(password)}
							/>
						))}
					</ul>
				</section>
			) : null}

			{/* Suggestion list */}
			{suggestionList !== null && suggestionList.length && suggestionListVisible ? (
				<section className="SuggestionList w-full flex flex-col">
					<p className="w-full text-lg text-slate-500 mb-4">Recent search</p>
					<ul className="w-full flex flex-col items-center">
						{suggestionList.map((password) => (
							<PasswordLink key={password._id} password={password} />
						))}
					</ul>
				</section>
			) : null}

			{/* Date list */}
			<section className="Datelist w-full flex flex-col">
				{filterSort === "latest" ? (
					<p
						onClick={() => setFilterSort("oldest")}
						className="flex items-center pl-6 mb-4 text-lg text-slate-500 cursor-pointer"
					>
						Latest
						<ChevronUpIcon className="w-6 h-6 ml-2 text-slate-500" />
					</p>
				) : (
					<p
						onClick={() => setFilterSort("latest")}
						className="flex items-center pl-6 mb-4 text-lg text-slate-500 cursor-pointer"
					>
						Oldest
						<ChevronDownIcon className="w-6 h-6 ml-2 text-slate-500" />
					</p>
				)}

				<ul className="w-full flex flex-col items-center">
					{dateList.map((password) => (
						<PasswordLink key={password._id} password={password} />
					))}
				</ul>
			</section>

			{/* Alphanumeric list */}
			<section className="AlphanumericList w-full mb-20">
				<ul className="w-full flex flex-col items-center gap-6">
					{alphanumericList.map((passwordList, i) => (
						<div key={i} className="w-full">
							<p className="mb-4 py-2 pl-8 text-lg text-slate-900 bg-slate-300">
								{passwordList[0].displayed_name.slice(0, 1).toUpperCase()}
							</p>
							{passwordList.map((password) => (
								<PasswordLink key={password._id} password={password} />
							))}
						</div>
					))}
				</ul>
			</section>
		</main>
	);
}
