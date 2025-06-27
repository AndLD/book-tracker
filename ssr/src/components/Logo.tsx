import { appName } from '@lib/utils/constants'
import Image from 'next/image'
import Link from 'next/link'

export default function Logo() {
    return (
        <Link
            href="/product"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 7 }}
        >
            <Image src="/svg/logo.svg" width={40} height={37} alt="logo" />
            <span style={{ fontSize: 28, fontWeight: 'bold', lineHeight: 1.3 }}>{appName}</span>
        </Link>
    )
}
