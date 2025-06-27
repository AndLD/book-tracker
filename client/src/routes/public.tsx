import { RouteObject } from 'react-router-dom'
import Auth from '../pages/Auth'
import Verification from '../pages/Verification'
import commonRoutes from './common'

const publicRoutes: RouteObject[] = [
    {
        path: '/auth',
        element: <Auth />
    },
    { path: '/verification', element: <Verification /> },
    ...commonRoutes
]

export default publicRoutes
