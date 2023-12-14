import './globals.css'
import type {Metadata} from 'next'
import {Inter} from 'next/font/google'
import React from "react";
import {Analytics} from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({subsets: ['latin']})

export const metadata: Metadata = {
    title: 'Calorie Compass',
    description: 'Food Tracker App - Diplomarbeit Yanik Emmenegger',
}

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <html lang="de">
            <body className={inter.className}>
                {children}
                <Analytics/>
                <SpeedInsights/>
            </body>

        </html>
    )
}
