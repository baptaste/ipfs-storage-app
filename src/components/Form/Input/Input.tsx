import { useState } from 'react'
import { useClipboard } from '../../../hooks/useClipboard'
import type { IInputProps } from './Input.d'
import { CheckCircleIcon, ClipboardDocumentIcon } from '@heroicons/react/24/outline'

const defaultClassName =
	'w-full break-all rounded-md text-lg text-zinc-900 dark:text-zinc-50 bg-transparent focus:outline-none'

const errorClassName =
	defaultClassName.replace('text-zinc-900', 'text-red-600') +
	' border-solid border-2 border-red-500'

const validatedClassName =
	defaultClassName.replace('text-zinc-900', 'text-green-600') +
	' border-solid border-2 border-green-500'

export function Input(props: IInputProps) {
	const {
		type = 'text',
		placeholder,
		value = '',
		label = null,
		name = type,
		error = false,
		validated = false,
		disabled = false,
		required = false,
		copyable = false,
		onClick,
		onChange
	} = props

	const [focused, setFocused] = useState<boolean>(false)
	const { copied, copy } = useClipboard()

	const getClassName = () => {
		if (error) return errorClassName
		if (validated) return validatedClassName
		if (copyable && disabled) return defaultClassName.concat(' pt-2 pr-12 text-ellipsis')
		return defaultClassName
	}

	const inputClassName = getClassName()
	const onCopy = async () => await copy(value)

	return (
		<div
			className={`Input w-full flex flex-col items-stretch justify-between mb-5 rounded-md ${
				label === null && focused ? 'border-solid border-2 border-green-700' : null
			}`}
		>
			{label ? (
				<label
					htmlFor={name}
					className='w-full mb-3 font-bold text-left text-lg text-zinc-900 dark:text-zinc-50'
				>
					{label}
				</label>
			) : null}

			<div
				className={`min-h-[96px] w-full relative flex flex-col items-center justify-center p-4 bg-zinc-200 dark:bg-zinc-800 rounded-md ${
					label !== null && focused ? 'border-solid border-2 border-green-700' : null
				}`}
			>
				{label === null ? (
					<p
						className={`w-fit absolute left-4 top-4 text-md text-zinc-400 ${
							value.length ? 'visible' : 'invisible'
						}`}
					>
						{placeholder}
					</p>
				) : null}

				<input
					type={type}
					value={value}
					name={name}
					placeholder={placeholder}
					className={inputClassName}
					disabled={disabled}
					required={required}
					onClick={onClick}
					onChange={onChange}
					onFocus={() => setFocused(true)}
					onBlur={() => setFocused(false)}
				/>

				{copyable ? (
					copied ? (
						<CheckCircleIcon
							onClick={onCopy}
							className='absolute right-4 h-7 w-7 mt-2 pt-0.5 text-green-700 cursor-pointer'
						/>
					) : (
						<ClipboardDocumentIcon
							onClick={onCopy}
							className='absolute right-4 h-7 w-7 mt-2 pt-0.5 text-zinc-500 dark:text-zinc-400 cursor-pointer'
						/>
					)
				) : null}
			</div>
		</div>
	)
}
