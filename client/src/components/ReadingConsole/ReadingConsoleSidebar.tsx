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

const iconColors = [
    '#FF6B6B',
    '#4ECDC4',
    '#45B7D1',
    '#FED766',
    '#247BA0',
    '#F2E205',
    '#F2B2A0',
    '#F28C0F',
    '#C1E0F2',
    '#A2D9A2',
    '#F2A0C1',
    '#D9A2F2',
    '#F2D0A2'
]

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
                            {
                                key: '1',
                                icon: <DashboardOutlined style={{ color: iconColors[0] }} />,
                                label: 'Dashboard'
                            },
                            {
                                key: '2',
                                icon: <BarChartOutlined style={{ color: iconColors[1] }} />,
                                label: 'Analytics'
                            }
                        ]
                    },
                    {
                        key: 'g2',
                        label: 'Reading Lists',
                        type: 'group',
                        children: [
                            {
                                key: '3',
                                icon: <ReadOutlined style={{ color: iconColors[2] }} />,
                                label: 'Currently Reading'
                            },
                            {
                                key: '4',
                                icon: <CheckCircleOutlined style={{ color: iconColors[3] }} />,
                                label: 'Completed Books'
                            },
                            { key: '5', icon: <BookOutlined style={{ color: iconColors[4] }} />, label: 'Reading Plan' }
                        ]
                    },
                    {
                        key: 'g3',
                        label: 'Organization',
                        type: 'group',
                        children: [
                            { key: '6', icon: <UserOutlined style={{ color: iconColors[5] }} />, label: 'By Authors' },
                            { key: '7', icon: <TagsOutlined style={{ color: iconColors[6] }} />, label: 'By Genres' },
                            {
                                key: '8',
                                icon: <StarOutlined style={{ color: iconColors[7] }} />,
                                label: 'Recommendations'
                            },
                            {
                                key: '9',
                                icon: <ArrowUpOutlined style={{ color: iconColors[8] }} />,
                                label: 'High Priority'
                            },
                            {
                                key: '10',
                                icon: <ArrowDownOutlined style={{ color: iconColors[9] }} />,
                                label: 'Low Priority'
                            }
                        ]
                    },
                    {
                        key: 'g4',
                        label: 'Tools',
                        type: 'group',
                        children: [
                            {
                                key: '11',
                                icon: <ShoppingCartOutlined style={{ color: iconColors[10] }} />,
                                label: 'Want to Buy'
                            },
                            {
                                key: '12',
                                icon: <BulbOutlined style={{ color: iconColors[11] }} />,
                                label: 'Vocabulary'
                            },
                            {
                                key: '13',
                                icon: <SettingOutlined style={{ color: iconColors[12] }} />,
                                label: 'Settings'
                            }
                        ]
                    }
                ]}
            />
        </Sider>
    )
}
