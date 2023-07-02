import React from 'react'
import '@/styles/tailwind.css'
import '@/styles/globals.css'
import getQueryClient from './getQueryClient'
import { Hydrate, QueryClientProvider, dehydrate } from '@tanstack/react-query'
import Providers from './Provider'
import { PageLayout } from '@/containers/layout/PageLayout'

export const metadata = {
    title: 'Next.js',
    description: 'Generated by Next.js',
}

export default async function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <Providers>
                    <PageLayout>
                        {children}
                    </PageLayout>
                    <div id="portal" />
                </Providers>
            </body>
        </html>
    )
}
