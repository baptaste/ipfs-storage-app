import { MainLayout } from '../../../components/Layout'
import { lazyImport } from '../../../utils/imports'

const Settings = lazyImport('../features/settings', 'Settings')

export function SettingsRoute() {
	return (
		<MainLayout title='Settings'>
			<Settings />
		</MainLayout>
	)
}
