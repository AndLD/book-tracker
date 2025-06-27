import { isMobile } from 'react-device-detect'

interface IDashboardRowProps {
    children: JSX.Element[] | JSX.Element
}

export default function DashboardRow({ children }: IDashboardRowProps) {
    return (
        <div style={{ display: 'flex', textAlign: 'center', margin: isMobile ? '5px 0' : '15px 0', flexWrap: 'wrap' }}>
            {children}
        </div>
    )
}
