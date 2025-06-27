import { Tooltip, Typography } from 'antd'
import { isMobile } from 'react-device-detect'

const { Title } = Typography

interface IDashboardColProps {
    title: string
    value: string | number
    icon: JSX.Element
}

export default function DashboardCol({ title, value, icon }: IDashboardColProps) {
    return (
        <div style={{ flex: 1, minWidth: '50px' }}>
            <Tooltip title={title}>
                <Title level={isMobile ? 4 : 2}>
                    <div>{value}</div>
                    <div style={{ fontSize: isMobile ? 30 : 60, paddingTop: 10 }}>{icon}</div>
                </Title>
            </Tooltip>
        </div>
    )
}
