import Title from 'antd/es/typography/Title'
import '../styles/Authorized.scss'
import LogoutBtn from '../components/LogoutBtn'

export default function AuthorizedPage() {
    return (
        <div className="auth-page">
            <div className="auth-card">
                <Title level={2} style={{ textAlign: 'center', userSelect: 'none' }}>
                    Happy hacking!
                </Title>
                <LogoutBtn />
            </div>
        </div>
    )
}
