import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { ArrowRight, HelpCircle, Clock, CreditCard, Code, Smartphone, Shield } from "lucide-react"

const faqCategories = [
  {
    title: "General",
    icon: HelpCircle,
    questions: [
      {
        question: "¿Qué tipo de proyectos desarrollan?",
        answer:
          "Desarrollamos una amplia gama de soluciones digitales: landing pages, sitios web corporativos, tiendas online (e-commerce), aplicaciones web personalizadas, y servicios de rediseño y migración. Nos especializamos en crear experiencias digitales que impulsen el crecimiento de tu negocio.",
      },
      {
        question: "¿Trabajan con empresas de todos los tamaños?",
        answer:
          "Sí, trabajamos con empresas de todos los tamaños, desde startups y pequeños negocios hasta corporaciones establecidas. Adaptamos nuestros servicios y enfoques según las necesidades específicas y el presupuesto de cada cliente.",
      },
      {
        question: "¿En qué se diferencia DevCraft de otras agencias?",
        answer:
          "Nos diferenciamos por nuestro enfoque en resultados medibles, uso de tecnologías modernas, transparencia total en el proceso, y soporte continuo post-lanzamiento. Además, cada proyecto incluye optimización SEO, diseño responsivo y código limpio y escalable.",
      },
    ],
  },
  {
    title: "Proceso y Tiempos",
    icon: Clock,
    questions: [
      {
        question: "¿Cuánto tiempo toma desarrollar un proyecto?",
        answer:
          "Los tiempos varían según la complejidad: Landing pages (1-2 semanas), sitios corporativos (3-4 semanas), e-commerce (4-6 semanas), y aplicaciones web personalizadas (6-12 semanas). Siempre proporcionamos un cronograma detallado antes de comenzar.",
      },
      {
        question: "¿Cómo es el proceso de desarrollo?",
        answer:
          "Nuestro proceso consta de 4 etapas: 1) Análisis y estrategia, 2) Diseño y prototipado, 3) Desarrollo e implementación, 4) Testing, lanzamiento y soporte. Mantenemos comunicación constante y entregas parciales para tu aprobación.",
      },
      {
        question: "¿Puedo hacer cambios durante el desarrollo?",
        answer:
          "Sí, entendemos que los proyectos pueden evolucionar. Incluimos hasta 3 rondas de revisiones en cada etapa. Cambios adicionales se manejan de forma transparente con cotización previa y ajuste de cronograma si es necesario.",
      },
    ],
  },
  {
    title: "Precios y Pagos",
    icon: CreditCard,
    questions: [
      {
        question: "¿Cómo funcionan sus precios?",
        answer:
          "Ofrecemos precios fijos por proyecto basados en alcance definido, y también modalidad por horas para proyectos más complejos. Todos nuestros presupuestos incluyen: diseño, desarrollo, optimización SEO básica, responsive design, y 30 días de soporte post-lanzamiento.",
      },
      {
        question: "¿Qué formas de pago aceptan?",
        answer:
          "Aceptamos transferencias bancarias, tarjetas de crédito/débito, y PayPal. El pago se estructura típicamente en: 50% al inicio del proyecto, 30% en la entrega del diseño aprobado, y 20% al finalizar el proyecto.",
      },
      {
        question: "¿Ofrecen planes de mantenimiento?",
        answer:
          "Sí, ofrecemos planes de mantenimiento mensual que incluyen: actualizaciones de seguridad, backups automáticos, monitoreo de rendimiento, soporte técnico prioritario, y hasta 2 horas de modificaciones menores por mes.",
      },
    ],
  },
  {
    title: "Tecnología",
    icon: Code,
    questions: [
      {
        question: "¿Qué tecnologías utilizan?",
        answer:
          "Utilizamos tecnologías modernas y probadas: React, Next.js, TypeScript para frontend; Node.js, Python para backend; bases de datos como MongoDB, PostgreSQL; y servicios cloud como Vercel, AWS. Siempre elegimos la mejor tecnología para cada proyecto específico.",
      },
      {
        question: "¿Los sitios web son responsivos?",
        answer:
          "Absolutamente. Todos nuestros desarrollos son 100% responsivos y mobile-first. Probamos exhaustivamente en diferentes dispositivos y navegadores para garantizar una experiencia perfecta en móviles, tablets y desktop.",
      },
      {
        question: "¿Incluyen optimización SEO?",
        answer:
          "Sí, todos nuestros proyectos incluyen optimización SEO técnica básica: estructura semántica, meta tags, sitemap XML, velocidad de carga optimizada, y configuración de Google Analytics. Para SEO avanzado ofrecemos servicios especializados adicionales.",
      },
    ],
  },
  {
    title: "Soporte y Mantenimiento",
    icon: Shield,
    questions: [
      {
        question: "¿Qué incluye el soporte post-lanzamiento?",
        answer:
          "Incluimos 30 días de soporte gratuito que cubre: corrección de bugs, ajustes menores, capacitación básica, y resolución de dudas técnicas. Después ofrecemos planes de mantenimiento mensual para soporte continuo.",
      },
      {
        question: "¿Qué pasa si mi sitio web tiene problemas?",
        answer:
          "Ofrecemos soporte técnico rápido y eficiente. Para clientes con plan de mantenimiento: respuesta en menos de 4 horas para problemas críticos. Para otros clientes: soporte bajo modalidad de horas de consultoría con respuesta en 24-48 horas.",
      },
      {
        question: "¿Puedo actualizar el contenido yo mismo?",
        answer:
          "Sí, desarrollamos sitios con paneles de administración intuitivos (CMS) que te permiten actualizar contenido fácilmente. Incluimos capacitación y documentación para que puedas gestionar tu sitio de forma independiente.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="text-sm">
              Preguntas Frecuentes
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
              Resolvemos todas tus <span className="text-primary">dudas</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Encuentra respuestas a las preguntas más comunes sobre nuestros servicios, procesos y tecnologías. Si no
              encuentras lo que buscas, contáctanos directamente.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="space-y-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold">{category.title}</h2>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem
                      key={faqIndex}
                      value={`${categoryIndex}-${faqIndex}`}
                      className="border rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-left hover:no-underline py-6">
                        <span className="font-medium">{faq.question}</span>
                      </AccordionTrigger>
                      <AccordionContent className="pb-6 text-muted-foreground">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Help Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">¿Necesitas Ayuda Rápida?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Recursos adicionales para resolver tus dudas al instante
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <HelpCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Centro de Ayuda</h3>
                <p className="text-muted-foreground text-sm">
                  Documentación completa, tutoriales y guías paso a paso para sacar el máximo provecho de tu sitio web.
                </p>
                <Button variant="outline" size="sm">
                  Explorar Recursos
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Soporte Directo</h3>
                <p className="text-muted-foreground text-sm">
                  Contacta directamente con nuestro equipo técnico para resolver dudas específicas sobre tu proyecto.
                </p>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/contact">Contactar Soporte</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="p-6 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Consulta Gratuita</h3>
                <p className="text-muted-foreground text-sm">
                  Agenda una llamada de 30 minutos para discutir tu proyecto y recibir asesoramiento personalizado.
                </p>
                <Button variant="outline" size="sm">
                  Agendar Llamada
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="p-12 text-center bg-gradient-to-r from-primary/5 to-primary/10">
            <CardContent className="p-0 space-y-6">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                <HelpCircle className="h-10 w-10 text-primary" />
              </div>
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold">¿Aún tienes preguntas?</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  No encontraste la respuesta que buscabas? Nuestro equipo está aquí para ayudarte. Contáctanos y te
                  responderemos en menos de 24 horas.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/contact">
                    Hacer una Pregunta
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline">
                  Llamar: +34 900 123 456
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
