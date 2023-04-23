import { MainLayout } from '../../../components/Layout'
import { lazyImport } from '../../../utils/imports'

const CreatePassword = lazyImport('../features/passwords', 'CreatePassword')

export function CreatePasswordRoute() {
	return (
		<MainLayout title='Create password'>
			<CreatePassword />
		</MainLayout>
	)
}
