import { Layout, Typography } from 'antd'
import logo from '/favicon.svg'
import '../../styles/AdminLayout.scss'
import AdminHeader from './AdminHeader'
import AdminMenu from './AdminMenu'
import { useAppSelector } from '../../hooks/store'
import { Link, Outlet } from 'react-router-dom'
import { useContext, useEffect } from 'react'
import { layoutContext } from '../../context'
import { VERSION } from '../../utils/constants'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { isMobile } from 'react-device-detect'
import { Utils } from '../../utils/utils'
import { appName } from '../../utils/constants'

const { Sider, Content } = Layout

function AdminLayout() {
    const isMenuCollapsed = useAppSelector((state) => state.adminReducer.isMenuCollapsed)

    const {
        titleState: [title],
        backPathState: [backPath, setBackPath]
    } = useContext(layoutContext)

    useEffect(() => {
        if (backPath) {
            setBackPath(null)
        }
    }, [window.location.pathname])

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider trigger={null} collapsed={isMenuCollapsed}>
                <Link to={Utils.ssrLink('/product')}>
                    <div className="logo">
                        <img style={{ width: 40 }} src={logo} alt="Admin Page Logo" />
                        <div
                            style={{
                                opacity: isMenuCollapsed ? 0 : 1,
                                transition: 'opacity ease 0.5s'
                            }}
                        >
                            {isMenuCollapsed ? null : appName}
                        </div>
                    </div>
                </Link>
                <AdminMenu />
                <div
                    style={{
                        position: 'absolute',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bottom: 10,
                        color: 'white'
                    }}
                >
                    {VERSION}
                </div>
            </Sider>
            <Layout className="site-layout">
                <AdminHeader />
                <Content
                    className="site-layout-background"
                    style={{
                        margin: isMobile ? 'none' : '24px 16px',
                        padding: 24,
                        minHeight: 280
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row'
                        }}
                    >
                        {backPath && (
                            <Link to={backPath}>
                                <ArrowLeftOutlined
                                    style={{
                                        color: 'black',
                                        fontSize: 40,
                                        marginTop: 4,
                                        marginRight: 10
                                    }}
                                />
                            </Link>
                        )}
                        <Typography.Title level={1}>{title}</Typography.Title>
                    </div>

                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}

export default AdminLayout
