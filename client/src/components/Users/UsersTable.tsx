import {
    CoffeeOutlined,
    DollarOutlined,
    SafetyCertificateOutlined,
    StopOutlined,
    UserOutlined
} from '@ant-design/icons'
import { Select, Table } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { usersContext } from '../../context'
import { useToken } from '../../hooks/auth'
import { usePutUser } from '../../hooks/store/users.api'
import { useFetchUsersQuery } from '../../store/users.api'
import { IUserInfo, UserStatus } from '@lib/utils/interfaces/user'
import { parseUser } from '../../utils/jwt'
import { ColumnsType } from 'antd/es/table'

function UsersTable() {
    const token = useToken()
    const {
        tableDataState: [tableData, setTableData],
        isTableLoadingState: [isTableLoading, setIsTableLoading],
        paginationState: [pagination, setPagination],
        searchValueState: [searchValue, setSearchValue],
        statusFilterState: [statusFilter, setStatusFilter]
    } = useContext(usersContext)
    const [order, setOrder] = useState<string | undefined>()
    const [isFetchUsersQuerySkip, setIsFetchUsersQuerySkip] = useState(true)

    const fetchUsersQuery = useFetchUsersQuery(
        {
            pagination,
            order,
            filters: statusFilter ? statusFilter && JSON.stringify({ status: { $in: statusFilter } }) : undefined
        },
        { skip: isFetchUsersQuerySkip }
    )

    const putUser = usePutUser()

    useEffect(() => {
        if (fetchUsersQuery.data) {
            setTableData(fetchUsersQuery.data.result)
        }
    }, [fetchUsersQuery.data])

    const iconFontSize = 20

    const iconsByStatuses: { [key in UserStatus]: JSX.Element } = {
        admin: (
            <SafetyCertificateOutlined
                style={{
                    color: 'green',
                    fontSize: iconFontSize
                }}
            />
        ),
        unlimited: (
            <CoffeeOutlined
                style={{
                    color: 'brown',
                    fontSize: iconFontSize
                }}
            />
        ),
        user: (
            <UserOutlined
                style={{
                    color: 'blue',
                    fontSize: iconFontSize
                }}
            />
        ),
        banned: (
            <StopOutlined
                style={{
                    color: 'red',
                    fontSize: iconFontSize
                }}
            />
        ),
        owner: (
            <DollarOutlined
                style={{
                    color: 'gold',
                    fontSize: iconFontSize
                }}
            />
        )
    }

    const filters = Object.keys(iconsByStatuses).map((status) => ({
        text: (
            <>
                {iconsByStatuses[status]}
                <span style={{ marginLeft: 5 }}>{status[0].toUpperCase() + status.slice(1)}</span>
            </>
        ),
        value: status
    }))

    function renderClustersNodesCounter(_: any, row: IUserInfo) {
        if (!row.clusters) {
            return '0 / 0'
        }

        const totalNodes = row.clusters.reduce((accum: any, current: any) => {
            return accum + current.totalNodes
        }, 0)

        return (
            <div style={{ fontSize: 20 }}>
                {row.clusters.length} / {totalNodes}
            </div>
        )
    }

    const columns: ColumnsType<IUserInfo> = [
        {
            title: '#',
            render: (_, __, index: number) => index + 1 + (pagination.current - 1) * pagination.pageSize,
            width: 70
        },
        {
            title: 'ID',
            dataIndex: '_id'
        },
        {
            title: 'Total C/N',
            render: renderClustersNodesCounter,
            align: 'center'
        },
        { title: 'Name', dataIndex: 'name' },
        {
            title: 'Email',
            dataIndex: 'email'
        },
        {
            title: 'Status',
            dataIndex: 'status',
            render: (status: UserStatus, row: IUserInfo) => {
                if (row._id === parseUser(token)?._id) {
                    const component = iconsByStatuses[status]

                    return (
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 5,
                                marginLeft: 12
                            }}
                        >
                            {component}
                            <span>{status[0].toUpperCase() + status.slice(1)}</span>
                        </div>
                    )
                }

                const selectOptions = Object.keys(iconsByStatuses).map((status) => (
                    <Select.Option value={status}>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 5
                            }}
                        >
                            {iconsByStatuses[status]}
                            <div style={{ marginTop: 3 }}>{status[0].toUpperCase() + status.slice(1)}</div>
                        </div>
                    </Select.Option>
                ))

                return (
                    <Select
                        defaultValue={status}
                        style={{
                            width: '100%',
                            height: 35
                        }}
                        onChange={(status) => putUser(row._id, status)}
                    >
                        {...selectOptions}
                    </Select>
                )
            },
            filters,
            filteredValue: statusFilter ? statusFilter.status : null
        },
        {
            title: 'Registered at',
            dataIndex: 'createdAt',
            render: (value: number) => value && new Date(value).toLocaleString(),
            sorter: (row1: any, row2: any) => row1.createdAt - row2.createdAt,
            sortDirections: ['descend']
        },
        {
            title: 'Updated at',
            dataIndex: 'updatedAt',
            render: (value: number) => value && new Date(value).toLocaleString(),
            sorter: (row1: any, row2: any) => row1.updatedAt - row2.updatedAt,
            sortDirections: ['ascend', 'descend']
        }
    ]

    return (
        <Table
            dataSource={tableData}
            columns={columns}
            rowKey={(record: IUserInfo) => record._id}
            pagination={pagination}
            loading={isTableLoading}
            size="middle"
            onChange={(pagination: any, filters: any, sorter: any) => {
                setStatusFilter(filters.status)
                const sorterOrder = sorter.order === 'ascend' ? 'asc' : sorter.order === 'descend' ? 'desc' : undefined
                setOrder(sorterOrder && `${sorter.field},${sorterOrder}`)
                setPagination(pagination)

                setSearchValue('')
                setIsFetchUsersQuerySkip(false)
            }}
        />
    )
}

export default UsersTable
