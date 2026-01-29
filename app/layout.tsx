import React from "react"
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import { ChatWidget } from "@/components/chat-widget"
import './globals.css'

// const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL('https://delistme.com'),
  title: {
    default: 'DelistMe - Stop Spam Calls & Protect Your Privacy',
    template: '%s | DelistMe',
  },
  description: 'DelistMe removes your personal information from data broker sites to reduce spam calls and protect your privacy.',
  keywords: ['spam protection', 'privacy', 'data removal', 'robocall blocker'],
  authors: [{ name: 'DelistMe' }],
  creator: 'DelistMe',
  publisher: 'DelistMe',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://delistme.com',
    siteName: 'DelistMe',
    title: 'DelistMe - Stop Spam Calls & Protect Your Privacy',
    description: 'Remove your info from data brokers. Stop spam forever.',
    images: [
      { url: '/og-image.webp', width: 1200, height: 630, alt: 'DelistMe' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DelistMe - Stop Spam Calls & Protect Your Privacy',
    description: 'Remove your info from data brokers. Stop spam forever.',
    images: ['/og-image.webp'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${GeistSans.variable} ${GeistMono.variable} font-sans antialiased`}>
        {children}
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  )
}
