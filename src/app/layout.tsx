import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/toaster'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ChinaMediGuide - Medical Services for Foreigners in China',
  description: 'Help foreigners access medical services in China. Hospital search, doctor booking, translation services, and medical consultation.',
  keywords: ['medical', 'china', 'healthcare', 'hospital', 'doctor', 'booking', 'translation', 'foreigners'],
}

export default function RootLayout({
  children,
  params: Promise<{ locale: string }>
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
