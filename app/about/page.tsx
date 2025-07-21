import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CTAButton } from "@/components/ui/cta-button"
import { Target, Eye, Heart, Code, Lightbulb, Shield, Award } from "lucide-react"

const team = [
  {
    name: "Alejandro Martín",
    role: "Fundador & CEO",
    image: "/placeholder.svg?height=300&width=300",
    description: "Desarrollador full-stack con más de 6 años de experiencia en proyectos digitales.",
  },
  {
    name: "Sofía González",
    role: "Diseñadora UX/UI",
    image: "/placeholder.svg?height=300&width=300",
    description: "Especialista en experiencia de usuario y diseño visual para web y redes sociales.",
  },
  {
    name: "Matías López",
    role: "Social Media Manager",
    image: "/placeholder.svg?height=300&width=300",
    description: "Experto en estrategias de redes sociales y marketing digital para PyMEs.",
  },
]

const values = [
  {
    icon: Shield,
    title: "Transparencia",
    description: "Precios claros, procesos transparentes y comunicación honesta en cada proyecto.",
  },
  {
    icon: Award,
    title: "Calidad",
    description: "Nos comprometemos con la excelencia en cada línea de código y cada diseño que creamos.",
  },
  {
    icon: Lightbulb,
    title: "Innovación",
    description: "Utilizamos las últimas tecnologías para crear soluciones modernas y efectivas.",
  },
  {
    icon: Heart,
    title: "Compromiso",
    description: "Tu éxito es nuestro éxito. Trabajamos como parte de tu equipo para alcanzar tus objetivos.",
  },
]

export default function AboutPage() {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <Badge variant="secondary" className="text-sm">
              Sobre Hexágono
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold tracking-tight">
              Transformamos ideas en <span className="text-primary">realidad digital</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Somos un equipo apasionado de desarrolladores y diseñadores comprometidos con hacer crecer tu negocio a
              través de soluciones digitales efectivas y accesibles.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl sm:text-4xl font-bold">Nuestra Historia</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Hexágono nació en 2022 con una misión clara: democratizar el acceso a soluciones digitales de calidad
                  para pequeñas y medianas empresas en Argentina.
                </p>
                <p>
                  Comenzamos como un proyecto personal, ayudando a emprendedores locales a establecer su presencia
                  online. Rápidamente nos dimos cuenta de que existía una gran necesidad de servicios digitales
                  profesionales a precios justos.
                </p>
                <p>
                  Hoy, después de más de 30 proyectos exitosos, nos hemos consolidado como una agencia confiable que
                  combina calidad profesional con precios accesibles y atención personalizada.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=400&width=600"
                alt="Equipo Hexágono trabajando"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission, Vision, Values */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Mission */}
            <Card className="p-8 text-center">
              <CardContent className="p-0 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Target className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Misión</h3>
                <p className="text-muted-foreground">
                  Ayudar a PyMEs y emprendedores a crecer digitalmente con soluciones web profesionales y gestión
                  estratégica de redes sociales a precios accesibles.
                </p>
              </CardContent>
            </Card>

            {/* Vision */}
            <Card className="p-8 text-center">
              <CardContent className="p-0 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Eye className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Visión</h3>
                <p className="text-muted-foreground">
                  Ser la agencia digital de referencia para pequeñas y medianas empresas, reconocida por nuestra
                  calidad, transparencia y resultados tangibles.
                </p>
              </CardContent>
            </Card>

            {/* Values Preview */}
            <Card className="p-8 text-center">
              <CardContent className="p-0 space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Valores</h3>
                <p className="text-muted-foreground">
                  Transparencia, calidad, innovación y compromiso guían cada decisión que tomamos y cada proyecto que
                  desarrollamos.
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
            <h2 className="text-3xl sm:text-4xl font-bold">Nuestros Valores</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Los principios que definen nuestra forma de trabajar y relacionarnos con nuestros clientes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="p-0 space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
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
            <h2 className="text-3xl sm:text-4xl font-bold">Nuestro Equipo</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Profesionales apasionados comprometidos con tu éxito digital
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="overflow-hidden hover:shadow-lg transition-shadow">
                <img src={member.image || "/placeholder.svg"} alt={member.name} className="w-full h-64 object-cover" />
                <CardContent className="p-6 space-y-2">
                  <h3 className="text-lg font-semibold">{member.name}</h3>
                  <p className="text-primary font-medium">{member.role}</p>
                  <p className="text-sm text-muted-foreground">{member.description}</p>
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
            <h2 className="text-3xl sm:text-4xl font-bold">Números que nos Respaldan</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Nuestro compromiso con la excelencia se refleja en estos resultados
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">30+</div>
              <div className="text-sm text-muted-foreground">Proyectos Completados</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">100%</div>
              <div className="text-sm text-muted-foreground">Clientes Satisfechos</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">2+</div>
              <div className="text-sm text-muted-foreground">Años de Experiencia</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold text-primary">24h</div>
              <div className="text-sm text-muted-foreground">Tiempo de Respuesta</div>
            </div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold">Tecnologías que Utilizamos</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Trabajamos con las herramientas más modernas y confiables del mercado
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {["React", "Next.js", "Typescript", "Tailwind", "Ilustrator", "Photoshop"].map((tech, index) => (
              <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                <CardContent className="p-0 space-y-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto">
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <div className="font-medium">{tech}</div>
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
            <h2 className="text-3xl sm:text-4xl font-bold">¿Quieres conocer más sobre nosotros?</h2>
            <p className="text-xl opacity-90">
              Conversemos sobre tu proyecto y descubre cómo podemos ayudarte a alcanzar tus objetivos digitales con
              soluciones profesionales y precios accesibles.
            </p>
            <CTAButton href="/contact">Conversemos sobre tu Proyecto</CTAButton>
          </div>
        </div>
      </section>
    </div>
  )
}
