import { RouteObject } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import AdminLayout from '../components/AdminLayout/AdminLayout'
import Users from '../pages/Users'
import commonRoutes from './common'
import Authorized from '../pages/Authorized'

const privateRoutes: RouteObject[] = [
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                path: '/admin',
                element: <Dashboard />
            },
            {
                path: '/admin/users',
                element: <Users />
            }
        ]
    },
    {
        path: '/authorized',
        element: <Authorized />
    },
    ...commonRoutes
]

export default privateRoutes
