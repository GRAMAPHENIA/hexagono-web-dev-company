import { Metadata } from 'next'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Mail, Clock, ArrowLeft } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Cotización Enviada - Hexágono Web',
  description: 'Tu cotización ha sido enviada exitosamente. Te contactaremos pronto con una propuesta personalizada.',
}

export default function CotizacionExitoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20 flex items-center justify-center">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <Card className="text-center">
            <CardHeader>
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              </div>
              <CardTitle className="text-3xl font-bold text-green-600">
                ¡Cotización Enviada!
              </CardTitle>
              <CardDescription className="text-lg">
                Tu solicitud ha sido recibida exitosamente
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-left space-y-4">
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Confirmación por Email</h3>
                    <p className="text-sm text-muted-foreground">
                      Hemos enviado una confirmación a tu email con los detalles de tu solicitud
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <h3 className="font-semibold">Respuesta en 24 Horas</h3>
                    <p className="text-sm text-muted-foreground">
                      Nuestro equipo revisará tu proyecto y te enviará una propuesta personalizada
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-semibold mb-2">¿Qué sigue?</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Revisamos tu proyecto en detalle</li>
                  <li>• Preparamos una propuesta personalizada</li>
                  <li>• Te contactamos con la mejor solución</li>
                  <li>• Coordinamos una reunión si es necesario</li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild>
                  <Link href="/">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Volver al Inicio
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/contact">
                    Contactar Directamente
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
