import Search from 'antd/lib/input/Search'
import { useContext, useEffect, useState } from 'react'
import { usersContext } from '../../context'
import { useFetchUsersQuery } from '../../store/users.api'

function UsersSearch() {
    const [pagination, setPagination] = useContext(usersContext).paginationState
    const [tableData, setTableData] = useContext(usersContext).tableDataState
    const [isTableLoading, setIsTableLoading] = useContext(usersContext).isTableLoadingState
    const [searchValue, setSearchValue] = useContext(usersContext).searchValueState
    const [statusFilter, setStatusFilter] = useContext(usersContext).statusFilterState
    const [delayedSearch, setDelayedSearch] = useState<NodeJS.Timeout>()

    const [isFetchUsersQuerySkip, setIsFetchUsersQuerySkip] = useState(true)
    const fetchUsersQuery = useFetchUsersQuery(
        {
            pagination,
            filters: searchValue
                ? JSON.stringify({
                      active: true,
                      keywords: {
                          $elemMatch: { $eq: searchValue.toLowerCase() }
                      }
                  })
                : JSON.stringify({
                      active: true
                  })
        },
        { skip: isFetchUsersQuerySkip }
    )

    useEffect(() => {
        if (fetchUsersQuery.data) {
            setTableData(fetchUsersQuery.data.result)
        }
    }, [fetchUsersQuery.data])

    return (
        <Search
            style={{ marginBottom: 20, maxWidth: 400 }}
            placeholder="Search by email"
            loading={isTableLoading}
            value={searchValue}
            onChange={(event) => {
                // TODO: Do not set status filter to 'null', instead of that create 'combineFilters' function to combine 'statusFilter' and 'searchValue' values
                setStatusFilter(null)

                const text = event.target.value
                setSearchValue(text)

                if (delayedSearch) {
                    clearTimeout(delayedSearch)
                }

                setDelayedSearch(
                    setTimeout(() => {
                        setIsFetchUsersQuerySkip(false)
                    }, 500)
                )
            }}
            enterButton
        />
    )
}

export default UsersSearch
