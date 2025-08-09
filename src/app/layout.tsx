import type { Metadata, Viewport } from 'next'
import { Inter, Roboto_Mono, IBM_Plex_Serif, Space_Grotesk, Exo_2 } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import { PreferencesProvider } from '../components/PreferencesProvider'
import { TitleTicker } from '@/components/TitleTicker'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const mono = Roboto_Mono({ subsets: ['latin'], variable: '--font-mono' })
const serif = IBM_Plex_Serif({ subsets: ['latin'], weight: ['400','600'], variable: '--font-serif' })
const wideFont = Space_Grotesk({ subsets: ['latin'], variable: '--font-wide', weight: ['400','600'] })
const thinFont = Exo_2({ subsets: ['latin'], variable: '--font-thin', weight: ['200','400'] })

export const metadata: Metadata = {
  title: {
    default: 'WorldsTime – Global Clock & Alarm',
    template: '%s – WorldsTime'
  },
  description: 'Minimal, configurable global time.',
  keywords: ['world time', 'timezone', 'clock', 'time', 'UTC', 'PWA world clock', 'global time'],
  authors: [{ name: 'WorldsTime' }],
  openGraph: {
    title: 'WorldsTime',
    description: 'Minimal, configurable global time.',
    type: 'website',
    url: 'https://your-domain.example',
  },
  twitter: {
    card: 'summary',
    title: 'WorldsTime',
    description: 'Minimal, configurable global time.'
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="manifest" href="/manifest.webmanifest" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <link rel="apple-touch-icon" href="/icons/icon-192.png" />
  <link rel="icon" type="image/png" href="/favicon.png" />
  <link rel="shortcut icon" href="/favicon.png" />
      </head>
  <body className={`${inter.variable} ${mono.variable} ${serif.variable} ${wideFont.variable} ${thinFont.variable}`}>
        <ThemeProvider>
          <PreferencesProvider>
            <TitleTicker />
            {children}
          </PreferencesProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
