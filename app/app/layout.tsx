import type {Metadata} from 'next'
import React from "react";
export const metadata: Metadata = {
    title: 'Calorie Compass',
    description: 'Food Tracker App - Diplomarbeit Yanik Emmenegger',
}

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <div>
            {children}
        </div>
    )
}
