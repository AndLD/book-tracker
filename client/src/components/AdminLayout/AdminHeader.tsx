import { Layout } from 'antd'
import UserDropdown from './AdminHeader/UserDropdown'
import AdminMenuTrigger from './AdminHeader/AdminMenuTrigger'
import { isMobile } from 'react-device-detect'

const { Header } = Layout

export default function AdminHeader() {
    return (
        <Header className="site-layout-background">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                {!isMobile && <AdminMenuTrigger />}
                <UserDropdown />
            </div>
        </Header>
    )
}
