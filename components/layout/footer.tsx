import Link from "next/link"
import { Hexagon, Mail, Phone, MapPin, Instagram, Facebook, Twitter, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-muted/50 border-t">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Hexagon className="h-6 w-6 text-primary" />
              <span className="text-lg font-bold">Hexágono</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Creamos sitios web profesionales y gestionamos tus redes sociales con diseño de calidad y precios
              accesibles.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Servicios</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Landing Pages
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Sitios Corporativos
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Tiendas Online
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary transition-colors">
                  Gestión de Redes
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Empresa</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contacto
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Términos de Servicio
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-primary transition-colors">
                  Política de Privacidad
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold">Contacto</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span>hola@hexagono.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span>+54 11 1234-5678</span>
              </li>
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span>Buenos Aires, Argentina</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2024 Hexágono. Todos los derechos reservados.</p>
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Política de Privacidad
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
              Términos de Servicio
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
