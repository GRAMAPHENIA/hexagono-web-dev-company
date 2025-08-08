import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Mail, Clock, ArrowLeft, Sparkles, Users, Calendar } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cotización Enviada - Hexágono Web',
  description: 'Tu cotización ha sido enviada exitosamente. Te contactaremos pronto con una propuesta personalizada.',
}

export default function CotizacionExitoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header con animación */}
          <div className="text-center mb-12">
            <div className="relative inline-block mb-6">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-lg animate-pulse">
                <CheckCircle className="w-12 h-12 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-yellow-800" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent mb-4">
              ¡Cotización Enviada!
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Tu solicitud ha sido recibida exitosamente. Estamos emocionados de trabajar contigo.
            </p>
          </div>

          {/* Cards informativas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-lg">Confirmación por Email</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Hemos enviado una confirmación a tu email con los detalles de tu solicitud
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-yellow-600" />
                </div>
                <CardTitle className="text-lg">Respuesta en 24 Horas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Nuestro equipo revisará tu proyecto y te enviará una propuesta personalizada
                </p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-lg">Soporte Continuo</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Te acompañamos durante todo el proceso del proyecto
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Proceso paso a paso */}
          <Card className="mb-12">
            <CardHeader>
              <CardTitle className="text-2xl text-center">¿Qué sigue?</CardTitle>
              <CardDescription className="text-center">
                Nuestro proceso de trabajo contigo
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Análisis</h3>
                  <p className="text-sm text-muted-foreground">
                    Revisamos tu proyecto en detalle
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Propuesta</h3>
                  <p className="text-sm text-muted-foreground">
                    Preparamos una propuesta personalizada
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Contacto</h3>
                  <p className="text-sm text-muted-foreground">
                    Te contactamos con la mejor solución
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-primary">4</span>
                  </div>
                  <h3 className="font-semibold mb-2">Coordinación</h3>
                  <p className="text-sm text-muted-foreground">
                    Coordinamos una reunión si es necesario
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Acciones */}
          <div className="text-center space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70">
                <Link href="/">
                  <ArrowLeft className="w-5 h-5 mr-2" />
                  Volver al Inicio
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link href="/contact">
                  <Calendar className="w-5 h-5 mr-2" />
                  Contactar Directamente
                </Link>
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground">
              ¿Tienes alguna pregunta? No dudes en contactarnos
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
