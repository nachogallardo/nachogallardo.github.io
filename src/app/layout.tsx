import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { Toaster } from "@/components/ui/toaster";
import './globals.css';

export const metadata: Metadata = {
  title: 'Ignacio Gallardo Sánchez — Desarrollador Java',
  description: 'Desarrollador certificado por Oracle en Java SE 11. Servicios backend con Spring Boot, APIs REST y microservicios.',
  keywords: ['Java Developer', 'Spring Boot', 'Microservicios', 'Portfolio', 'Desarrollador Java', 'Oracle Certified'],
  authors: [{ name: 'Ignacio Gallardo Sánchez' }],
  creator: 'Ignacio Gallardo Sánchez',
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'website',
    locale: 'es_ES',
    url: 'https://ignaciogallardo.dev',
    title: 'Ignacio Gallardo Sánchez — Desarrollador Java',
    description: 'Desarrollador certificado por Oracle en Java SE 11. Servicios backend con Spring Boot, APIs REST y microservicios.',
    siteName: 'Ignacio Gallardo Sánchez',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ignacio Gallardo Sánchez — Desarrollador Java',
    description: 'Desarrollador certificado por Oracle en Java SE 11.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'permissions-policy': 'camera=(), microphone=(), geolocation=(), interest-cohort=(), private-state-token-redemption=*, private-state-token-issuance=*',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.svg" type="image/x-icon" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:opsz,wght@8..60,300;8..60,400;8..60,600&family=Inter+Tight:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap" rel="stylesheet" />
        <meta name="theme-color" content="#FAF9F7" />
        <meta name="color-scheme" content="light" />
        <meta httpEquiv="Permissions-Policy" content="private-state-token-redemption=*, private-state-token-issuance=*" />
      </head>
      <body className="font-body bg-background text-foreground antialiased">
        <Header />
        <main className="relative">
          {children}
        </main>
        <Footer />
        <Toaster />
      </body>
    </html>
  );
}
