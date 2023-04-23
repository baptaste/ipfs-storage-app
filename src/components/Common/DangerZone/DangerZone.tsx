import { Button } from '../Button'

type DangerZoneProps = {
	title: string
	subtitle?: string
	text: string
	confirmation?: string
	loading: boolean
	onConfirm: () => void
}

export function DangerZone(props: DangerZoneProps) {
	const { title, subtitle = '', text, confirmation = title, loading, onConfirm } = props

	return (
		<section className='DangerZone w-full flex flex-col mb-5'>
			<h1 className='font-bold text-xl mb-3 text-red-500'>Danger Zone</h1>
			<h2 className='font-bold text-xl mb-3 text-zinc-900 dark:text-zinc-50'>{title}</h2>
			<div className='w-full flex flex-col justify-center pt-5 pb-2 px-5 my-5 border-solid border-2 border-red-700/70 dark:border-red-900/50 rounded-xl'>
				{subtitle ? (
					<p className='text-zinc-900 dark:text-zinc-50 pb-2'>{subtitle}</p>
				) : null}
				<p className='text-zinc-900 dark:text-zinc-50 pb-2'>{text}</p>
				<Button
					title={confirmation}
					onClick={onConfirm}
					isLoading={loading}
					theme='danger'
					widthFull
				/>
			</div>
		</section>
	)
}
