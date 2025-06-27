import { createContext } from 'react'
import useLayoutContext from './hooks/pages/layout'
import useAuthorizedContextValue from './hooks/pages/authorized'
import { useUsersContextValue } from './hooks/pages/users'
import { useDashboardContextValue } from './hooks/pages/dashboard'

export const authorizedContext = createContext({} as ReturnType<typeof useAuthorizedContextValue>)
export const layoutContext = createContext<any>({} as ReturnType<typeof useLayoutContext>)
export const usersContext = createContext({} as ReturnType<typeof useUsersContextValue>)
export const dashboardContext = createContext({} as ReturnType<typeof useDashboardContextValue>)
