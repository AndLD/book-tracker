import React, { useState, useEffect } from 'react'
import { Layout } from 'antd'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import ReadingConsoleSidebar from '../components/ReadingConsole/ReadingConsoleSidebar'
import './../styles/ReadingConsole.scss'

const { Content } = Layout

export default function ReadingConsolePage() {
    const navigate = useNavigate()
    const location = useLocation()
    const [selectedKey, setSelectedKey] = useState('1')
    const [collapsed, setCollapsed] = useState(false)

    useEffect(() => {
        if (location.pathname === '/reading-console') {
            navigate('/reading-console/dashboard')
        }

        const path = location.pathname.split('/').pop()
        switch (path) {
            case 'dashboard':
                setSelectedKey('1')
                break
            case 'analytics':
                setSelectedKey('2')
                break
            case 'currently-reading':
                setSelectedKey('3')
                break
            case 'completed-books':
                setSelectedKey('4')
                break
            case 'reading-plan':
                setSelectedKey('5')
                break
            case 'by-authors':
                setSelectedKey('6')
                break
            case 'by-genres':
                setSelectedKey('7')
                break
            case 'recommendations':
                setSelectedKey('8')
                break
            case 'high-priority':
                setSelectedKey('9')
                break
            case 'low-priority':
                setSelectedKey('10')
                break
            case 'want-to-buy':
                setSelectedKey('11')
                break
            case 'vocabulary':
                setSelectedKey('12')
                break
            case 'settings':
                setSelectedKey('13')
                break
            default:
                setSelectedKey('1')
                break
        }
    }, [location.pathname, navigate])

    const handleMenuClick = (key: string) => {
        setSelectedKey(key)
    }

    return (
        <Layout style={{ minHeight: '100vh' }} className="reading-console-page">
            <ReadingConsoleSidebar
                collapsed={collapsed}
                onCollapse={setCollapsed}
                selectedKey={selectedKey}
                onMenuClick={handleMenuClick}
            />
            <Layout style={{ padding: '0 24px 24px' }}>
                <Content
                    style={{
                        background: '#fff',
                        padding: 24,
                        margin: 0,
                        minHeight: 280
                    }}
                >
                    <Outlet />
                </Content>
            </Layout>
        </Layout>
    )
}
