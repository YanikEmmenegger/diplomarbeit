import type {Metadata} from 'next'
import React from "react";
import AuthProvider from "@/providers/AuthProvider";
import ToasterProvider from "@/providers/ToastProvider";
import ModalProvider from "@/providers/ModalProvider";
import NavigationBar from "@/components/NavigationBar";

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
            <div className="flex items-center justify-start">
                <h1 className=" pl-3 py-4 text-2xl text-CalorieCompass-Primary">CalorieCompass</h1>
            </div>
            <main className="container px-3 mt-2 mx-auto pb-32">
                {children}
            </main>
            <NavigationBar/>
        </AuthProvider>
    )
}
