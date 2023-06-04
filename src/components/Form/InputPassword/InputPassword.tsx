import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { useState } from 'react'
import type { IInputPasswordProps } from './InputPassword.d'

const defaultClassName =
	'w-full pr-12 break-all rounded-md text-lg text-zinc-900 bg-transparent focus:outline-none'

const errorClassName =
	defaultClassName.replace('text-zinc-900', 'text-red-600') +
	' border-solid border-2 border-red-500'

const validatedClassName =
	defaultClassName.replace('text-zinc-900', 'text-green-600') +
	' border-solid border-2 border-green-500'

export function InputPassword(props: IInputPasswordProps) {
	const {
		type = 'password',
		placeholder,
		value = '',
		label = null,
		name = type,
		error = false,
		validated = false,
		disabled = false,
		required = false,
		onClick,
		onChange
	} = props

	const [focused, setFocused] = useState<boolean>(false)

	const getClassName = () => {
		if (error) return errorClassName
		if (validated) return validatedClassName
		return defaultClassName
	}

	const inputClassName = getClassName()

	const [visible, setVisible] = useState<boolean>(false)

	return (
		<div
			className={`InputPassword w-full flex flex-col items-stretch justify-between mb-5 rounded-md ${
				label === null && focused ? 'border-solid border-2 border-green-700' : ''
			}`.trim()}
		>
			{label ? (
				<label
					htmlFor={name}
					className='w-full mb-3 font-bold text-left text-lg text-zinc-900'
				>
					{label}
				</label>
			) : null}

			<div
				className={`min-h-[96px] w-full relative flex flex-col items-center justify-center p-4 bg-zinc-200 rounded-md ${
					label !== null && focused ? 'border-solid border-2 border-green-700' : ''
				}`.trim()}
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
					type={visible ? 'text' : 'password'}
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

				{visible ? (
					<EyeSlashIcon
						className='h-7 w-7 text-zinc-500 cursor-pointer absolute right-4'
						onClick={() => setVisible(false)}
					/>
				) : (
					<EyeIcon
						className='h-7 w-7 text-zinc-500 cursor-pointer absolute right-4'
						onClick={() => setVisible(true)}
					/>
				)}
			</div>
		</div>
	)
}
