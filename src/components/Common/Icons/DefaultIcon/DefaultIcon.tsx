import { NoSymbolIcon } from '@heroicons/react/24/outline'

interface IDefaultIconProps {
	onClick?: () => void
}

export function DefaultIcon({ onClick = () => {} }: IDefaultIconProps) {
	return (
		<div className='flex items-center justify-center p-2 rounded-lg bg-slate-600/[.3]'>
			<NoSymbolIcon className='w-6 h-6 text-zinc-50' onClick={onClick} />
		</div>
	)
}
