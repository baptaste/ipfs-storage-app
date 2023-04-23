import { MainLayout } from '../../../components/Layout'
import { lazyImport } from '../../../utils/imports'

const ChangePassword = lazyImport('../features/settings', 'ChangePassword')

export function ChangePasswordRoute() {
	return (
		<MainLayout title='Account Password'>
			<ChangePassword />
		</MainLayout>
	)
}
