import { Navigate, RouteObject, useRoutes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import privateRoutes from '../routes/private.tsx'
import publicRoutes from '../routes/public.tsx'
// import Forbidden from '../pages/Forbidden'
import { parseUser } from '../utils/jwt.ts'
import { useToken } from '../hooks/auth.ts'
import { layoutContext } from '../context.ts'
import useLayoutContext from '../hooks/pages/layout.ts'
import { inactiveRoutes } from '../routes/inactive.tsx'
import { isMobile } from 'react-device-detect'
import { readingConsoleContext } from '../context.ts'
import useReadingConsoleContextValue from '../hooks/pages/readingConsole.ts'
import { IUserState } from '@lib/utils/interfaces/user.ts'

export default function AppRoutes() {
    const token = useToken()

    const [routes, setRoutes] = useState<RouteObject[]>([])
    const [redirectRoute, setRedirectRoute] = useState<string | null>(null)

    useEffect(() => {
        const user: IUserState | null = parseUser(token)

        if (user) {
            if (!user.active) {
                setRoutes(inactiveRoutes)
                setRedirectRoute('/forbidden')
            } else if (user.status === 'owner' || user.status === 'admin') {
                setRoutes(privateRoutes)
                setRedirectRoute(isMobile ? '/reading-console' : '/admin')
            } else if (user.status === 'user' || user.status === 'unlimited') {
                setRoutes(privateRoutes)

                setRedirectRoute('/reading-console')
            } else {
                // setRoutes([{ path: '/forbidden', element: <Forbidden /> }])
                // setRedirectRoute('/forbidden')
            }
        } else {
            setRoutes(publicRoutes)
            setRedirectRoute('/auth')
        }
    }, [token])

    const routing = useRoutes(
        redirectRoute
            ? [
                  ...routes,
                  {
                      path: '*',
                      element: <Navigate replace to={redirectRoute} />
                  }
              ]
            : routes
    )

    return (
        <readingConsoleContext.Provider value={useReadingConsoleContextValue()}>
            <layoutContext.Provider value={useLayoutContext()}>{routing}</layoutContext.Provider>
        </readingConsoleContext.Provider>
    )
}
