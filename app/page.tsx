import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { CTAButton } from '@/components/ui/cta-button'
import { PlanCard } from '@/components/ui/plan-card'
import { QuoteBox } from '@/components/ui/quote-box'
import Link from 'next/link'
import {
  ArrowRight,
  Globe,
  Users,
  Zap,
  Shield,
  Star,
  Quote,
  Code,
  Sparkles,
  PenTool,
  Smartphone,
  Monitor,
  BarChart,
  CheckCircle,
} from 'lucide-react'
import { webPlans, socialPlans, formatPrice } from '@/lib/pricing'
import { getFeaturedTestimonials } from '@/lib/testimonials'
import { getTechnologies } from '@/lib/technologies'
import Image from 'next/image'

const testimonials = getFeaturedTestimonials()
const technologies = getTechnologies()

export default function HomePage() {
  return (
    <div className="space-y-20">
      {/* Hero Section - Versión Mejorada */}
      <section className="relative py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              {/* Badge de confianza */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-medium border border-border">
                <Sparkles className="h-4 w-4" />
                <span>Soluciones digitales a medida</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-tight">
                Transformamos tu{' '}
                <span className="bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                  presencia digital
                </span>
              </h1>

              <p className="text-xl text-muted-foreground">
                Creamos experiencias web excepcionales que destacan tu marca y conectan con tu
                audiencia.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-2">
                <CTAButton href="/contact">Comenzar proyecto</CTAButton>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/services" className="flex items-center gap-2">
                    Ver servicios
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>

              {/* Beneficios en formato tarjeta sutil */}
              <div className="grid grid-cols-2 gap-4 pt-4">
                <div className="p-4 rounded-lg bg-muted/30 border border-border/50 flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <PenTool className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Diseño personalizado</h3>
                    <p className="text-sm text-muted-foreground">Hecho a tu medida</p>
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-muted/30 border border-border/50 flex items-start gap-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <Smartphone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">Totalmente adaptable</h3>
                    <p className="text-sm text-muted-foreground">En cualquier dispositivo</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative w-full h-96 bg-gradient-to-br from-primary/5 to-primary/10 rounded-2xl overflow-hidden border border-border/50">
                {/* Placeholder para la imagen/ilustración */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Globe className="h-40 w-40 text-primary/30" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview - Mejorada */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-primary/5 text-primary text-sm font-medium mb-4">
              <Zap className="h-4 w-4" />
              <span>Nuestras soluciones</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">Servicios Profesionales</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Soluciones digitales personalizadas para hacer crecer tu negocio
            </p>
          </div>

          {/* Web Services */}
          <div className="space-y-16">
            <div className="bg-background rounded-2xl p-8 shadow-sm border border-border/50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Monitor className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Desarrollo Web</h3>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                  Creamos sitios web rápidos, seguros y optimizados para conversiones.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {webPlans.map(plan => (
                  <PlanCard
                    key={plan.id}
                    title={plan.title}
                    price={formatPrice(plan.price, plan.currency)}
                    popular={plan.popular}
                    features={plan.features}
                  />
                ))}
              </div>
            </div>

            {/* Social Media Services */}
            <div className="bg-background rounded-2xl p-8 shadow-sm border border-border/50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Smartphone className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold">Redes Sociales</h3>
                </div>
                <p className="text-muted-foreground max-w-2xl">
                  Gestionamos tu presencia en redes sociales con estrategias efectivas.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {socialPlans.map(plan => (
                  <PlanCard
                    key={plan.id}
                    title={plan.title}
                    price={formatPrice(plan.price, plan.currency)}
                    popular={plan.popular}
                    features={plan.features}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Beneficios adicionales */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Diseño Responsivo',
                description: 'Perfecto en todos los dispositivos',
                icon: <Smartphone className="h-6 w-6 text-primary" />,
              },
              {
                title: 'Rendimiento',
                description: 'Carga rápida y optimizada',
                icon: <Zap className="h-6 w-6 text-primary" />,
              },
              {
                title: 'Resultados',
                description: 'Enfoque en conversiones',
                icon: <BarChart className="h-6 w-6 text-primary" />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-background p-6 rounded-xl border border-border/50 flex items-start gap-4"
              >
                <div className="p-2 bg-primary/10 rounded-lg">{item.icon}</div>
                <div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Notas importantes */}
          <QuoteBox title="Información importante" className="mt-16">
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Hosting y dominio no incluidos por defecto (excepto en Tienda Online)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>
                  Los planes no incluyen mantenimiento continuo (disponible como servicio opcional)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Todos los servicios son adaptables a necesidades personalizadas</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                <span>Precios en pesos argentinos, sujetos a modificación</span>
              </li>
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
                <p className="text-sm text-muted-foreground">
                  Calidad profesional a precios justos y transparentes.
                </p>
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
            {testimonials.map(testimonial => (
              <Card key={testimonial.id} className="p-6 hover:shadow-lg transition-shadow relative">
                <CardContent className="p-0 space-y-4">
                  <Quote className="h-8 w-8 text-primary/20 absolute top-4 right-4" />
                  <div className="flex items-center space-x-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-muted-foreground italic">
                    "{testimonial.content}"
                  </blockquote>
                  <div className="flex items-center space-x-3 pt-4">
                    <Image
                      width={40}
                      height={40}
                      src={testimonial.avatar || '/placeholder-user.jpg'}
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
              Conversemos sobre tu proyecto y descubre cómo podemos ayudarte a alcanzar tus
              objetivos digitales.
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
            {technologies.map(tech => {
              const IconComponent = tech.icon
              return (
                <div
                  key={tech.id}
                  className="flex flex-col items-center p-4 bg-card rounded-lg hover:shadow-md transition-shadow h-full group"
                >
                  <div className="flex items-center justify-center h-14 w-14 mb-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <IconComponent className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-sm font-medium text-center mb-2">{tech.name}</h3>
                  <p className="text-xs text-muted-foreground text-center">{tech.description}</p>
                </div>
              )
            })}
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
