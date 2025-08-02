'use client'

import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { QuoteBox } from '@/components/ui/quote-box'
import Link from 'next/link'
import {
  ArrowRight,
  Globe,
  Users,
  Zap,
  Shield,
  Star,
  Code,
  Sparkles,
  PenTool,
  Smartphone,
  Monitor,
  BarChart,
  CheckCircle,
  Rocket,
  RefreshCw,
  TrendingUp,
} from 'lucide-react'
import { webPlans, socialPlans, formatPrice } from '@/lib/pricing'
import { getFeaturedTestimonials } from '@/lib/testimonials'
import { getTechnologies } from '@/lib/technologies'
import { MessageCircle, ChevronLeft, ChevronRight, User, Quote } from 'lucide-react'
import { useRef, useState, useEffect } from 'react'

const testimonials = getFeaturedTestimonials()
const technologies = getTechnologies()

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const sliderRef = useRef<HTMLDivElement>(null)
  const [isHovered, setIsHovered] = useState(false)

  const nextSlide = () => {
    setCurrentSlide(prev => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide(prev => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  // Auto-avance cada 5 segundos
  useEffect(() => {
    if (!isHovered) {
      const timer = setTimeout(() => {
        nextSlide()
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [currentSlide, isHovered])

  // Efecto para manejar el scroll suave al cambiar de slide
  useEffect(() => {
    if (sliderRef.current) {
      const container = sliderRef.current
      const card = container.querySelector(`[data-slide="${currentSlide}"]`) as HTMLElement
      if (card) {
        container.scrollTo({
          left: card.offsetLeft - (container.offsetWidth - card.offsetWidth) / 2,
          behavior: 'smooth',
        })
      }
    }
  }, [currentSlide])

  return (
    <div className="space-y-20">
      {/* Hero Section - Versión Mejorada */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            {/* Contenido principal con superposición */}
            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium border border-border mb-8">
                <Sparkles className="h-4 w-4" />
                <span>Innovación Digital</span>
              </div>

              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
                Transformamos
                <span className="text-primary block">tu visión</span>
                en realidad digital
              </h1>

              <p className="text-lg text-muted-foreground max-w-lg mb-8">
                Soluciones web personalizadas que impulsan el crecimiento de tu negocio en la era
                digital.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="px-8" asChild>
                  <Link href="/contact">Iniciar Proyecto</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/services" className="flex items-center gap-2 group">
                    Ver servicios
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>

            {/* Elemento decorativo que rompe la cuadrícula */}
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-[600px] h-[500px] bg-gradient-to-br from-primary/5 to-primary/10 rounded-tl-[100px] rounded-br-[100px] -rotate-12 opacity-80 hidden lg:block">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center p-8 max-w-xs">
                  <Code className="h-12 w-12 mx-auto text-primary mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Tecnología de Vanguardia</h3>
                  <p className="text-sm text-muted-foreground">
                    Soluciones innovadoras para desafíos modernos
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Tarjetas flotantes */}
          <div className="mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-20">
            {[
              {
                title: 'Diseño',
                description: 'Interfaces intuitivas y atractivas',
                icon: <PenTool className="h-6 w-6" />,
                className: 'lg:-translate-y-10',
              },
              {
                title: 'Desarrollo',
                description: 'Código limpio y mantenible',
                icon: <Code className="h-6 w-6" />,
                className: 'lg:translate-y-10',
              },
              {
                title: 'Rendimiento',
                description: 'Carga ultrarrápida',
                icon: <Zap className="h-6 w-6" />,
                className: 'lg:-translate-y-10',
              },
              {
                title: 'Soporte',
                description: 'Asistencia continua',
                icon: <Shield className="h-6 w-6" />,
                className: 'lg:translate-y-10',
              },
            ].map((item, index) => (
              <div
                key={index}
                className={`bg-background border border-border/50 rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ${item.className}`}
              >
                <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview - Mejorada */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium border border-border mb-4">
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
                  <Card key={plan.id} className="p-6">
                    <CardContent>
                      <h3 className="text-xl font-bold">{plan.title}</h3>
                      <p className="text-3xl font-bold my-4">{formatPrice(plan.price)}</p>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full">Contratar</Button>
                    </CardContent>
                  </Card>
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
                  <Card key={plan.id} className="p-6">
                    <CardContent>
                      <h3 className="text-xl font-bold">{plan.title}</h3>
                      <p className="text-3xl font-bold my-4">{formatPrice(plan.price)}</p>
                      <ul className="space-y-2 mb-6">
                        {plan.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-500" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button className="w-full">Contratar</Button>
                    </CardContent>
                  </Card>
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
          <QuoteBox>
            <div className="text-lg font-semibold mb-2">Información importante</div>
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
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium border border-border mb-4">
              <Star className="h-4 w-4" />
              <span>Nuestra ventaja</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">
              ¿Por qué elegir
              <span className="block text-primary">Hexágono?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Combinamos experiencia, tecnología y atención personalizada para ofrecerte las mejores
              soluciones digitales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: 'Entrega Rápida',
                description: 'Proyectos completados en tiempo récord sin comprometer la calidad.',
                icon: <Zap className="h-6 w-6 text-primary" />,
              },
              {
                title: 'Soporte Real',
                description: 'Atención personalizada y soporte técnico cuando lo necesites.',
                icon: <Shield className="h-6 w-6 text-primary" />,
              },
              {
                title: 'Precios Accesibles',
                description: 'Calidad profesional a precios justos y transparentes.',
                icon: <Users className="h-6 w-6 text-primary" />,
              },
              {
                title: 'Diseño Moderno',
                description: 'Sitios web actuales, responsivos y optimizados para conversión.',
                icon: <Globe className="h-6 w-6 text-primary" />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="group relative bg-background/80 dark:bg-background/95 rounded-2xl p-6 border border-border/30 hover:shadow-lg transition-all duration-300 h-full"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-12 transition-transform">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-12">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium border border-border mb-8">
              <MessageCircle className="h-4 w-4" />
              <span>Testimonios</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">Lo que dicen nuestros clientes</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Historias de éxito de empresas que confiaron en nosotros
            </p>
          </div>

          <div className="relative max-w-6xl mx-auto">
            {/* Contenedor de testimonios */}
            <div
              ref={sliderRef}
              className="flex gap-8 pb-8 overflow-x-hidden scroll-smooth snap-x snap-mandatory px-4"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  data-slide={index}
                  className="w-full flex-shrink-0 transition-opacity duration-300 px-4"
                >
                  <div className="h-full bg-background border border-border/50 rounded-xl p-8 flex flex-col hover:shadow-md transition-all max-w-2xl mx-auto">
                    <div className="mb-6 text-primary/80">
                      <Quote className="h-7 w-7 opacity-20" />
                    </div>

                    <blockquote className="text-lg text-foreground/90 leading-relaxed mb-8 flex-grow">
                      "{testimonial.content}"
                    </blockquote>

                    <div className="mt-auto pt-6 border-t border-border/30">
                      <div className="flex items-center gap-4">
                        <div className="relative h-12 w-12 flex-shrink-0">
                          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-200 to-gray-300">
                            <div className="absolute inset-0 flex items-center justify-center text-gray-500">
                              <User className="h-6 w-6" />
                            </div>
                          </div>
                        </div>
                        <div className="min-w-0">
                          <div className="font-medium text-base">{testimonial.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {testimonial.role} • {testimonial.company}
                          </div>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3.5 w-3.5 ${
                                  i < testimonial.rating
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Controles de navegación */}
            <div className="flex justify-center gap-3 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide
                      ? 'w-8 bg-primary'
                      : 'w-3 bg-primary/20 hover:bg-primary/40'
                  }`}
                  aria-label={`Ir al testimonio ${index + 1}`}
                />
              ))}
            </div>

            {/* Flechas de navegación */}
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 z-20 h-12 w-12 flex items-center justify-center rounded-full bg-background border border-border/50 shadow-sm hover:bg-muted/50 transition-all hover:scale-110 active:scale-95"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft className="h-5 w-5 text-foreground/70" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 z-20 h-12 w-12 flex items-center justify-center rounded-full bg-background border border-border/50 shadow-sm hover:bg-muted/50 transition-all hover:scale-110 active:scale-95"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight className="h-5 w-5 text-foreground/70" />
            </button>
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

      {/* Technologies & Innovation */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium border border-border mb-4">
              <Code className="h-4 w-4" />
              <span>Tecnologías que utilizamos</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">Nuestro Stack Tecnológico</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Utilizamos las mejores herramientas para ofrecerte soluciones de alta calidad y
              avanzadas del mercado.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => {
              const IconComponent = tech.icon
              const isEven = index % 2 === 0
              return (
                <div
                  key={tech.id}
                  className={`group relative p-0.5 rounded-2xl bg-gradient-to-br ${
                    isEven
                      ? 'from-primary/5 via-background to-background dark:from-primary/10 dark:via-background dark:to-muted/5'
                      : 'from-secondary/5 via-background to-background dark:from-secondary/10 dark:via-background dark:to-primary/5'
                  } hover:shadow-lg transition-all duration-300 border border-border/30 dark:border-border/20`}
                >
                  <div className="bg-background/80 dark:bg-background/95 rounded-2xl p-6 h-full">
                    <div className="flex items-start gap-5">
                      <div className="flex-shrink-0 h-14 w-14 rounded-xl bg-primary/10 dark:bg-primary/20 flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2 text-foreground">{tech.name}</h3>
                        <p className="text-muted-foreground/90 dark:text-muted-foreground mb-4">
                          {tech.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {tech.tools?.map((tool, i) => (
                            <span
                              key={i}
                              className="inline-flex items-center px-3 py-1 text-xs font-medium rounded-full bg-muted text-muted-foreground hover:bg-muted/80 transition-colors"
                            >
                              {tool}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Continuous Innovation */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium border border-border mb-4">
              <Rocket className="h-4 w-4" />
              <span>Innovación continua</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">Innovación Continua</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nuestro stack evoluciona constantemente para ofrecerte las soluciones más avanzadas
              del mercado
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                title: 'Actualizaciones Constantes',
                description:
                  'Mantenemos nuestras herramientas y tecnologías siempre actualizadas para ofrecerte lo último en desarrollo web.',
                icon: <RefreshCw className="h-6 w-6 text-primary" />,
              },
              {
                title: 'Rendimiento Óptimo',
                description:
                  'Implementamos las últimas técnicas de optimización para garantizar el máximo rendimiento de tus proyectos.',
                icon: <Zap className="h-6 w-6 text-primary" />,
              },
              {
                title: 'Seguridad Avanzada',
                description:
                  'Aplicamos los estándares más altos de seguridad para proteger tus datos y los de tus clientes.',
                icon: <Shield className="h-6 w-6 text-primary" />,
              },
              {
                title: 'Escalabilidad',
                description:
                  'Diseñamos soluciones que crecen contigo, asegurando que tu negocio pueda expandirse sin límites.',
                icon: <TrendingUp className="h-6 w-6 text-primary" />,
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-background rounded-xl p-6 border border-border/30 hover:shadow-md transition-all duration-300 h-full"
              >
                <div className="w-12 h-12 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.description}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Button size="lg" asChild>
              <Link href="/contact" className="group">
                Conoce más sobre nuestra metodología
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
