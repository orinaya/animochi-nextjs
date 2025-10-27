// import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import ToastProvider from '@/components/toast-provider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

// export const metadata: Metadata = {
//   title: 'Animochi',
//   description: 'description',
//   icons: {
//     icon: [
//       { url: '/animochi-favicon.svg', type: 'image/svg+xml' },
//       { url: '/animochi-favicon.svg', sizes: '16x16', type: 'image/svg+xml' },
//       { url: '/animochi-favicon.svg', sizes: '32x32', type: 'image/svg+xml' }
//     ],
//     shortcut: [{ url: '/animochi-favicon.svg', type: 'image/svg+xml' }]
//     // apple: [
//     //   { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
//     // ]
//   },
//   manifest: '/manifest.json'
// }

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>): React.ReactNode {
  return (
    <html lang='fr'>
      <head>
        <link rel='icon' type='image/png' href='/favicon-96x96.png' sizes='96x96' />
        <link rel='icon' type='image/svg+xml' href='/favicon.svg' />
        <link rel='shortcut icon' href='/favicon.ico' />
        <link rel='apple-touch-icon' sizes='180x180' href='/apple-touch-icon.png' />
        <link rel='manifest' href='/site.webmanifest' />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <ToastProvider />
      </body>
    </html>
  )
}
