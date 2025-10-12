import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Animochi',
  description: 'description',
  icons: {
    icon: [
      { url: '/animochi-favicon.svg', type: 'image/svg+xml' },
      { url: '/animochi-favicon.svg', sizes: '16x16', type: 'image/svg+xml' },
      { url: '/animochi-favicon.svg', sizes: '32x32', type: 'image/svg+xml' }
    ],
    shortcut: [{ url: '/animochi-favicon.svg', type: 'image/svg+xml' }]
    // apple: [
    //   { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    // ]
  },
  manifest: '/manifest.json'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>): React.ReactNode {
  return (
    <html lang='fr'>
      <head>
        <link rel='icon' href='/animochi-favicon.svg' type='image/svg+xml' />
        <link rel='shortcut icon' href='/animochi-favicon.svg' type='image/svg+xml' />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>{children}</body>
    </html>
  )
}
