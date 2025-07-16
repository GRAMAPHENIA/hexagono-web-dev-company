import { PlanCard } from "@/components/ui/plan-card"
import { QuoteBox } from "@/components/ui/quote-box"
import { CTAButton } from "@/components/ui/cta-button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Globe, Instagram } from "lucide-react"

export default function ServicesPage() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="text-sm">
              Nuestros Servicios
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Soluciones digitales <span className="text-primary">completas</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Desde sitios web profesionales hasta gestión estratégica de redes sociales. Todo lo que necesitas para
              destacar en el mundo digital.
            </p>
          </div>
        </div>
      </section>

      {/* Web Development Services */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Globe className="h-8 w-8 text-primary" />
              <h2 className="text-3xl sm:text-4xl font-bold">Desarrollo de Sitios Web</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Sitios web modernos, responsivos y optimizados para conversión
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <PlanCard
              title="Landing Page"
              price="$170.000"
              features={[
                "Enfocada en conversión",
                "Página única optimizada",
                "Adaptación a todos los dispositivos",
                "Formularios de contacto integrados",
                "Conexión con redes sociales",
                "Galería de imágenes",
                "Optimización SEO básica",
                "Tiempo de entrega: 7-10 días",
              ]}
            />
            <PlanCard
              title="Web Corporativa"
              price="$250.000"
              popular={true}
              features={[
                "Hasta 5 secciones completas",
                "Diseño de identidad de marca",
                "Configuración hosting externo",
                "Diseño 100% responsivo",
                "Formulario de contacto avanzado",
                "Optimización SEO completa",
                "Panel de administración",
                "Tiempo de entrega: 14-21 días",
              ]}
            />
            <PlanCard
              title="Tienda Online"
              price="$370.000"
              features={[
                "Carrito de compras completo",
                "Medios de pago integrados",
                "Sistema de carga de productos",
                "Hosting incluido (1 año)",
                "Panel administrativo avanzado",
                "Gestión de inventario",
                "Sistema de envíos",
                "Tiempo de entrega: 21-30 días",
              ]}
            />
          </div>

          <QuoteBox title="Detalles Importantes - Sitios Web">
            <ul className="space-y-2 text-sm">
              <li>
                • <strong>Hosting y dominio:</strong> No incluidos por defecto (excepto Tienda Online)
              </li>
              <li>
                • <strong>Mantenimiento:</strong> Disponible como servicio opcional desde $25.000/mes
              </li>
              <li>
                • <strong>Personalización:</strong> Todos los planes son adaptables a necesidades específicas
              </li>
              <li>
                • <strong>Garantía:</strong> 30 días de soporte técnico gratuito post-entrega
              </li>
            </ul>
          </QuoteBox>
        </div>
      </section>

      {/* Social Media Management */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Instagram className="h-8 w-8 text-primary" />
              <h2 className="text-3xl sm:text-4xl font-bold">Gestión de Redes Sociales</h2>
            </div>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Estrategias personalizadas para hacer crecer tu presencia en redes sociales
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <PlanCard
              title="Plan Inicial"
              price="$85.000"
              features={[
                "2 posts profesionales al mes",
                "Historias semanales",
                "Reducción y optimización de copias",
                "Diseño gráfico básico",
                "Gestión de 1 red social",
                "Reporte mensual de métricas",
                "Respuesta a comentarios",
                "Hashtags estratégicos",
              ]}
            />
            <PlanCard
              title="Plan Activo"
              price="$180.000"
              popular={true}
              features={[
                "10 posts profesionales al mes",
                "Diseño gráfico profesional",
                "Email marketing mensual",
                "Gestión de 2 redes sociales",
                "Historias diarias",
                "Análisis detallado de métricas",
                "Estrategia de contenido",
                "Atención a mensajes directos",
              ]}
            />
            <PlanCard
              title="Plan Premium"
              price="$310.000"
              features={[
                "Estrategia completa de crecimiento",
                "Posts ilimitados",
                "Gestión de todas las redes sociales",
                "Campañas publicitarias incluidas",
                "Atención personalizada dedicada",
                "Reportes detallados semanales",
                "Influencer marketing",
                "Consultoría estratégica mensual",
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

      {/* Service Comparison */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Comparación de Servicios</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Encuentra el plan perfecto para tu negocio
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <Card className="p-8">
              <CardContent className="p-0 space-y-6">
                <div className="flex items-center space-x-3">
                  <Globe className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold">Sitios Web</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Landing Page</span>
                    <span className="text-primary font-bold">$170.000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Web Corporativa</span>
                    <span className="text-primary font-bold">$250.000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Tienda Online</span>
                    <span className="text-primary font-bold">$370.000</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Todos incluyen diseño responsivo, optimización SEO y soporte post-entrega.
                </p>
              </CardContent>
            </Card>

            <Card className="p-8">
              <CardContent className="p-0 space-y-6">
                <div className="flex items-center space-x-3">
                  <Instagram className="h-8 w-8 text-primary" />
                  <h3 className="text-2xl font-bold">Redes Sociales</h3>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Plan Inicial</span>
                    <span className="text-primary font-bold">$85.000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Plan Activo</span>
                    <span className="text-primary font-bold">$180.000</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b">
                    <span className="font-medium">Plan Premium</span>
                    <span className="text-primary font-bold">$310.000</span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Precios mensuales. Incluyen diseño, contenido y gestión completa.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold">¿Necesitas algo personalizado?</h2>
            <p className="text-xl opacity-90">
              Todos nuestros servicios son adaptables. Conversemos sobre tu proyecto específico y creemos una solución a
              medida.
            </p>
            <CTAButton href="/contact">Solicitar Cotización Personalizada</CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
