import { Metadata } from 'next'
import { QuoteTracker } from '@/components/QuoteTracker'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, Home } from 'lucide-react'

interface PageProps {
  params: {
    token: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  return {
    title: 'Seguimiento de Cotización - Hexágono Web',
    description: 'Consulta el estado y progreso de tu cotización de servicios web.',
    robots: 'noindex, nofollow', // Private tracking pages shouldn't be indexed
  }
}

export default function TrackingPage({ params }: PageProps) {
  const { token } = params

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Inicio
                </Button>
              </Link>
              <Link href="/cotizacion">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Nueva Cotización
                </Button>
              </Link>
            </div>
            <div className="text-sm text-muted-foreground">
              Hexágono Web
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">
              Seguimiento de Cotización
            </h1>
            <p className="text-muted-foreground">
              Consulta el estado actual y el progreso de tu solicitud de cotización.
            </p>
          </div>

          <QuoteTracker token={token} />
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center space-y-4">
            <div className="flex justify-center space-x-6 text-sm">
              <Link href="/contacto" className="text-muted-foreground hover:text-primary">
                Contacto
              </Link>
              <Link href="/faq" className="text-muted-foreground hover:text-primary">
                Preguntas Frecuentes
              </Link>
              <Link href="/servicios" className="text-muted-foreground hover:text-primary">
                Servicios
              </Link>
            </div>
            <div className="text-xs text-muted-foreground">
              <p>¿Necesitas ayuda? Contáctanos:</p>
              <p>
                Email: <a href="mailto:contacto@hexagono.xyz" className="text-primary">contacto@hexagono.xyz</a> | 
                WhatsApp: <a href="https://wa.me/5491123782307" className="text-primary">+54 11 2378-2307</a>
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}