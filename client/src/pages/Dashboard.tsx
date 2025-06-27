import DashboardRows from '../components/Dashboard/DashboardRows'
import { useDashboardContextValue } from '../hooks/pages/dashboard'
import { useTitle } from '../hooks/pages/layout'
import { dashboardContext } from '../context'

export default function Dashboard() {
    useTitle('Dashboard')

    return (
        <dashboardContext.Provider value={useDashboardContextValue()}>
            <DashboardRows />
        </dashboardContext.Provider>
    )
}
