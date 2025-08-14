import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'M4Capital - Advanced Forex & Crypto Trading Platform',
  description: 'Experience the future of trading with M4Capital. Advanced forex and cryptocurrency trading platform with AI-powered insights, institutional-grade security, and lightning-fast execution.',
  keywords: 'forex trading, cryptocurrency, trading platform, AI trading, financial markets, M4Capital',
  authors: [{ name: 'M4Capital Team' }],
  creator: 'M4Capital',
  publisher: 'M4Capital',
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://m4capital.com',
    title: 'M4Capital - Advanced Forex & Crypto Trading Platform',
    description: 'Experience the future of trading with M4Capital. Advanced forex and cryptocurrency trading platform with AI-powered insights.',
    siteName: 'M4Capital',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'M4Capital Trading Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'M4Capital - Advanced Forex & Crypto Trading Platform',
    description: 'Experience the future of trading with M4Capital.',
    images: ['/og-image.jpg'],
    creator: '@m4capital',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0ea5e9',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}