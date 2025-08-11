import type { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, Clock, Mail, MessageCircle, ArrowLeft, Home } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cotización Enviada - Hexágono Web',
  description: 'Tu solicitud de cotización ha sido enviada exitosamente. Te contactaremos pronto con una propuesta personalizada.',
  robots: {
    index: false,
    follow: false
  }
}

export default function CotizacionExitoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Success Header */}
          <div className="text-center space-y-6 mb-12">
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-green-600 dark:text-green-400" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl font-bold text-green-600 dark:text-green-400">
                ¡Cotización Enviada!
              </h1>
              <p className="text-xl text-muted-foreground">
                Tu solicitud ha sido recibida exitosamente
              </p>
            </div>
          </div>

          {/* Main Success Card */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                ¿Qué sigue ahora?
              </CardTitle>
              <CardDescription>
                Te mantendremos informado sobre el progreso de tu cotización
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-semibold text-primary">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Confirmación por email</h3>
                    <p className="text-sm text-muted-foreground">
                      Recibirás un email de confirmación con los detalles de tu solicitud en los próximos minutos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-semibold text-primary">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Análisis del proyecto</h3>
                    <p className="text-sm text-muted-foreground">
                      Nuestro equipo analizará tu proyecto y preparará una propuesta personalizada.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-sm font-semibold text-primary">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold">Propuesta detallada</h3>
                    <p className="text-sm text-muted-foreground">
                      Te enviaremos una cotización completa con precios, timeline y especificaciones técnicas.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-lg p-4 border border-primary/20">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="font-semibold text-primary">Tiempo de respuesta</span>
                </div>
                <p className="text-sm">
                  Te contactaremos en <strong>menos de 24 horas</strong> con una propuesta inicial. 
                  Para proyectos complejos, podríamos necesitar información adicional.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Contact Options */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>¿Necesitas contactarnos?</CardTitle>
              <CardDescription>
                Si tienes alguna pregunta o quieres agregar información adicional
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="mailto:contacto@hexagono.xyz"
                  className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <Mail className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">contacto@hexagono.xyz</div>
                  </div>
                </a>
                
                <a
                  href="https://wa.me/5491123782307"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                >
                  <MessageCircle className="h-5 w-5 text-primary" />
                  <div>
                    <div className="font-medium">WhatsApp</div>
                    <div className="text-sm text-muted-foreground">+54 11 2378-2307</div>
                  </div>
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Additional Information */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Información importante</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Cotización sin compromiso</h4>
                  <p className="text-sm text-muted-foreground">
                    Nuestra cotización es completamente gratuita y no implica ningún compromiso de tu parte.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Propuesta personalizada</h4>
                  <p className="text-sm text-muted-foreground">
                    Cada cotización es única y adaptada específicamente a las necesidades de tu proyecto.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium">Asesoramiento incluido</h4>
                  <p className="text-sm text-muted-foreground">
                    Te ayudamos a definir y optimizar tu proyecto para obtener los mejores resultados.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild variant="outline">
              <Link href="/cotizacion" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" />
                Nueva Cotización
              </Link>
            </Button>
            
            <Button asChild>
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Volver al Inicio
              </Link>
            </Button>
          </div>

          {/* Footer Note */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground">
              ¿No recibiste el email de confirmación? Revisa tu carpeta de spam o 
              <a href="mailto:contacto@hexagono.xyz" className="text-primary hover:underline ml-1">
                contactanos directamente
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}