import { Metadata } from 'next'
import { QuoteFormWrapper } from '@/components/forms/QuoteFormWrapper'

export const metadata: Metadata = {
  title: 'Solicitar Cotización - Hexágono Web',
  description: 'Solicita una cotización personalizada para tu proyecto web. Desarrollo de sitios web, tiendas online y gestión de redes sociales en Argentina.',
  keywords: ['cotización', 'presupuesto', 'desarrollo web', 'sitio web', 'tienda online', 'redes sociales'],
  openGraph: {
    title: 'Solicitar Cotización - Hexágono Web',
    description: 'Solicita una cotización personalizada para tu proyecto web.',
    type: 'website',
  },
}

export default function CotizacionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Solicita tu Cotización
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Completa el formulario y te enviaremos una propuesta personalizada 
            para tu proyecto web en menos de 24 horas.
          </p>
        </div>

        {/* Formulario */}
        <QuoteFormWrapper />
        
        {/* Información adicional */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Respuesta Rápida</h3>
              <p className="text-sm text-muted-foreground">
                Recibirás nuestra propuesta en menos de 24 horas
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Propuesta Personalizada</h3>
              <p className="text-sm text-muted-foreground">
                Cada proyecto es único y merece una propuesta a medida
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-semibold mb-2">Soporte Continuo</h3>
              <p className="text-sm text-muted-foreground">
                Te acompañamos durante todo el proceso del proyecto
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
