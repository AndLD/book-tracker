import { Menu } from 'antd'
import { DashboardOutlined, TeamOutlined, DeploymentUnitOutlined, HomeOutlined } from '@ant-design/icons'
import { Link, useLocation } from 'react-router-dom'
import { useAppSelector } from '../../hooks/store'
import { useState } from 'react'
import { parseUser } from '../../utils/jwt'
import { IUserState } from '@lib/utils/interfaces/user'

export default function AdminMenu() {
    const isMenuCollapsed = useAppSelector((state) => state.adminReducer.isMenuCollapsed)
    const token = useAppSelector((state) => state.appReducer.token)
    const [user] = useState<IUserState | null>(parseUser(token))

    const location = useLocation()

    const style = {
        fontSize: '25px',
        transform: isMenuCollapsed ? 'translateX(-25%)' : ''
    }

    return (
        <Menu style={{ fontSize: '15px' }} theme="dark" mode="inline" selectedKeys={[location.pathname || '/admin']}>
            {/*{user?.status === 'admin' && (*/}
            {/*    <Menu.Item key="/admin/settings" icon={<SettingOutlined style={style} />}>*/}
            {/*        <Link to={'/admin/settings'}>Налаштування</Link>*/}
            {/*    </Menu.Item>*/}
            {/*)}*/}

            {(user?.status === 'owner' || user?.status === 'admin') && (
                <>
                    <Menu.Item key="/admin" icon={<DashboardOutlined style={style} />}>
                        <Link to={'/admin'}>Dashboard</Link>
                    </Menu.Item>
                    <Menu.Item key="/admin/users" icon={<TeamOutlined style={style} />}>
                        <Link to={'/admin/users'}>Users</Link>
                    </Menu.Item>
                </>
            )}

            <Menu.Item key="/chat" icon={<HomeOutlined style={style} />}>
                <a href={'/authorized'}>Authorized</a>
            </Menu.Item>
        </Menu>
    )
}
