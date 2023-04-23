import { MainLayout } from '../../../components/Layout'
import { lazyImport } from '../../../utils/imports'

const Dashboard = lazyImport('../features/dashboard', 'Dashboard')

export function DashboardRoute() {
	return (
		<MainLayout title='Dashboard'>
			<Dashboard />
		</MainLayout>
	)
}
