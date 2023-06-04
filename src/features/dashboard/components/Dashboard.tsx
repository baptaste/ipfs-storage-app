import * as React from 'react';
import { Link, useNavigate } from 'react-router-dom';
// import { lazyImport } from '../../../utils/imports'
import { AppLink, Button, DefaultIcon, PasswordIcon } from '../../../components/Common';

// import { decryptKey, generateEncryptionKey } from '../../../lib/encryptionKey';
// import { createUserEncryptionKeys } from '../../../lib/grafikart-testEncryption';
import { updateView } from '../../../utils/viewTransition';
import { useAuth } from '../../auth';
import {
	decryptWithEncryptionKey,
	encryptWithEncryptionKey,
	generateEncryptionKey,
	getEncryptionKey,
} from '../../../lib/crypto';
// import { updateView } from '../../../utils/browser';

// const PasswordList = lazyImport('../features/passwords', 'PasswordList')

export function Dashboard() {
	const { user } = useAuth();
	const navigate = useNavigate();

	return (
		<>
			{/* {decryptedData ? (
				<h1 className='text-xl text-red-500 text-bold'>{decryptedData}</h1>
			) : null} */}

			{/* <Button
				title='Create encryption key'
				theme='secondary'
				onClick={createUserEncryptionKey}
			/> */}
			{/* <Button
				title='Retrieve encryption key'
				theme='primary'
				onClick={retrieveUserEncryptionKey}
			/> */}

			{/* <Button title='Encrypt data' theme='secondary' onClick={encryptText} />
			{encryptedData ? (
				<Button title='Decrypt data' theme='primary' onClick={decrypttText} />
			) : null} */}

			<section id='passwords' className='w-full mb-3 rounded-xl py-4'>
				<button
					onClick={() => updateView('new', () => navigate('/dashboard/passwords'))}
					className='text-zinc-50'
				>
					<div className='w-full flex items-center justify-between'>
						<div className='flex items-center justify-between'>
							<PasswordIcon />
							<p className='text-md font-bold ml-5 text-zinc-900'>Passwords</p>
						</div>
					</div>
				</button>
				{/* <PasswordList /> */}
			</section>

			<section id='passwords' className='w-full mb-3 rounded-xl py-4'>
				<div className='text-zinc-50'>
					<div className='w-full flex items-center justify-between'>
						<div className='flex items-center justify-between'>
							<DefaultIcon />
							<p className='text-md font-bold ml-5 text-zinc-900'>Feature B</p>
						</div>
					</div>
				</div>
			</section>

			<section id='passwords' className='w-full mb-3 rounded-xl py-4'>
				<div className='text-zinc-50'>
					<div className='w-full flex items-center justify-between'>
						<div className='flex items-center justify-between'>
							<DefaultIcon />
							<p className='text-md font-bold ml-5 text-zinc-900'>Feature C</p>
						</div>
					</div>
				</div>
			</section>

			<section id='passwords' className='w-full mb-3 rounded-xl py-4'>
				<div className='text-zinc-50'>
					<div className='w-full flex items-center justify-between'>
						<div className='flex items-center justify-between'>
							<DefaultIcon />
							<p className='text-md font-bold ml-5 text-zinc-900'>Feature D</p>
						</div>
					</div>
				</div>
			</section>

			<section id='passwords' className='w-full mb-3 rounded-xl py-4'>
				<div className='text-zinc-50'>
					<div className='w-full flex items-center justify-between'>
						<div className='flex items-center justify-between'>
							<DefaultIcon />
							<p className='text-md font-bold ml-5 text-zinc-900'>Feature E</p>
						</div>
					</div>
				</div>
			</section>
		</>
	);
}
