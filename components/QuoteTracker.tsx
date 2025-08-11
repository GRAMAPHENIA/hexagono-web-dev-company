'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Clock, CheckCircle, AlertCircle, XCircle, Eye } from 'lucide-react'
import { formatDistanceToNow } from 'date-fns'
import { es } from 'date-fns/locale'

interface QuoteTrackingData {
  id: string
  quoteNumber: string
  status: 'PENDING' | 'IN_REVIEW' | 'QUOTED' | 'COMPLETED' | 'CANCELLED'
  priority: 'LOW' | 'MEDIUM' | 'HIGH'
  createdAt: string
  updatedAt: string
  estimatedResponseDate: string
  clientName: string
  serviceType: string
  estimatedPrice?: number
  timeline?: string
  statusHistory: Array<{
    status: string
    createdAt: string
    notes?: string
  }>
  publicNotes: Array<{
    content: string
    createdAt: string
  }>
}

interface QuoteTrackerProps {
  token: string
}

const statusConfig = {
  PENDING: {
    label: 'Pendiente',
    icon: Clock,
    color: 'bg-yellow-500',
    description: 'Tu cotización ha sido recibida y está en cola para revisión.',
  },
  IN_REVIEW: {
    label: 'En Revisión',
    icon: Eye,
    color: 'bg-blue-500',
    description: 'Nuestro equipo está analizando los detalles de tu proyecto.',
  },
  QUOTED: {
    label: 'Cotizada',
    icon: CheckCircle,
    color: 'bg-green-500',
    description: 'Tu cotización está lista. Revisa tu email para ver la propuesta.',
  },
  COMPLETED: {
    label: 'Completada',
    icon: CheckCircle,
    color: 'bg-green-600',
    description: 'El proceso de cotización ha sido completado exitosamente.',
  },
  CANCELLED: {
    label: 'Cancelada',
    icon: XCircle,
    color: 'bg-red-500',
    description: 'Esta cotización ha sido cancelada.',
  },
}

const serviceTypeLabels = {
  LANDING_PAGE: 'Landing Page',
  CORPORATE_WEB: 'Web Corporativa',
  ECOMMERCE: 'Tienda Online',
  SOCIAL_MEDIA: 'Gestión de Redes Sociales',
}

const priorityLabels = {
  LOW: 'Baja',
  MEDIUM: 'Media',
  HIGH: 'Alta',
}

export function QuoteTracker({ token }: QuoteTrackerProps) {
  const [data, setData] = useState<QuoteTrackingData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchTrackingData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/quotes/track/${token}`)
      
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Error al obtener datos de seguimiento')
      }

      const trackingData = await response.json()
      setData(trackingData)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTrackingData()
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(fetchTrackingData, 30000)
    
    return () => clearInterval(interval)
  }, [token])

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        <span className="ml-2">Cargando información de seguimiento...</span>
      </div>
    )
  }

  if (error) {
    return (
      <Card className="border-red-200">
        <CardContent className="p-6">
          <div className="flex items-center text-red-600">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!data) {
    return null
  }

  const currentStatus = statusConfig[data.status]
  const StatusIcon = currentStatus.icon
  const isOverdue = new Date() > new Date(data.estimatedResponseDate) && 
                   !['QUOTED', 'COMPLETED', 'CANCELLED'].includes(data.status)

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl">
              Cotización #{data.quoteNumber}
            </CardTitle>
            <Badge variant={data.priority === 'HIGH' ? 'destructive' : 'secondary'}>
              Prioridad {priorityLabels[data.priority]}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Cliente</p>
              <p className="font-medium">{data.clientName}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Servicio</p>
              <p className="font-medium">
                {serviceTypeLabels[data.serviceType as keyof typeof serviceTypeLabels]}
              </p>
            </div>
            {data.estimatedPrice && (
              <div>
                <p className="text-sm text-muted-foreground">Precio Estimado</p>
                <p className="font-medium">
                  ${data.estimatedPrice.toLocaleString('es-AR')} ARS
                </p>
              </div>
            )}
            {data.timeline && (
              <div>
                <p className="text-sm text-muted-foreground">Tiempo Estimado</p>
                <p className="font-medium">{data.timeline}</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Status Card */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <div className={`w-3 h-3 rounded-full ${currentStatus.color} mr-3`}></div>
            Estado Actual: {currentStatus.label}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <StatusIcon className="h-6 w-6 mt-1 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm">{currentStatus.description}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Última actualización: {formatDistanceToNow(new Date(data.updatedAt), { 
                  addSuffix: true, 
                  locale: es 
                })}
              </p>
            </div>
          </div>

          {!['QUOTED', 'COMPLETED', 'CANCELLED'].includes(data.status) && (
            <div className="bg-muted p-3 rounded-lg">
              <p className="text-sm font-medium">
                Tiempo estimado de respuesta:
              </p>
              <p className={`text-sm ${isOverdue ? 'text-red-600' : 'text-muted-foreground'}`}>
                {formatDistanceToNow(new Date(data.estimatedResponseDate), { 
                  addSuffix: true, 
                  locale: es 
                })}
                {isOverdue && ' (Retrasado)'}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Timeline Card */}
      {data.statusHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Historial de Estados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.statusHistory.map((history, index) => {
                const historyStatus = statusConfig[history.status as keyof typeof statusConfig]
                const HistoryIcon = historyStatus?.icon || Clock
                
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full ${historyStatus?.color || 'bg-gray-400'} mt-2`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <HistoryIcon className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium text-sm">
                          {historyStatus?.label || history.status}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(history.createdAt), { 
                            addSuffix: true, 
                            locale: es 
                          })}
                        </span>
                      </div>
                      {history.notes && (
                        <p className="text-sm text-muted-foreground mt-1">
                          {history.notes}
                        </p>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Public Notes */}
      {data.publicNotes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Notas y Actualizaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.publicNotes.map((note, index) => (
                <div key={index} className="border-l-2 border-primary pl-4">
                  <p className="text-sm">{note.content}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {formatDistanceToNow(new Date(note.createdAt), { 
                      addSuffix: true, 
                      locale: es 
                    })}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Auto-refresh indicator */}
      <div className="text-center">
        <p className="text-xs text-muted-foreground">
          Esta página se actualiza automáticamente cada 30 segundos
        </p>
      </div>
    </div>
  )
}