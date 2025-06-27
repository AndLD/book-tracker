import type { Metadata } from 'next'
import './globals.css'
import Head from 'next/head'
import ThemeProvider from '@/components/ThemeProvider'
import { AntdRegistry } from '@ant-design/nextjs-registry'
import { appName } from '@lib/utils/constants'

// const geistSans = localFont({
//     src: './fonts/GeistVF.woff',
//     variable: '--font-geist-sans',
//     weight: '100 900'
// })

export const metadata: Metadata = {
    title: appName,
    description: 'Speed up your MVP'
}

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <Head>
                <link rel="shortcut icon" href="/favicon.ico" />
            </Head>
            <body /*className={`${geistSans.variable}`}*/>
                <AntdRegistry>
                    <ThemeProvider>{children}</ThemeProvider>
                </AntdRegistry>
            </body>
        </html>
    )
}
