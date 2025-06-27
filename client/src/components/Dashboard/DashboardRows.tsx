import { useContext } from 'react'
import {
    ClockCircleOutlined,
    CoffeeOutlined,
    DollarOutlined,
    FolderOutlined,
    LoadingOutlined,
    SafetyCertificateOutlined,
    StopOutlined,
    UserOutlined
} from '@ant-design/icons'
import moment from 'moment'
import DashboardCol from './DashboardCol'
import DashboardRow from './DashboardRow'
import { dashboardContext } from '../../context'

export default function DashboardRows() {
    const [statistics] = useContext(dashboardContext).statisticsState

    return statistics ? (
        <>
            <DashboardRow>
                <DashboardCol
                    title="Users"
                    value={statistics.usersByStatus.user}
                    icon={<UserOutlined style={{ color: 'blue' }} />}
                />
                <DashboardCol
                    title="Unlimited"
                    value={statistics.usersByStatus.unlimited}
                    icon={<CoffeeOutlined style={{ color: 'brown' }} />}
                />
                <DashboardCol
                    title="Admins"
                    value={statistics.usersByStatus.admin}
                    icon={<SafetyCertificateOutlined style={{ color: 'green' }} />}
                />
                <DashboardCol
                    title="Owners"
                    value={statistics.usersByStatus.owner}
                    icon={<DollarOutlined style={{ color: 'gold' }} />}
                />
                <DashboardCol
                    title="Banned"
                    value={statistics.usersByStatus.banned}
                    icon={<StopOutlined style={{ color: 'red' }} />}
                />
            </DashboardRow>
            <DashboardRow>
                {/* TODO: Replace with actual statistics values */}
                {/* <DashboardCol title="Clusters" value={statistics.clustersTotal} icon={<ClusterOutlined />} />
                <DashboardCol title="Nodes" value={statistics.nodesTotal} icon={<ApartmentOutlined />} />
                <DashboardCol title="Connections" value={statistics.connectionsTotal} icon={<ShareAltOutlined />} />
                <DashboardCol title="Sources" value={statistics.sourcesTotal} icon={<LinkOutlined />} /> */}
                <DashboardCol
                    title="Files Size"
                    value={`${statistics.filesSizeTotal} ${'MB'}`}
                    icon={<FolderOutlined />}
                />
            </DashboardRow>
            <DashboardRow>
                <DashboardCol
                    title="Server started at"
                    value={moment(statistics.startTimestamp).format('DD.MM.YYYY HH:mm:ss')}
                    icon={<ClockCircleOutlined />}
                />
            </DashboardRow>
        </>
    ) : (
        <div style={{ textAlign: 'center' }}>
            <LoadingOutlined style={{ fontSize: 30 }} />
        </div>
    )
}
