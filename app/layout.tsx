import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Hexágono - Desarrollo Web y Gestión de Redes Sociales',
    template: '%s | Hexágono Web',
  },
  description:
    'Creamos sitios web profesionales y gestionamos tus redes sociales. Diseño profesional, precios accesibles, soporte real. Transforma tu presencia digital con nosotros.',
  keywords: [
    'desarrollo web',
    'sitios web',
    'redes sociales',
    'landing pages',
    'tiendas online',
    'diseño web',
    'marketing digital',
    'SEO',
    'desarrollo a medida',
  ],
  authors: [{ name: 'Hexágono Web' }],
  creator: 'Hexágono Web',
  publisher: 'Hexágono Web',
  generator: 'Next.js',
  metadataBase: new URL('https://hexagono-web.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Hexágono - Desarrollo Web y Gestión de Redes Sociales',
    description:
      'Diseño web profesional y gestión de redes sociales para potenciar tu negocio online.',
    url: 'https://hexagono-web.com',
    siteName: 'Hexágono Web',
    locale: 'es_AR',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Hexágono Web - Desarrollo y Marketing Digital',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Hexágono - Desarrollo Web y Gestión de Redes Sociales',
    description:
      'Diseño web profesional y gestión de redes sociales para potenciar tu negocio online.',
    creator: '@hexagonoweb',
    images: ['/og-image.jpg'],
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
  verification: {
    google: 'TU_CODIGO_DE_VERIFICACION_GOOGLE',
    yandex: 'TU_CODIGO_DE_VERIFICACION_YANDEX',
  },
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange={false}>
          <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
