import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CTAButton } from '@/components/ui/cta-button'
import { ArrowRight, Code, Globe, Sparkles } from 'lucide-react'
import Image from 'next/image'

type Project = {
  id: string
  title: string
  description: string
  tags: string[]
  image: string
  url: string
  github?: string
}

const projects: Project[] = [
  {
    id: 'ecommerce',
    title: 'Tienda Online de Moda',
    description:
      'Plataforma de comercio electrónico completa con pasarela de pago integrada y panel de administración.',
    tags: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Stripe'],
    image: '/placeholder-ecommerce.jpg',
    url: 'https://ejemplo-tienda.com',
    github: 'github.com/usuario/tienda-moderna',
  },
  {
    id: 'landing-page',
    title: 'Landing Page para Startup',
    description: 'Diseño moderno y conversor para el lanzamiento de una startup tecnológica.',
    tags: ['React', 'Framer Motion', 'Tailwind CSS'],
    image: '/placeholder-landing.jpg',
    url: 'https://ejemplo-startup.com',
  },
  {
    id: 'dashboard',
    title: 'Panel de Administración',
    description: 'Sistema de gestión con gráficos en tiempo real y múltiples roles de usuario.',
    tags: ['React', 'Node.js', 'MongoDB', 'GraphQL'],
    image: '/placeholder-dashboard.jpg',
    url: 'https://dashboard.ejemplo.com',
  },
]

export default function ProjectsPage() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium border border-border mb-8">
              <Sparkles className="h-4 w-4" />
              <span>Nuestro Trabajo</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Proyectos <span className="text-primary">Destacados</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              Descubre algunos de nuestros proyectos más recientes y cómo ayudamos a nuestros
              clientes a alcanzar sus objetivos digitales.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map(project => (
              <Card
                key={project.id}
                className="group overflow-hidden transition-all hover:shadow-lg"
              >
                <div className="relative aspect-video bg-muted/50 overflow-hidden">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-2xl">{project.title}</CardTitle>
                  <CardDescription className="mt-2">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-sm font-medium text-primary hover:underline"
                    >
                      Ver proyecto <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                    {project.github && (
                      <a
                        href={`https://${project.github}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors"
                        aria-label="Código fuente en GitHub"
                      >
                        <Code className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium border border-border">
              <Globe className="h-4 w-4" />
              <span>¿Tienes un proyecto en mente?</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold">Hagámoslo realidad juntos</h2>
            <p className="text-xl text-muted-foreground">
              Si tienes una idea o proyecto en el que necesites ayuda, no dudes en contactarnos.
              Estamos aquí para ayudarte a hacerlo realidad.
            </p>
            <div className="pt-4">
              <CTAButton href="/contact">Hablemos de tu proyecto</CTAButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
