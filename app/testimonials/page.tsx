import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Star, Quote, ArrowRight, Building, ShoppingCart, Globe } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Laura Fernández",
    company: "Boutique Elena",
    role: "Propietaria",
    service: "E-commerce",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
    testimonial:
      "DevCraft transformó completamente mi negocio. La tienda online que crearon superó todas mis expectativas. Las ventas aumentaron un 300% en los primeros 3 meses.",
    results: "+300% ventas online",
    icon: ShoppingCart,
  },
  {
    id: 2,
    name: "Miguel Rodríguez",
    company: "Consultoría MR",
    role: "CEO",
    service: "Sitio Corporativo",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
    testimonial:
      "Profesionalismo excepcional. El sitio web refleja perfectamente la calidad de nuestros servicios. Hemos recibido muchos elogios de nuestros clientes.",
    results: "+150% leads cualificados",
    icon: Building,
  },
  {
    id: 3,
    name: "Carmen López",
    company: "Estudio de Yoga Zen",
    role: "Instructora Principal",
    service: "Landing Page",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
    testimonial:
      "La landing page que crearon es simplemente perfecta. Captura la esencia de nuestro estudio y ha aumentado significativamente nuestras reservas de clases.",
    results: "+200% reservas online",
    icon: Globe,
  },
  {
    id: 4,
    name: "Antonio García",
    company: "Restaurante La Tradición",
    role: "Gerente",
    service: "Sitio Web + Reservas",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
    testimonial:
      "El sistema de reservas online ha revolucionado nuestro restaurante. Ahora podemos gestionar las mesas de manera eficiente y nuestros clientes pueden reservar fácilmente.",
    results: "+180% reservas online",
    icon: Building,
  },
  {
    id: 5,
    name: "Isabel Martín",
    company: "Clínica Dental Sonrisa",
    role: "Directora",
    service: "Web App Personalizada",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
    testimonial:
      "La aplicación web para gestión de pacientes que desarrollaron es increíble. Ha optimizado todos nuestros procesos internos y mejorado la experiencia del paciente.",
    results: "+90% eficiencia operativa",
    icon: Building,
  },
  {
    id: 6,
    name: "Roberto Sánchez",
    company: "Inmobiliaria Premium",
    role: "Director Comercial",
    service: "Rediseño Web",
    rating: 5,
    image: "/placeholder.svg?height=80&width=80",
    testimonial:
      "El rediseño de nuestro sitio web fue espectacular. Pasamos de una página obsoleta a una plataforma moderna que genera confianza y aumenta las consultas.",
    results: "+250% consultas inmobiliarias",
    icon: Globe,
  },
]

export default function TestimonialsPage() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="text-sm">
              Testimonios de Clientes
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Lo que dicen nuestros <span className="text-primary">clientes</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Historias reales de empresas que han transformado su presencia digital y alcanzado resultados
              extraordinarios con nuestras soluciones.
            </p>
          </div>
        </div>
      </section>

      {/* Testimonials Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="p-8 hover:shadow-lg transition-shadow relative">
                <CardContent className="p-0 space-y-6">
                  {/* Quote Icon */}
                  <Quote className="h-8 w-8 text-primary/20 absolute top-4 right-4" />

                  {/* Header */}
                  <div className="flex items-start space-x-4">
                    <img
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold">{testimonial.name}</h3>
                        <Badge variant="outline" className="text-xs">
                          <testimonial.icon className="h-3 w-3 mr-1" />
                          {testimonial.service}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      <p className="text-sm font-medium text-primary">{testimonial.company}</p>
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  {/* Testimonial */}
                  <blockquote className="text-muted-foreground italic">"{testimonial.testimonial}"</blockquote>

                  {/* Results */}
                  <div className="bg-primary/5 rounded-lg p-4">
                    <div className="text-sm font-medium text-primary">Resultado:</div>
                    <div className="text-lg font-bold">{testimonial.results}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Resultados que Hablan por Sí Solos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Métricas promedio de mejora en los proyectos de nuestros clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <Card className="p-6 text-center">
              <CardContent className="p-0 space-y-2">
                <div className="text-3xl font-bold text-primary">+185%</div>
                <div className="text-sm text-muted-foreground">Aumento en Conversiones</div>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardContent className="p-0 space-y-2">
                <div className="text-3xl font-bold text-primary">+240%</div>
                <div className="text-sm text-muted-foreground">Mejora en Tráfico Web</div>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardContent className="p-0 space-y-2">
                <div className="text-3xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Satisfacción del Cliente</div>
              </CardContent>
            </Card>

            <Card className="p-6 text-center">
              <CardContent className="p-0 space-y-2">
                <div className="text-3xl font-bold text-primary">-60%</div>
                <div className="text-sm text-muted-foreground">Reducción Tiempo de Carga</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Case Studies Preview */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Casos de Éxito Destacados</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Proyectos que han marcado la diferencia en diferentes industrias
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Boutique Elena E-commerce"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6 space-y-4">
                <Badge variant="secondary">E-commerce</Badge>
                <h3 className="text-xl font-semibold">Boutique Elena</h3>
                <p className="text-muted-foreground text-sm">
                  Transformación digital completa de una boutique tradicional en una tienda online exitosa con sistema
                  de inventario integrado.
                </p>
                <div className="text-2xl font-bold text-primary">+300% ventas</div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Consultoría MR Sitio Corporativo"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6 space-y-4">
                <Badge variant="secondary">Corporativo</Badge>
                <h3 className="text-xl font-semibold">Consultoría MR</h3>
                <p className="text-muted-foreground text-sm">
                  Rediseño completo de sitio corporativo con enfoque en generación de leads y posicionamiento como líder
                  del sector.
                </p>
                <div className="text-2xl font-bold text-primary">+150% leads</div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden hover:shadow-lg transition-shadow">
              <img
                src="/placeholder.svg?height=200&width=400"
                alt="Clínica Dental Web App"
                className="w-full h-48 object-cover"
              />
              <CardContent className="p-6 space-y-4">
                <Badge variant="secondary">Web App</Badge>
                <h3 className="text-xl font-semibold">Clínica Dental Sonrisa</h3>
                <p className="text-muted-foreground text-sm">
                  Aplicación web personalizada para gestión integral de pacientes, citas y historiales médicos.
                </p>
                <div className="text-2xl font-bold text-primary">+90% eficiencia</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold">Empresas que Confían en Nosotros</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 opacity-60">
              {[
                "Boutique Elena",
                "Consultoría MR",
                "Yoga Zen",
                "La Tradición",
                "Dental Sonrisa",
                "Inmobiliaria Premium",
              ].map((company, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Building className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div className="text-sm font-medium">{company}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold">¿Quieres ser nuestro próximo caso de éxito?</h2>
            <p className="text-xl opacity-90">
              Únete a las empresas que ya han transformado su presencia digital y alcanzado resultados extraordinarios.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" asChild>
                <Link href="/contact">
                  Iniciar Mi Proyecto
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
                asChild
              >
                <Link href="/services">Ver Servicios</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
