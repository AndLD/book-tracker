'use client'
import { csrLink } from '@/utils/utils'
import Logo from './Logo'
import Link, { LinkProps } from 'next/link'
import { isMobile } from 'react-device-detect'
import { CloseOutlined, MenuOutlined } from '@ant-design/icons'
import { useEffect, useState } from 'react'

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    if (!isMounted) {
        return (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontSize: 22,
                    height: 94,
                    position: 'relative'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 46 }}>
                    <Logo />
                </div>
            </div>
        )
    }

    const toggleMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen)
    }

    const MenuButton = (props: LinkProps & { title: string }) => (
        <Link style={{ fontSize: 20, padding: 0, cursor: 'pointer' }} {...props}>
            {props.title}
        </Link>
    )

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: 22,
                height: 94,
                position: 'relative'
            }}
        >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 46 }}>
                <Logo />
                {!isMobile && (
                    <>
                        <MenuButton title="Pricing" href="/coming-soon" />
                        <MenuButton title="Explore" href="/coming-soon" />
                    </>
                )}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 46 }}>
                {isMobile ? (
                    isMobileMenuOpen ? (
                        <CloseOutlined onClick={toggleMenu} style={{ fontSize: 24, cursor: 'pointer' }} />
                    ) : (
                        <MenuOutlined onClick={toggleMenu} style={{ fontSize: 24, cursor: 'pointer' }} />
                    )
                ) : (
                    <>
                        <MenuButton title="Login" href={csrLink('/auth')} />
                        <MenuButton title="Sign up" href={csrLink('/auth')} />
                    </>
                )}
            </div>

            {isMobile && isMobileMenuOpen && (
                <div
                    style={{
                        position: 'absolute',
                        top: 94,
                        left: 0,
                        right: 0,
                        backgroundColor: 'white',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 16,
                        padding: 16,
                        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        zIndex: 1000
                    }}
                >
                    <MenuButton title="Pricing" href="/coming-soon" />
                    <MenuButton title="Explore" href="/coming-soon" />
                    <MenuButton title="Login" href={csrLink('/auth')} />
                    <MenuButton title="Sign up" href={csrLink('/auth')} />
                </div>
            )}
        </div>
    )
}
