import { PencilSquareIcon } from '@heroicons/react/24/solid'

interface IEditIconProps {
	onClick?: () => void
}

export function EditIcon({ onClick = () => {} }: IEditIconProps) {
	return (
		<PencilSquareIcon className='w-7 h-7 text-zinc-500 dark:text-zinc-300' onClick={onClick} />
	)
}
