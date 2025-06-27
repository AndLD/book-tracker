import { createContext } from 'react'
import { useClusterContextValue } from './hooks/pages/cluster'
import useLayoutContext from './hooks/pages/layout'
import useClustersContextValue from './hooks/pages/authorized'
import { useUsersContextValue } from './hooks/pages/users'
import { useDashboardContextValue } from './hooks/pages/dashboard'
import { useDemoClustersContextValue } from './hooks/pages/demoClusters'

export const clusterContext = createContext({} as ReturnType<typeof useClusterContextValue>)
export const clustersContext = createContext({} as ReturnType<typeof useClustersContextValue>)

export const layoutContext = createContext<any>({} as ReturnType<typeof useLayoutContext>)
export const usersContext = createContext({} as ReturnType<typeof useUsersContextValue>)
export const dashboardContext = createContext({} as ReturnType<typeof useDashboardContextValue>)
export const demoClustersContext = createContext({} as ReturnType<typeof useDemoClustersContextValue>)
