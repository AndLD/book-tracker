import BackgroundGradient from '@/components/BgGradient'
import Header from '@/components/Header'
import MainImages from '@/components/MainImages'
import Wrapper from '@/components/Wrapper'
import { csrLink } from '@/utils/utils'
import { Button } from 'antd'
import Link from 'next/link'

export default function Product() {
    return (
        <Wrapper style={{ marginBottom: 100 }}>
            <BackgroundGradient />
            <Header />
            <div className="main-phrase-wrapper">
                <div className="main-phrase">
                    <div>Speed Up</div>
                    <div>Your MVP</div>
                </div>
                <div className="main-sub-phrase">Built for any use case</div>
                <div className="main-cta-wrapper">
                    <Link href={csrLink('/authorized')}>
                        <Button
                            type="primary"
                            className="main-cta"
                            style={{ fontSize: 26, height: 72, fontWeight: 'bold', borderRadius: 10 }}
                        >
                            Go to Protected Page
                        </Button>
                    </Link>
                    <div style={{ fontSize: 18 }}>No credit card required</div>
                </div>
            </div>

            <MainImages />
        </Wrapper>
    )
}
