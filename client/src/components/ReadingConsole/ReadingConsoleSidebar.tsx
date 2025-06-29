import React from 'react'
import { Layout, Menu } from 'antd'
import {
    DashboardOutlined,
    BarChartOutlined,
    ReadOutlined,
    CheckCircleOutlined,
    BookOutlined,
    UserOutlined,
    TagsOutlined,
    StarOutlined,
    ArrowUpOutlined,
    ArrowDownOutlined,
    ShoppingCartOutlined,
    BulbOutlined,
    SettingOutlined
} from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const { Sider } = Layout

interface ReadingConsoleSidebarProps {
    collapsed: boolean
    onCollapse: (collapsed: boolean) => void
    selectedKey: string
    onMenuClick: (key: string) => void
}

export default function ReadingConsoleSidebar({
    collapsed,
    onCollapse,
    selectedKey,
    onMenuClick
}: ReadingConsoleSidebarProps) {
    const navigate = useNavigate()

    const handleMenuClick = (e: any) => {
        onMenuClick(e.key)
        let path = ''
        switch (e.key) {
            case '1':
                path = 'dashboard'
                break
            case '2':
                path = 'analytics'
                break
            case '3':
                path = 'currently-reading'
                break
            case '4':
                path = 'completed-books'
                break
            case '5':
                path = 'reading-plan'
                break
            case '6':
                path = 'by-authors'
                break
            case '7':
                path = 'by-genres'
                break
            case '8':
                path = 'recommendations'
                break
            case '9':
                path = 'high-priority'
                break
            case '10':
                path = 'low-priority'
                break
            case '11':
                path = 'want-to-buy'
                break
            case '12':
                path = 'vocabulary'
                break
            case '13':
                path = 'settings'
                break
            default:
                path = 'dashboard'
                break
        }
        navigate(`/reading-console/${path}`)
    }

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={onCollapse} width={250} theme="light">
            <div className="logo" />
            {!collapsed && <h3 style={{ textAlign: 'center', margin: '16px 0' }}>Reading Console</h3>}
            <Menu
                mode="inline"
                selectedKeys={[selectedKey]}
                style={{ height: '100%', borderRight: 0 }}
                onClick={handleMenuClick}
                items={[
                    {
                        key: 'g1',
                        label: 'Overview',
                        type: 'group',
                        children: [
                            { key: '1', icon: <DashboardOutlined />, label: 'Dashboard' },
                            { key: '2', icon: <BarChartOutlined />, label: 'Analytics' }
                        ]
                    },
                    {
                        key: 'g2',
                        label: 'Reading Lists',
                        type: 'group',
                        children: [
                            { key: '3', icon: <ReadOutlined />, label: 'Currently Reading' },
                            { key: '4', icon: <CheckCircleOutlined />, label: 'Completed Books' },
                            { key: '5', icon: <BookOutlined />, label: 'Reading Plan' }
                        ]
                    },
                    {
                        key: 'g3',
                        label: 'Organization',
                        type: 'group',
                        children: [
                            { key: '6', icon: <UserOutlined />, label: 'By Authors' },
                            { key: '7', icon: <TagsOutlined />, label: 'By Genres' },
                            { key: '8', icon: <StarOutlined />, label: 'Recommendations' },
                            { key: '9', icon: <ArrowUpOutlined />, label: 'High Priority' },
                            { key: '10', icon: <ArrowDownOutlined />, label: 'Low Priority' }
                        ]
                    },
                    {
                        key: 'g4',
                        label: 'Tools',
                        type: 'group',
                        children: [
                            { key: '11', icon: <ShoppingCartOutlined />, label: 'Want to Buy' },
                            { key: '12', icon: <BulbOutlined />, label: 'Vocabulary' },
                            { key: '13', icon: <SettingOutlined />, label: 'Settings' }
                        ]
                    }
                ]}
            />
        </Sider>
    )
}
