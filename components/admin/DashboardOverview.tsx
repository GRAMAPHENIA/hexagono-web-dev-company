'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  DollarSign, 
  FileText, 
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { Quote, QuoteStatus } from '@/lib/types/quote'

interface DashboardStats {
  totalQuotes: number
  pendingQuotes: number
  quotedQuotes: number
  completedQuotes: number
  totalRevenue: number
  monthlyGrowth: number
  avgResponseTime: number
}

export function DashboardOverview() {
  const [quotes, setQuotes] = useState<Quote[]>([])
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState<DashboardStats>({
    totalQuotes: 0,
    pendingQuotes: 0,
    quotedQuotes: 0,
    completedQuotes: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
    avgResponseTime: 0,
  })

  useEffect(() => {
    fetchQuotes()
  }, [])

  const fetchQuotes = async () => {
    try {
      const response = await fetch('/api/quotes')
      if (response.ok) {
        const result = await response.json()
        // La API devuelve { success: true, data: { data: [...], pagination: {...} } }
        const quotesData = result.data?.data || []
        setQuotes(quotesData)
        calculateStats(quotesData)
      }
    } catch (error) {
      console.error('Error fetching quotes:', error)
    } finally {
      setLoading(false)
    }
  }

  const calculateStats = (quotesData: Quote[]) => {
    const pending = quotesData.filter(q => q.status === 'PENDING').length
    const quoted = quotesData.filter(q => q.status === 'QUOTED').length
    const completed = quotesData.filter(q => q.status === 'COMPLETED').length
    const totalRevenue = quotesData
      .filter(q => q.estimatedPrice)
      .reduce((sum, q) => sum + (q.estimatedPrice || 0), 0)

    setStats({
      totalQuotes: quotesData.length,
      pendingQuotes: pending,
      quotedQuotes: quoted,
      completedQuotes: completed,
      totalRevenue,
      monthlyGrowth: 12.5, // Mock data
      avgResponseTime: 2.3, // Mock data in hours
    })
  }

  const recentQuotes = quotes.slice(0, 5)

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="mt-2 text-muted-foreground">Cargando dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
             <div>
         <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
         <p className="text-muted-foreground">
           Vista general del sistema de cotizaciones
         </p>
       </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cotizaciones</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalQuotes}</div>
            <p className="text-xs text-muted-foreground">
              +{stats.monthlyGrowth}% desde el mes pasado
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pendientes</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.pendingQuotes}</div>
            <p className="text-xs text-muted-foreground">
              Requieren atención
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cotizadas</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.quotedQuotes}</div>
            <p className="text-xs text-muted-foreground">
              Propuestas enviadas
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completadas</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.completedQuotes}</div>
            <p className="text-xs text-muted-foreground">
              Proyectos finalizados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue and Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Ingresos Estimados</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              ${stats.totalRevenue.toLocaleString('es-AR')}
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">+15.2%</span>
              <span className="text-sm text-muted-foreground ml-1">vs mes anterior</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tiempo de Respuesta Promedio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stats.avgResponseTime}h
            </div>
            <div className="flex items-center mt-2">
              <TrendingDown className="h-4 w-4 text-green-600 mr-1" />
              <span className="text-sm text-green-600">-0.5h</span>
              <span className="text-sm text-muted-foreground ml-1">vs mes anterior</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Actividad Reciente</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentQuotes.length === 0 ? (
              <div className="text-center py-8">
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">No hay cotizaciones recientes</p>
              </div>
            ) : (
              recentQuotes.map((quote) => (
                                 <div key={quote.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                   <div className="flex items-center space-x-4">
                     <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                       <Users className="h-5 w-5 text-primary" />
                     </div>
                     <div>
                       <p className="font-medium text-foreground">{quote.clientName}</p>
                       <p className="text-sm text-muted-foreground">
                         {quote.serviceType === 'LANDING_PAGE' && 'Landing Page'}
                         {quote.serviceType === 'CORPORATE_WEB' && 'Web Corporativa'}
                         {quote.serviceType === 'ECOMMERCE' && 'Tienda Online'}
                         {quote.serviceType === 'SOCIAL_MEDIA' && 'Redes Sociales'}
                       </p>
                     </div>
                   </div>
                  <div className="flex items-center space-x-2">
                    <Badge 
                      variant={
                        quote.status === 'PENDING' ? 'secondary' :
                        quote.status === 'QUOTED' ? 'default' :
                        quote.status === 'COMPLETED' ? 'default' : 'destructive'
                      }
                    >
                      {quote.status === 'PENDING' && 'Pendiente'}
                      {quote.status === 'IN_REVIEW' && 'En Revisión'}
                      {quote.status === 'QUOTED' && 'Cotizado'}
                      {quote.status === 'COMPLETED' && 'Completado'}
                      {quote.status === 'CANCELLED' && 'Cancelado'}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(quote.createdAt).toLocaleDateString('es-AR')}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Acciones Rápidas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex flex-col">
              <FileText className="h-6 w-6 mb-2" />
              <span>Nueva Cotización</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <Calendar className="h-6 w-6 mb-2" />
              <span>Ver Pendientes</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <DollarSign className="h-6 w-6 mb-2" />
              <span>Reportes</span>
            </Button>
            <Button variant="outline" className="h-20 flex flex-col">
              <Users className="h-6 w-6 mb-2" />
              <span>Clientes</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
