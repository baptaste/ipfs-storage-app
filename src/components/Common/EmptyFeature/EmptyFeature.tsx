import { Link } from 'react-router-dom'

import SleepingKoalaImg from '../../../assets/img/sleeping-koala.jpg'
import { CustomLink } from '../CustomLink'

interface IEmptyFeatureProps {
	name: string
	redirectTo: string
}

export function EmptyFeature({ name, redirectTo }: IEmptyFeatureProps) {
	return (
		<div className='EmptyScreen w-full lg:w-1/3 h-full flex flex-col items-center justify-between pb-4'>
			<h1 className='text-xl font-bold mb-5'>Wow, it's empty here</h1>
			<img
				loading='lazy'
				src={SleepingKoalaImg}
				width={250}
				height={250}
				className='rounded-full'
			/>
			<p className='font-bold text-md'>Start storing {name} now</p>
			<CustomLink path={`/dashboard${redirectTo}`} text='Get started' theme='secondary' />
		</div>
	)
}
