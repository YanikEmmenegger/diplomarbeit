import type {Metadata} from 'next'
import React from "react";
import AuthProvider from "@/providers/AuthProvider";
import SignOutButton from "@/components/SignOutButton";
import ToasterProvider from "@/providers/ToastProvider";
import ModalProvider from "@/providers/ModalProvider";
import {Analytics} from '@vercel/analytics/react';

export const metadata: Metadata = {
    title: 'Calorie Compass',
    description: 'Food Tracker App - Diplomarbeit Yanik Emmenegger',
}

export default function RootLayout({children}: {
    children: React.ReactNode
}) {
    return (
        <AuthProvider>
            <ToasterProvider/>
            <ModalProvider/>
            <SignOutButton/>
            {children}
            <Analytics/>
        </AuthProvider>
    )
}
