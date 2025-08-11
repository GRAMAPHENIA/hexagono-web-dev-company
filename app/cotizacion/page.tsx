import type { Metadata } from 'next'
import { QuoteFormWrapper } from '@/components/forms/QuoteFormWrapper'
import { FileUpload } from '@/components/forms/FileUpload'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock, Shield, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Solicitar Cotización - Hexágono Web',
  description: 'Solicita una cotización personalizada para tu proyecto web. Desarrollo de sitios web, tiendas online y gestión de redes sociales en Argentina.',
  keywords: [
    'cotización web',
    'presupuesto sitio web',
    'desarrollo web argentina',
    'precio página web',
    'cotizar tienda online',
    'presupuesto desarrollo web'
  ],
  openGraph: {
    title: 'Solicitar Cotización - Hexágono Web',
    description: 'Obtén una cotización personalizada para tu proyecto web. Respuesta en menos de 24 horas.',
    type: 'website',
    locale: 'es_AR'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Solicitar Cotización - Hexágono Web',
    description: 'Obtén una cotización personalizada para tu proyecto web. Respuesta en menos de 24 horas.'
  },
  alternates: {
    canonical: '/cotizacion'
  }
}

export default function CotizacionPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header Section */}
        <div className="text-center space-y-6 mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium border border-primary/20">
            <Clock className="h-4 w-4" />
            <span>Respuesta en menos de 24 horas</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Solicitar
            <span className="text-primary block">Cotización</span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Completa el formulario y recibe una propuesta personalizada para tu proyecto web. 
            Sin compromiso y totalmente gratuito.
          </p>
        </div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            {
              icon: <Clock className="h-6 w-6 text-primary" />,
              title: 'Respuesta Rápida',
              description: 'Te contactamos en menos de 24 horas'
            },
            {
              icon: <Shield className="h-6 w-6 text-primary" />,
              title: 'Sin Compromiso',
              description: 'Cotización gratuita y sin obligación'
            },
            {
              icon: <Users className="h-6 w-6 text-primary" />,
              title: 'Asesoramiento',
              description: 'Te ayudamos a definir tu proyecto'
            },
            {
              icon: <CheckCircle className="h-6 w-6 text-primary" />,
              title: 'Propuesta Detallada',
              description: 'Incluye timeline y especificaciones'
            }
          ].map((benefit, index) => (
            <Card key={index} className="text-center border-border/50 hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  {benefit.icon}
                </div>
                <h3 className="font-semibold mb-2">{benefit.title}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Form */}
        <QuoteFormWrapper />

        {/* Additional Information */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Process Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                ¿Cómo funciona?
              </CardTitle>
              <CardDescription>
                Nuestro proceso de cotización es simple y transparente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">1</Badge>
                <div>
                  <h4 className="font-medium">Completas el formulario</h4>
                  <p className="text-sm text-muted-foreground">
                    Nos cuentas sobre tu proyecto y necesidades específicas
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">2</Badge>
                <div>
                  <h4 className="font-medium">Analizamos tu proyecto</h4>
                  <p className="text-sm text-muted-foreground">
                    Nuestro equipo revisa los detalles y define la mejor estrategia
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">3</Badge>
                <div>
                  <h4 className="font-medium">Te enviamos la propuesta</h4>
                  <p className="text-sm text-muted-foreground">
                    Recibes una cotización detallada con precios y timeline
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Badge variant="outline" className="mt-1">4</Badge>
                <div>
                  <h4 className="font-medium">Coordinamos una reunión</h4>
                  <p className="text-sm text-muted-foreground">
                    Conversamos sobre los detalles y ajustamos según tus necesidades
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* FAQ */}
          <Card>
            <CardHeader>
              <CardTitle>Preguntas Frecuentes</CardTitle>
              <CardDescription>
                Respuestas a las consultas más comunes
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-1">¿Cuánto tiempo toma recibir la cotización?</h4>
                <p className="text-sm text-muted-foreground">
                  Te contactamos en menos de 24 horas con una propuesta inicial.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">¿La cotización tiene algún costo?</h4>
                <p className="text-sm text-muted-foreground">
                  No, la cotización es completamente gratuita y sin compromiso.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">¿Puedo modificar mi proyecto después?</h4>
                <p className="text-sm text-muted-foreground">
                  Sí, trabajamos contigo para ajustar el proyecto según tus necesidades.
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-1">¿Qué incluye el precio final?</h4>
                <p className="text-sm text-muted-foreground">
                  Diseño, desarrollo, testing, configuración inicial y 30 días de soporte.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <div className="mt-12 text-center">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="pt-6">
              <h3 className="text-lg font-semibold mb-4">¿Prefieres hablar directamente?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Email:</span>
                  <a href="mailto:contacto@hexagono.xyz" className="text-primary hover:underline">
                    contacto@hexagono.xyz
                  </a>
                </div>
                <div className="hidden sm:block text-muted-foreground">•</div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">WhatsApp:</span>
                  <a 
                    href="https://wa.me/5491123782307" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    +54 11 2378-2307
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}