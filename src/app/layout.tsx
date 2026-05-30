import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '../components/Header'
import Footer from '../components/Footer'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    template: '%s — Arjun Nayak',
    default: 'Arjun Nayak — Software Engineer',
  },
  description:
    'Personal website of Arjun Nayak, a software engineer building modern web applications.',
  openGraph: {
    title: 'Arjun Nayak — Software Engineer',
    description:
      'Personal website of Arjun Nayak, a software engineer building modern web applications.',
    type: 'website',
    locale: 'en_US',
    siteName: 'Arjun Nayak',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
