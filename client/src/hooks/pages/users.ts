import { useState } from 'react'
import { IPagination } from '@lib/utils/interfaces/common'
import { IUserInfo } from '@lib/utils/interfaces/user'
import { useFetchUsers } from '../store/users.api'

export function useUsersContextValue() {
    const tableDataState = useState<IUserInfo[]>([])
    const paginationState = useState<IPagination>({
        current: 1,
        pageSize: 10
    })
    const isTableLoadingState = useState<boolean>(false)
    const searchValueState = useState<string>()
    const statusFilterState = useState<any>()

    useFetchUsers(paginationState[0], (data) => {
        tableDataState[1](data.result)

        if (data.meta?.pagination) {
            paginationState[1]({
                pageSize: data.meta.pagination.results,
                current: data.meta.pagination.page,
                total: data.meta.pagination.total
            })
        }
    })

    return {
        tableDataState,
        paginationState,
        isTableLoadingState,
        searchValueState,
        statusFilterState
    }
}
