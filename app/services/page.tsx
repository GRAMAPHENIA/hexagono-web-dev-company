import { PlanCard } from '@/components/ui/plan-card'
import { QuoteBox } from '@/components/ui/quote-box'
import { CTAButton } from '@/components/ui/cta-button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Globe, Instagram, Zap, Sparkles, Monitor, MessageCircle } from 'lucide-react'

export default function ServicesPage() {
  return (
    <div className="space-y-20">
      {/* Hero Section - Estilo similar al home */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium border border-border mb-8">
              <Sparkles className="h-4 w-4" />
              <span>Innovación Digital</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Nuestros <span className="text-primary">Servicios</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              Soluciones digitales personalizadas que impulsan el crecimiento de tu negocio en la
              era digital.
            </p>
          </div>
        </div>
      </section>

      {/* Web Development Services */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium border border-border mb-4">
              <Monitor className="h-4 w-4" />
              <span>Desarrollo Web</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">Sitios Web Profesionales</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Soluciones web a medida que se adaptan a tus necesidades
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <PlanCard
              title="Landing Page"
              price="$190.000"
              features={[
                'Enfocada en conversión',
                'Página única optimizada',
                'Adaptación a todos los dispositivos',
                'Formularios de contacto integrados',
                'Conexión con redes sociales',
                'Galería de imágenes',
                'Optimización SEO básica',
                'Tiempo de entrega: 7-10 días',
              ]}
            />
            <PlanCard
              title="Web Corporativa"
              price="$275.000"
              popular={true}
              features={[
                'Hasta 5 secciones completas',
                'Diseño de identidad de marca',
                'Configuración hosting externo',
                'Diseño 100% responsivo',
                'Formulario de contacto avanzado',
                'Optimización SEO completa',
                'Panel de administración',
                'Tiempo de entrega: 14-21 días',
              ]}
            />
            <PlanCard
              title="Tienda Online"
              price="$410.000"
              features={[
                'Carrito de compras completo',
                'Medios de pago integrados',
                'Sistema de carga de productos',
                'Hosting incluido (1 año)',
                'Panel administrativo avanzado',
                'Gestión de inventario',
                'Sistema de envíos',
                'Tiempo de entrega: 21-30 días',
              ]}
            />
          </div>

          <QuoteBox title="Detalles Importantes - Sitios Web">
            <ul className="space-y-2 text-sm">
              <li>
                • <strong>Hosting y dominio:</strong> No incluidos por defecto (excepto Tienda
                Online)
              </li>
              <li>
                • <strong>Mantenimiento:</strong> Disponible como servicio opcional desde
                $25.000/mes
              </li>
              <li>
                • <strong>Personalización:</strong> Todos los planes son adaptables a necesidades
                específicas
              </li>
              <li>
                • <strong>Garantía:</strong> 30 días de soporte técnico gratuito post-entrega
              </li>
            </ul>
          </QuoteBox>
        </div>
      </section>

      {/* Social Media Management */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium border border-border mb-4">
              <MessageCircle className="h-4 w-4" />
              <span>Redes Sociales</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">Gestión de Redes Sociales</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Estrategias personalizadas para hacer crecer tu presencia en redes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <PlanCard
              title="Plan Inicial"
              price="$95.000"
              features={[
                '2 posts profesionales al mes',
                'Historias semanales',
                'Reducción y optimización de copias',
                'Diseño gráfico básico',
                'Gestión de 1 red social',
                'Reporte mensual de métricas',
                'Respuesta a comentarios',
                'Hashtags estratégicos',
              ]}
            />
            <PlanCard
              title="Plan Activo"
              price="$200.000"
              popular={true}
              features={[
                '10 posts profesionales al mes',
                'Diseño gráfico profesional',
                'Email marketing mensual',
                'Gestión de 2 redes sociales',
                'Historias diarias',
                'Análisis detallado de métricas',
                'Estrategia de contenido',
                'Atención a mensajes directos',
              ]}
            />
            <PlanCard
              title="Plan Premium"
              price="$340.000"
              features={[
                'Estrategia completa de crecimiento',
                'Posts ilimitados',
                'Gestión de todas las redes sociales',
                'Campañas publicitarias incluidas',
                'Atención personalizada dedicada',
                'Reportes detallados semanales',
                'Influencer marketing',
                'Consultoría estratégica mensual',
              ]}
            />
          </div>

          <QuoteBox title="Detalles Importantes - Redes Sociales">
            <ul className="space-y-2 text-sm">
              <li>
                • <strong>Redes incluidas:</strong> Instagram, Facebook, Twitter/X (según plan)
              </li>
              <li>
                • <strong>Contenido:</strong> Diseños originales adaptados a tu marca
              </li>
              <li>
                • <strong>Publicidad:</strong> Presupuesto publicitario no incluido (gestión sí)
              </li>
              <li>
                • <strong>Compromiso mínimo:</strong> 3 meses para mejores resultados
              </li>
            </ul>
          </QuoteBox>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium border border-border">
              <Zap className="h-4 w-4" />
              <span>¿Listo para comenzar?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">Transforma tu presencia digital hoy</h2>
            <p className="text-xl text-muted-foreground">
              Contáctanos para una consulta gratuita y descubre cómo podemos ayudarte a alcanzar tus
              objetivos.
            </p>
            <div className="pt-4">
              <CTAButton href="/contact">Solicitar Cotización</CTAButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
