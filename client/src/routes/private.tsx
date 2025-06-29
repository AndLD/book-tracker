import { RouteObject } from 'react-router-dom'
import AdminDashboard from '../pages/Dashboard'
import AdminLayout from '../components/AdminLayout/AdminLayout'
import Users from '../pages/Users'
import commonRoutes from './common'
import ReadingConsole from '../pages/ReadingConsole'

import AnalyticsPage from '../pages/ReadingConsole/AnalyticsPage'
import CurrentlyReadingPage from '../pages/ReadingConsole/CurrentlyReadingPage'
import CompletedBooksPage from '../pages/ReadingConsole/CompletedBooksPage'
import ReadingPlanPage from '../pages/ReadingConsole/ReadingPlanPage'
import ByAuthorsPage from '../pages/ReadingConsole/ByAuthorsPage'
import ByGenresPage from '../pages/ReadingConsole/ByGenresPage'
import RecommendationsPage from '../pages/ReadingConsole/RecommendationsPage'
import HighPriorityPage from '../pages/ReadingConsole/HighPriorityPage'
import LowPriorityPage from '../pages/ReadingConsole/LowPriorityPage'
import WantToBuyPage from '../pages/ReadingConsole/WantToBuyPage'
import VocabularyPage from '../pages/ReadingConsole/VocabularyPage'
import SettingsPage from '../pages/ReadingConsole/SettingsPage'
import DashboardPage from '../pages/ReadingConsole/DashboardPage'

const privateRoutes: RouteObject[] = [
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: '/admin',
                element: <AdminDashboard />
            },
            {
                path: '/admin/users',
                element: <Users />
            }
        ]
    },
    {
        path: '/reading-console',
        element: <ReadingConsole />,
        children: [
            {
                path: 'dashboard',
                element: <DashboardPage />
            },
            {
                path: 'analytics',
                element: <AnalyticsPage />
            },
            {
                path: 'currently-reading',
                element: <CurrentlyReadingPage />
            },
            {
                path: 'completed-books',
                element: <CompletedBooksPage />
            },
            {
                path: 'reading-plan',
                element: <ReadingPlanPage />
            },
            {
                path: 'by-authors',
                element: <ByAuthorsPage />
            },
            {
                path: 'by-genres',
                element: <ByGenresPage />
            },
            {
                path: 'recommendations',
                element: <RecommendationsPage />
            },
            {
                path: 'high-priority',
                element: <HighPriorityPage />
            },
            {
                path: 'low-priority',
                element: <LowPriorityPage />
            },
            {
                path: 'want-to-buy',
                element: <WantToBuyPage />
            },
            {
                path: 'vocabulary',
                element: <VocabularyPage />
            },
            {
                path: 'settings',
                element: <SettingsPage />
            }
        ]
    },
    ...commonRoutes
]

export default privateRoutes
