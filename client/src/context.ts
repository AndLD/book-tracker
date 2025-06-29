import useReadingConsoleContextValue from './hooks/pages/readingConsole'
import { createContext } from 'react'
import useLayoutContext from './hooks/pages/layout'
import { useUsersContextValue } from './hooks/pages/users'
import { useDashboardContextValue } from './hooks/pages/dashboard'

export const readingConsoleContext = createContext({} as ReturnType<typeof useReadingConsoleContextValue>)
export const layoutContext = createContext<any>({} as ReturnType<typeof useLayoutContext>)
export const usersContext = createContext({} as ReturnType<typeof useUsersContextValue>)
export const dashboardContext = createContext({} as ReturnType<typeof useDashboardContextValue>)
