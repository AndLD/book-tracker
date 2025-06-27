import { MailOutlined } from '@ant-design/icons'
import LogoutBtn from '../components/LogoutBtn'

export default function Forbidden() {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                flexDirection: 'column',
                gap: 30,
                textAlign: 'center',
                margin: '0 20px'
            }}
        >
            <MailOutlined style={{ fontSize: 80 }} />
            <div style={{ fontSize: 30 }}>Check your email. We have sent verification letter</div>

            <div>
                <div style={{ maxWidth: 500 }}>
                    If you already clicked verification link from the letter and still see this screen, press "Logout"
                    button and login again.
                </div>
                <LogoutBtn />
            </div>
        </div>
    )
}
