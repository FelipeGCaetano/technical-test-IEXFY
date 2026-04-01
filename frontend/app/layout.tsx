'use client'

import { Geist, Geist_Mono } from "next/font/google"
import "../styles/globals.css"
import { Sidebar } from "@/components/Sidebar"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-br"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full flex overflow-hidden">
        <Sidebar />

        <main
          className="flex-1 flex flex-col overflow-y-auto 
                     bg-slate-50 p-6 md:p-10"
        >
          {children}
        </main>
      </body>
    </html>
  );
}