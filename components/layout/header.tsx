'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ThemeToggle } from '@/components/theme-toggle'
import { Menu, Hexagon } from 'lucide-react'
import { cn } from '@/lib/utils'

// Definir el tipo para los items de navegación
interface NavItem {
  name: string
  href: string
}

// Definir el array de navegación con tipo
export const navigation: NavItem[] = [
  { name: 'Inicio', href: '/' },
  { name: 'Servicios', href: '/services' },
  { name: 'Proyectos', href: '/projects' },
  { name: 'Cotizaciones', href: '/cotizacion' },
  { name: 'Sobre Nosotros', href: '/about' },
]

interface MobileMenuProps {
  navigation: NavItem[]
  pathname: string
}

function MobileMenu({ navigation, pathname }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[280px]">
        <div className="mt-12 space-y-4">
          {navigation.map((item: NavItem) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                'block px-4 py-3 text-lg font-medium rounded-lg transition-colors',
                pathname === item.href
                  ? 'bg-accent/20 text-foreground'
                  : 'text-muted-foreground hover:bg-accent/10'
              )}
            >
              {item.name}
            </Link>
          ))}
          <Button className="w-full mt-4">Contacto</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

export function Header() {
  const pathname = usePathname()

  return (
    <header className="sticky top-4 z-50 mx-4 mt-4 rounded-lg border border-border/50 bg-background/60 backdrop-blur-xl shadow-sm transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group ml-1 flex items-center space-x-2">
            <Hexagon className="h-7 w-7 text-primary/90 transition-transform duration-300 group-hover:rotate-12" />
            <span className="text-lg font-semibold text-foreground/90">Hexágono</span>
          </Link>

          {/* Navegación con indicador */}
          <nav className="hidden h-full items-center md:flex">
            <div className="flex h-full items-center space-x-1 rounded-lg">
              {navigation.map((item: NavItem) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'group relative flex h-9 items-center px-4 text-sm font-medium transition-all duration-300',
                    'text-muted-foreground/90 hover:text-foreground/90',
                    pathname === item.href && 'text-foreground'
                  )}
                >
                  <span className="relative">
                    {item.name}
                    <span
                      className={cn(
                        'absolute -bottom-1 left-0 right-0 h-px',
                        'bg-[length:4px_1px] bg-repeat-x',
                        'bg-gradient-to-r from-transparent 50%, currentColor 50%, currentColor 100%',
                        'opacity-0 group-hover:opacity-40 transition-opacity duration-300',
                        pathname === item.href && 'opacity-40'
                      )}
                    />
                  </span>
                </Link>
              ))}
            </div>
          </nav>

          {/* Controles */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="sm"
              asChild
              className="hidden rounded-md border border-border/30 bg-background/30 px-4 text-sm font-medium text-foreground/90 hover:bg-accent/20 hover:text-foreground md:flex"
            >
              <Link href="/admin">Admin</Link>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="hidden rounded-md border border-border/30 bg-background/30 px-4 text-sm font-medium text-foreground/90 hover:bg-accent/20 hover:text-foreground md:flex"
            >
              Contacto
            </Button>
            <MobileMenu navigation={navigation} pathname={pathname} />
          </div>
        </div>
      </div>
    </header>
  )
}
