import type { Metadata } from 'next'
import { Inter, Bebas_Neue, Playfair_Display } from 'next/font/google'
import './globals.css'
import FloatingNav from '@/components/FloatingNav'
import InvertToggle from '@/components/InvertToggle'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const bebas = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'WYDROB',
  description: 'WYDROB',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${bebas.variable} ${playfair.variable}`}>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {children}
        <FloatingNav />
        <InvertToggle />
      </body>
    </html>
  )
}
