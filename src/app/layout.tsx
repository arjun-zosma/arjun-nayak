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
    default: 'Arjun Nayak — Founder & CEO of Zosma AI',
  },
  description:
    'Founder & CEO of Zosma AI. Building AI agent systems and open-source agentic tools that automate real workflows. Based in Mumbai, India.',
  openGraph: {
    title: 'Arjun Nayak — Founder & CEO of Zosma AI',
    description:
      'Founder & CEO of Zosma AI. Building AI agent systems and open-source agentic tools that automate real workflows.',
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
