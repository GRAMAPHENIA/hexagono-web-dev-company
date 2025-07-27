'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Calculator, TrendingUp, Info } from 'lucide-react'
import { ServiceType, PriceEstimate } from '@/lib/types/quote'
import { formatPrice } from '@/lib/utils/format'

interface PriceCalculatorProps {
  serviceType: ServiceType
  features: string[]
  customRequirements?: string
}

export function PriceCalculator({ serviceType, features, customRequirements }: PriceCalculatorProps) {
  const [priceEstimate, setPriceEstimate] = useState<PriceEstimate | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const calculatePrice = async () => {
      if (!serviceType || features.length === 0) {
        setPriceEstimate(null)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await fetch('/api/pricing/calculate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            serviceType,
            features,
            customRequirements,
          }),
        })

        if (!response.ok) {
          throw new Error('Error al calcular el precio')
        }

        const data = await response.json()
        setPriceEstimate(data.data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error desconocido')
        setPriceEstimate(null)
      } finally {
        setIsLoading(false)
      }
    }

    // Debounce the calculation to avoid too many API calls
    const timeoutId = setTimeout(calculatePrice, 500)
    return () => clearTimeout(timeoutId)
  }, [serviceType, features, customRequirements])

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="flex items-center space-x-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Calculando precio...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Alert variant="destructive">
        <Info className="h-4 w-4" />
        <AlertDescription>
          {error}. Por favor, intenta nuevamente.
        </AlertDescription>
      </Alert>
    )
  }

  if (!priceEstimate) {
    return null
  }

  const getServiceTypeLabel = (type: ServiceType): string => {
    const labels = {
      LANDING_PAGE: 'Landing Page',
      CORPORATE_WEB: 'Web Corporativa',
      ECOMMERCE: 'Tienda Online',
      SOCIAL_MEDIA: 'Gestión de Redes Sociales'
    }
    return labels[type]
  }

  const getPriceVariant = (totalEstimate: number) => {
    if (totalEstimate < 200000) return 'secondary'
    if (totalEstimate < 400000) return 'default'
    return 'destructive'
  }

  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-center space-x-2">
          <Calculator className="w-5 h-5 text-primary" />
          <CardTitle className="text-lg">Estimación de Precio</CardTitle>
        </div>
        <CardDescription>
          Precio estimado para {getServiceTypeLabel(serviceType)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Precio Base */}
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Precio Base</p>
            <p className="text-sm text-muted-foreground">
              {getServiceTypeLabel(serviceType)}
            </p>
          </div>
          <div className="text-right">
            <p className="font-semibold">{formatPrice(priceEstimate.basePrice)}</p>
          </div>
        </div>

        {/* Características Adicionales */}
        {priceEstimate.additionalFeatures.length > 0 && (
          <>
            <Separator />
            <div className="space-y-3">
              <p className="font-medium">Características Adicionales</p>
              {priceEstimate.additionalFeatures.map((feature, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">{feature.name}</span>
                  </div>
                  <span className="text-sm font-medium">
                    {feature.cost > 0 ? `+${formatPrice(feature.cost)}` : 'Incluido'}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}

        {/* Total */}
        <Separator />
        <div className="flex items-center justify-between">
          <div>
            <p className="text-lg font-semibold">Total Estimado</p>
            <p className="text-sm text-muted-foreground">
              {features.length} característica{features.length !== 1 ? 's' : ''} seleccionada{features.length !== 1 ? 's' : ''}
            </p>
          </div>
          <div className="text-right">
            <Badge variant={getPriceVariant(priceEstimate.totalEstimate)} className="text-lg px-3 py-1">
              {formatPrice(priceEstimate.totalEstimate)}
            </Badge>
            <p className="text-xs text-muted-foreground mt-1">
              {priceEstimate.currency}
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription className="text-sm">
            {priceEstimate.disclaimer}
          </AlertDescription>
        </Alert>

        {/* Información Adicional */}
        <div className="bg-muted/50 rounded-lg p-4 space-y-2">
          <h4 className="font-medium text-sm">¿Qué incluye este precio?</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Diseño personalizado y responsive</li>
            <li>• Desarrollo completo y testing</li>
            <li>• Configuración inicial y puesta en marcha</li>
            <li>• 30 días de soporte post-lanzamiento</li>
            <li>• Capacitación básica de uso</li>
          </ul>
        </div>

        {/* Call to Action */}
        <div className="bg-primary/5 rounded-lg p-4 text-center">
          <p className="text-sm font-medium text-primary">
            ¿Te interesa esta propuesta?
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Completa el formulario para recibir una cotización detallada y personalizada
          </p>
        </div>
      </CardContent>
    </Card>
  )
}