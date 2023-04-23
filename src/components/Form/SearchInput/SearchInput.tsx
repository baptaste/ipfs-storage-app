import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { useEffect, useState } from 'react'

interface ISearchInputProps {
	value?: string
	placeholder?: string
	onChange: (e: any) => void
	onFocus?: () => void
	onBlur?: () => void
}

export function SearchInput({
	value,
	placeholder = 'Search',
	onChange,
	onFocus = () => {},
	onBlur = () => {}
}: ISearchInputProps) {
	const [focused, setFocused] = useState<boolean>(false)

	const handleFocus = () => {
		setFocused(true)
		onFocus()
	}

	const handleBlur = () => {
		setFocused(false)
		onBlur()
	}

	return (
		<div
			className={`SearchInput w-full flex flex-col items-center justify-center p-4 mb-4 bg-zinc-200 dark:bg-zinc-800 rounded-md ${
				focused ? 'border-solid border-2 border-green-700' : null
			}`}
		>
			<div className='w-full h-full flex items-center justify-between'>
				<input
					type='text'
					value={value}
					onChange={onChange}
					onFocus={handleFocus}
					onBlur={handleBlur}
					placeholder={placeholder}
					className='h-fit w-full pr-4 break-all rounded-md text-lg text-zinc-900 dark:text-zinc-50 bg-transparent focus:outline-none'
				/>
				<MagnifyingGlassIcon className='w-7 h-7 text-zinc-500 dark:text-zinc-400' />
			</div>
		</div>
	)
}