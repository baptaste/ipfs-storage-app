import { Link } from 'react-router-dom'
// import { lazyImport } from '../../../utils/imports'
import { DefaultIcon, PasswordIcon } from '../../../components/Common'

// const PasswordList = lazyImport('../features/passwords', 'PasswordList')

export function Dashboard() {
	return (
		<>
			<section id='passwords' className='w-full mb-3 rounded-xl py-4'>
				<Link to='/dashboard/passwords' className='text-zinc-50 dark:text-zinc-900'>
					<div className='w-full flex items-center justify-between'>
						<div className='flex items-center justify-between'>
							<PasswordIcon />
							<p className='text-md font-bold ml-5 text-zinc-900 dark:text-zinc-50'>
								Passwords
							</p>
						</div>
					</div>
				</Link>
				{/* <PasswordList /> */}
			</section>

			<section id='passwords' className='w-full mb-3 rounded-xl py-4'>
				<div className='text-zinc-50 dark:text-zinc-900'>
					<div className='w-full flex items-center justify-between'>
						<div className='flex items-center justify-between'>
							<DefaultIcon />
							<p className='text-md font-bold ml-5 text-zinc-900 dark:text-zinc-50'>
								Feature B
							</p>
						</div>
					</div>
				</div>
			</section>

			<section id='passwords' className='w-full mb-3 rounded-xl py-4'>
				<div className='text-zinc-50 dark:text-zinc-900'>
					<div className='w-full flex items-center justify-between'>
						<div className='flex items-center justify-between'>
							<DefaultIcon />
							<p className='text-md font-bold ml-5 text-zinc-900 dark:text-zinc-50'>
								Feature C
							</p>
						</div>
					</div>
				</div>
			</section>

			<section id='passwords' className='w-full mb-3 rounded-xl py-4'>
				<div className='text-zinc-50 dark:text-zinc-900'>
					<div className='w-full flex items-center justify-between'>
						<div className='flex items-center justify-between'>
							<DefaultIcon />
							<p className='text-md font-bold ml-5 text-zinc-900 dark:text-zinc-50'>
								Feature D
							</p>
						</div>
					</div>
				</div>
			</section>

			<section id='passwords' className='w-full mb-3 rounded-xl py-4'>
				<div className='text-zinc-50 dark:text-zinc-900'>
					<div className='w-full flex items-center justify-between'>
						<div className='flex items-center justify-between'>
							<DefaultIcon />
							<p className='text-md font-bold ml-5 text-zinc-900 dark:text-zinc-50'>
								Feature E
							</p>
						</div>
					</div>
				</div>
			</section>
		</>
	)
}
