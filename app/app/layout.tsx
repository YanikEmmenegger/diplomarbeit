import type {Metadata} from 'next'
import React from "react";
import AuthProvider from "@/providers/AuthProvider";
import SignOutButton from "@/components/SignOutButton";

export const metadata: Metadata = {
    title: 'Calorie Compass',
    description: 'Food Tracker App - Diplomarbeit Yanik Emmenegger',
}

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <AuthProvider>
            <SignOutButton/>
            {children}
        </AuthProvider>
    )
}
