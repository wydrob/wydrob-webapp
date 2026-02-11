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
      <head>
        <link rel="preload" href="/fonts/PPFragment-GlareExtraBold.otf" as="font" type="font/otf" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/PPFragment-GlareRegular.otf" as="font" type="font/otf" crossOrigin="anonymous" />
      </head>
      <body className="font-sans antialiased" suppressHydrationWarning>
        {/* Hidden preloader to force PP Fragment Glare font loading on page load */}
        <div aria-hidden="true" style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden', pointerEvents: 'none' }}>
          <span style={{ fontFamily: "'PP Fragment Glare'", fontWeight: 400 }}>.</span>
          <span style={{ fontFamily: "'PP Fragment Glare'", fontWeight: 800 }}>.</span>
        </div>
        {children}
        <FloatingNav />
        <InvertToggle />
      </body>
    </html>
  )
}
