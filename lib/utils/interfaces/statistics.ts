import { UserStatus } from './user'

export interface IStatistics {
    startTimestamp: number
    usersByStatus: { [key in UserStatus]: number }
    clustersTotal: number
    nodesTotal: number
    connectionsTotal: number
    sourcesTotal: number
    filesSizeTotal: number
}

export interface IFetchStatisticsResponse {
    result: IStatistics
}
