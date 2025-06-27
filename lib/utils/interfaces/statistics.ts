import { UserStatus } from './user'

export interface IStatistics {
    startTimestamp: number
    usersByStatus: { [key in UserStatus]: number }
    filesSizeTotal: number
}

export interface IFetchStatisticsResponse {
    result: IStatistics
}
