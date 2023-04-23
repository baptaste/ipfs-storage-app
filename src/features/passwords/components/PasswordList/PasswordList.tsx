import { useState, useMemo, useDeferredValue, useEffect } from 'react'
import { CustomLink, EmptyFeature, Spinner } from '../../../../components/Common'
import { usePasswords } from '../../store'
import { PasswordLink } from '../PasswordLink'
import type { IPassword, IPasswords } from '../../types.d'
import { sortByDate, sortByName } from '../../../../utils/array'
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline'
import { SearchInput } from '../../../../components/Form'
import { localStorage } from '../../../../utils/localStorage'
import { useLocation, useParams } from 'react-router-dom'
import { toastSuccess } from '../../../../lib/toast'

export function PasswordList() {
	const location = useLocation()
	const { passwords, loading, error } = usePasswords()

	const [filterSort, setFilterSort] = useState<string>('latest')

	const [searchValue, setSearchValue] = useState<string>('')
	const deferredSearchValue = useDeferredValue<string>(searchValue)

	const [searchFocused, setSearchFocused] = useState<boolean>(false)
	const suggestionListVisible: boolean = searchFocused && !searchValue.length

	if (passwords.length === 0) {
		return <EmptyFeature name='passwords' redirectTo='/passwords/create' />
	}

	if (error) {
		return (
			<div className='PasswordList w-full flex flex-col justify-center items-center'>
				<p className='text-red-500'>{error.message}</p>
			</div>
		)
	}

	if (loading) {
		return (
			<div className='PasswordList w-full h-2/3 flex flex-col justify-center items-center'>
				<Spinner />
			</div>
		)
	}

	const handleSearchValueChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchValue(event.target.value.toLowerCase())
	}

	const addFoundPasswordToLocalStorage = (password: IPassword) => {
		const searchItems: IPasswords | null = localStorage.get('passwords_suggested')
		if (!searchItems) {
			return localStorage.set('passwords_suggested', [{ ...password }])
		}
		searchItems.push(password)
		localStorage.set('passwords_suggested', searchItems)
	}

	const suggestionList: IPasswords | null = localStorage.get('passwords_suggested')

	const searchList: IPasswords = useMemo(() => {
		if (!searchValue.length) return []
		let result = [...passwords]
		result = result
			.filter((password) => password.title.toLowerCase().includes(deferredSearchValue))
			.filter((item, i) => (i < 5 ? item : null))
		return result
	}, [passwords, deferredSearchValue])

	const dateList: IPasswords = useMemo(() => {
		let result = [...passwords]
		result = sortByDate(result, filterSort === 'oldest', 3)
		return result
	}, [passwords, filterSort])

	const alphanumericList: IPasswords[] = useMemo(() => {
		let result = [...passwords]
		result = sortByName(result, 'title')
		const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'

		const fullList: IPasswords[] = chars.split('').map((char) => {
			return result.filter((password) => {
				return char === password.title.charAt(0).toLowerCase() ? password : null
			})
		})

		return fullList.filter((list) => list.length)
	}, [passwords])

	// Notify user whenever password update is triggered
	useEffect(() => {
		if (location.state !== null) {
			if (location.state === 'created') {
				toastSuccess('Password created successfully !')
			} else if (location.state === 'deleted') {
				toastSuccess('Password deleted successfully !')
			}
		}
	}, [location.state])

	return (
		<main className='PasswordList w-full flex flex-col justify-center items-center'>
			{passwords.length > 1 ? (
				<SearchInput
					value={searchValue}
					onChange={handleSearchValueChange}
					onFocus={() => setSearchFocused(true)}
					onBlur={() => setSearchFocused(false)}
					placeholder={`Search among ${passwords.length} items`}
				/>
			) : null}

			{suggestionList !== null && suggestionList.length && suggestionListVisible ? (
				<section className='SuggestionList w-full flex flex-col mt-4'>
					<p className='w-full text-lg text-zinc-500 mb-4'>Recent search</p>
					<ul className='w-full flex flex-col items-center'>
						{suggestionList.map((password) => (
							<PasswordLink key={password._id} password={password} />
						))}
					</ul>
				</section>
			) : null}

			{searchList.length && !suggestionListVisible ? (
				<section className='SearchList w-full flex flex-col mt-4'>
					<p className='w-full text-lg text-zinc-500 mb-4'>
						{searchList.length} results for "{searchValue}"
					</p>
					<ul className='w-full flex flex-col items-center'>
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

			<section className='Datelist w-full flex flex-col mt-4'>
				{filterSort === 'latest' ? (
					<p
						onClick={() => setFilterSort('oldest')}
						className='flex items-center mb-4 text-lg text-zinc-500 dark:text-zinc-400 cursor-pointer'
					>
						Latest
						<ChevronUpIcon className='w-6 h-6 ml-2 text-zinc-500 dark:text-zinc-400' />
					</p>
				) : (
					<p
						onClick={() => setFilterSort('latest')}
						className='flex items-center mb-4 text-lg text-zinc-500 dark:text-zinc-400 cursor-pointer'
					>
						Oldest
						<ChevronDownIcon className='w-6 h-6 ml-2 text-zinc-500 dark:text-zinc-400' />
					</p>
				)}

				<ul className='w-full flex flex-col items-center'>
					{dateList.map((password) => (
						<PasswordLink key={password._id} password={password} />
					))}
				</ul>
			</section>

			<section className='AlphanumericList w-full flex flex-col mt-4 mb-20'>
				<ul className='w-full flex flex-col items-center mt-4'>
					{alphanumericList.map((passwordList, i) => {
						return (
							<div key={i} className='w-full'>
								<p className='mb-4 rounded-md py-2 px-4 text-lg text-zinc-500 dark:text-zinc-400 bg-zinc-200 dark:bg-zinc-800'>
									{passwordList[0].title.slice(0, 1).toUpperCase()}
								</p>
								{passwordList.map((password) => (
									<PasswordLink key={password._id} password={password} />
								))}
							</div>
						)
					})}
				</ul>
			</section>

			{/* <div className='w-full fixed bottom-20 px-4 mb-5'>
				<CustomLink
					path='/dashboard/passwords/create'
					text='Create password'
					theme='secondary'
				/>
			</div> */}
		</main>
	)
}
