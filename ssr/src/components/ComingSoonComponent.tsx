'use client'
import { SettingOutlined } from '@ant-design/icons'

export default function ComingSoonComponent() {
    return (
        <div style={{ marginTop: 200, textAlign: 'center' }}>
            <div style={{ fontSize: 40, marginBottom: 20 }}>Coming Soon!</div>
            <div style={{ marginBottom: 20 }}>
                <SettingOutlined style={{ fontSize: 60 }} />
            </div>
            <div style={{ fontSize: 20 }}>This feature is under development</div>
        </div>
    )
}
