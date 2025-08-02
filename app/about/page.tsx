import { Card, CardContent } from '@/components/ui/card'
import { CTAButton } from '@/components/ui/cta-button'
import {
  Target,
  Eye,
  Heart,
  Lightbulb,
  Shield,
  Award,
  Sparkles,
  Users,
  BarChart2,
} from 'lucide-react'
import Image from 'next/image'

const team = [
  {
    name: 'Alejandro Martín',
    role: 'Fundador & CEO',
    image: '/placeholder-team-1.jpg',
    description:
      'Desarrollador full-stack con más de 6 años de experiencia en proyectos digitales.',
  },
  {
    name: 'Sofía González',
    role: 'Diseñadora UX/UI',
    image: '/placeholder-team-2.jpg',
    description:
      'Especialista en experiencia de usuario y diseño visual para web y redes sociales.',
  },
  {
    name: 'Matías López',
    role: 'Social Media Manager',
    image: '/placeholder-team-3.jpg',
    description: 'Experto en estrategias de redes sociales y marketing digital para PyMEs.',
  },
]

const values = [
  {
    icon: Shield,
    title: 'Transparencia',
    description: 'Precios claros, procesos transparentes y comunicación honesta en cada proyecto.',
  },
  {
    icon: Award,
    title: 'Calidad',
    description:
      'Nos comprometemos con la excelencia en cada línea de código y cada diseño que creamos.',
  },
  {
    icon: Lightbulb,
    title: 'Innovación',
    description: 'Utilizamos las últimas tecnologías para crear soluciones modernas y efectivas.',
  },
  {
    icon: Heart,
    title: 'Compromiso',
    description:
      'Tu éxito es nuestro éxito. Trabajamos como parte de tu equipo para alcanzar tus objetivos.',
  },
]

export default function AboutPage() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium border border-border mb-8">
              <Sparkles className="h-4 w-4" />
              <span>Conócenos Mejor</span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Transformamos ideas en <span className="text-primary">realidad digital</span>
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mb-8">
              Somos un equipo apasionado de desarrolladores y diseñadores comprometidos con hacer
              crecer tu negocio a través de soluciones digitales efectivas y accesibles.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium border border-border w-fit">
                <Users className="h-4 w-4" />
                <span>Nuestra Historia</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-bold">De la idea a la realidad digital</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Hexágono nació en 2022 con una misión clara: democratizar el acceso a soluciones
                  digitales de calidad para pequeñas y medianas empresas en Argentina.
                </p>
                <p>
                  Comenzamos como un proyecto personal, ayudando a emprendedores locales a
                  establecer su presencia online. Rápidamente nos dimos cuenta de que existía una
                  gran necesidad de servicios digitales profesionales a precios justos.
                </p>
                <p>
                  Hoy, después de más de 30 proyectos exitosos, nos hemos consolidado como una
                  agencia confiable que combina calidad profesional con precios accesibles y
                  atención personalizada.
                </p>
              </div>
            </div>
            <div className="relative aspect-video rounded-xl overflow-hidden bg-muted/50">
              <Image
                src="/placeholder-about.jpg"
                alt="Equipo Hexágono trabajando"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Mission */}
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Misión</h3>
                <p className="text-muted-foreground">
                  Ayudar a PyMEs y emprendedores a crecer digitalmente con soluciones web
                  profesionales y gestión estratégica de redes sociales a precios accesibles.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Visión</h3>
                <p className="text-muted-foreground">
                  Ser la agencia digital de referencia para pequeñas y medianas empresas, reconocida
                  por nuestra calidad, transparencia y resultados tangibles.
                </p>
              </CardContent>
            </Card>

            {/* Values Preview */}
            <Card className="p-8 text-center hover:shadow-lg transition-shadow">
              <CardContent className="p-0 space-y-6">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Valores</h3>
                <p className="text-muted-foreground">
                  Transparencia, calidad, innovación y compromiso guían cada decisión que tomamos y
                  cada proyecto que desarrollamos.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Values Detail */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium border border-border">
              <Award className="h-4 w-4" />
              <span>Nuestros Valores</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold">Lo que nos define</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Los principios que definen nuestra forma de trabajar y relacionarnos con nuestros
              clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow group">
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <value.icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{value.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium border border-border">
              <Users className="h-4 w-4" />
              <span>Nuestro Equipo</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold">Conoce al equipo</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Profesionales apasionados comprometidos con tu éxito digital
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow group">
                <div className="relative aspect-square">
                  <Image src={member.image} alt={member.name} fill className="object-cover" />
                </div>
                <CardContent className="p-6 space-y-2">
                  <h3 className="text-xl font-semibold">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="text-muted-foreground">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 text-primary text-sm font-medium border border-border">
              <BarChart2 className="h-4 w-4" />
              <span>Nuestros Números</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-bold">Impacto que generamos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nuestro compromiso con la excelencia se refleja en estos resultados
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2 p-6 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="text-4xl font-bold text-primary">30+</div>
              <div className="text-muted-foreground">Proyectos Completados</div>
            </div>
            <div className="text-center space-y-2 p-6 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="text-muted-foreground">Clientes Satisfechos</div>
            </div>
            <div className="text-center space-y-2 p-6 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="text-4xl font-bold text-primary">2+</div>
              <div className="text-muted-foreground">Años de Experiencia</div>
            </div>
            <div className="text-center space-y-2 p-6 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="text-4xl font-bold text-primary">24h</div>
              <div className="text-muted-foreground">Tiempo de Respuesta</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h2 className="text-3xl sm:text-4xl font-bold">¿Listo para comenzar tu proyecto?</h2>
            <p className="text-xl opacity-90">
              Conversemos sobre cómo podemos ayudarte a alcanzar tus objetivos digitales con
              soluciones profesionales y precios accesibles.
            </p>
            <CTAButton href="/contact" variant="secondary">
              Conversemos sobre tu Proyecto
            </CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
