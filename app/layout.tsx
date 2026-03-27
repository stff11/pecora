import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Max Dance presenta La Pecora Nera – Porto Torres',
  description: 'Circolo ricreativo a Porto Torres: danza sudamericana, boccette, scacchi e convivialità sarda.',
  openGraph: {
    title: 'La Pecora Nera – Porto Torres',
    description: 'Danza, giochi e buona compagnia in Via Lussu, Porto Torres.',
    locale: 'it_IT',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
