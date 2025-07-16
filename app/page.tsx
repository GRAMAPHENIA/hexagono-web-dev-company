import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CTAButton } from "@/components/ui/cta-button"
import { PlanCard } from "@/components/ui/plan-card"
import { QuoteBox } from "@/components/ui/quote-box"
import Link from "next/link"
import { ArrowRight, Globe, Users, Zap, Shield, Star, Quote, Code, Layout, Smartphone, Database, Server, Palette, Cpu } from "lucide-react"

const testimonials = [
  {
    name: "María González",
    role: "Directora de Marketing",
    company: "Boutique Luna",
    content:
      "Hexágono transformó completamente nuestra presencia online. El sitio web que crearon es hermoso y funcional, y la gestión de redes sociales ha aumentado nuestras ventas un 40%.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Carlos Rodríguez",
    role: "CEO",
    company: "TechStart Solutions",
    content:
      "Profesionales excepcionales. Entregaron nuestro sitio corporativo en tiempo récord y el soporte post-venta es impecable. Altamente recomendados.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Ana Martínez",
    role: "Propietaria",
    company: "Café Central",
    content:
      "La landing page que desarrollaron para nuestro café generó un aumento del 60% en reservas online. El diseño es exactamente lo que necesitábamos.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

export default function HomePage() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Soluciones web que <span className="text-[#1E2940] dark:text-primary">impulsan</span> tu negocio
              </h1>
              <p className="text-xl text-muted-foreground">
                Diseño profesional, precios accesibles, soporte real. Transformamos tu presencia digital con sitios web
                modernos y gestión estratégica de redes sociales.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <CTAButton href="/services">Ver Planes</CTAButton>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Contactar</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                <Globe className="h-32 w-32 text-primary/30" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Nuestros Servicios</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Soluciones completas para tu presencia digital
            </p>
          </div>

          {/* Web Services */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center">Sitios Web</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <PlanCard
                  title="Landing Page"
                  price="$170.000"
                  features={[
                    "Enfocada en conversión",
                    "Página única optimizada",
                    "Adaptación a dispositivos",
                    "Formularios integrados",
                    "Conexión redes sociales",
                    "Galería de imágenes",
                  ]}
                />
                <PlanCard
                  title="Web Corporativa"
                  price="$250.000"
                  popular={true}
                  features={[
                    "Hasta 5 secciones",
                    "Identidad de marca",
                    "Hosting externo",
                    "Diseño responsivo",
                    "Formulario de contacto",
                    "Optimización SEO básica",
                  ]}
                />
                <PlanCard
                  title="Tienda Online"
                  price="$370.000"
                  features={[
                    "Carrito de compras",
                    "Medios de pago integrados",
                    "Carga de productos",
                    "Hosting incluido",
                    "Panel administrativo",
                    "Gestión de inventario",
                  ]}
                />
              </div>
            </div>

            {/* Social Media Services */}
            <div>
              <h3 className="text-2xl font-bold mb-8 text-center">Gestión de Redes Sociales</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <PlanCard
                  title="Plan Inicial"
                  price="$85.000"
                  features={[
                    "2 posts al mes",
                    "Historias semanales",
                    "Reducción de copias",
                    "Diseño básico",
                    "1 red social",
                    "Reporte mensual",
                  ]}
                />
                <PlanCard
                  title="Plan Activo"
                  price="$180.000"
                  popular={true}
                  features={[
                    "10 posts al mes",
                    "Diseño profesional",
                    "Email marketing mensual",
                    "2 redes sociales",
                    "Historias diarias",
                    "Análisis de métricas",
                  ]}
                />
                <PlanCard
                  title="Plan Premium"
                  price="$310.000"
                  features={[
                    "Estrategia de crecimiento",
                    "Posts ilimitados",
                    "Todas las redes sociales",
                    "Campañas publicitarias",
                    "Atención personalizada",
                    "Reportes detallados",
                  ]}
                />
              </div>
            </div>
          </div>

          {/* Important Notes */}
          <QuoteBox title="Aclaraciones Importantes">
            <ul className="space-y-2 text-sm">
              <li>• Hosting y dominio no incluidos por defecto (excepto en Tienda Online)</li>
              <li>• Los planes no incluyen mantenimiento continuo (disponible como servicio opcional)</li>
              <li>• Todos los servicios son adaptables a necesidades personalizadas</li>
              <li>• Precios en pesos argentinos, sujetos a modificación</li>
            </ul>
          </QuoteBox>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">¿Por qué elegir Hexágono?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Combinamos experiencia, tecnología y atención personalizada
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Entrega Rápida</h3>
                <p className="text-sm text-muted-foreground">
                  Proyectos completados en tiempo récord sin comprometer la calidad.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Soporte Real</h3>
                <p className="text-sm text-muted-foreground">
                  Atención personalizada y soporte técnico cuando lo necesites.
                </p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Precios Accesibles</h3>
                <p className="text-sm text-muted-foreground">Calidad profesional a precios justos y transparentes.</p>
              </CardContent>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                  <Globe className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Diseño Moderno</h3>
                <p className="text-sm text-muted-foreground">
                  Sitios web actuales, responsivos y optimizados para conversión.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Lo que dicen nuestros clientes</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Testimonios reales de empresas que confiaron en nosotros
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow relative">
                <CardContent className="p-0 space-y-4">
                  <Quote className="h-8 w-8 text-primary/20 absolute top-4 right-4" />
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground italic">"{testimonial.content}"</blockquote>
                  <div className="flex items-center space-x-3 pt-4">
                    <img
                      src={testimonial.avatar || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role} - {testimonial.company}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold">¿Listo para hacer crecer tu negocio?</h2>
            <p className="text-xl opacity-90">
              Conversemos sobre tu proyecto y descubre cómo podemos ayudarte a alcanzar tus objetivos digitales.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">
                  Solicitar Cotización
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                asChild
              >
                <Link href="/services">Ver Todos los Planes</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Tecnologías */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-3 mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold">Tecnologías que Utilizamos</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Herramientas modernas para resultados excepcionales
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
            {[
              { name: 'Frontend', icon: <Layout className="h-8 w-8 text-primary" /> },
              { name: 'Backend', icon: <Server className="h-8 w-8 text-primary" /> },
              { name: 'Mobile', icon: <Smartphone className="h-8 w-8 text-primary" /> },
              { name: 'Bases de Datos', icon: <Database className="h-8 w-8 text-primary" /> },
              { name: 'Diseño', icon: <Palette className="h-8 w-8 text-primary" /> },
              { name: 'DevOps', icon: <Cpu className="h-8 w-8 text-primary" /> },
            ].map((tech, index) => (
              <div key={index} className="flex flex-col items-center p-4 bg-card rounded-lg hover:shadow-md transition-shadow h-full">
                <div className="flex items-center justify-center h-14 w-14 mb-3 bg-primary/10 rounded-full">
                  {tech.icon}
                </div>
                <h3 className="text-sm font-medium text-center">{tech.name}</h3>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 px-4 py-2 rounded-full text-sm">
              <Code className="h-4 w-4 text-primary" />
              <span>Tecnologías modernas y actualizadas</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
