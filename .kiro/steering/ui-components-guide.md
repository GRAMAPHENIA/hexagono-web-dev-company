---
inclusion: fileMatch
fileMatchPattern: "components/**/*"
---

# Guía de Componentes UI - Hexágono Web

## Arquitectura de Componentes

### Estructura de Carpetas
```
components/
├── ui/           # Componentes base (Radix UI + Tailwind)
├── layout/       # Componentes de layout (Header, Footer)
└── features/     # Componentes específicos de funcionalidades
```

### Principios de Diseño
- **Composición sobre herencia**
- **Props tipadas con TypeScript**
- **Variantes con class-variance-authority**
- **Accesibilidad por defecto**
- **Responsive design mobile-first**

## Componentes Base (UI)

### Button Component
```typescript
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '@/lib/utils'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

export function Button({ className, variant, size, asChild = false, ...props }: ButtonProps) {
  const Comp = asChild ? Slot : 'button'
  return (
    <Comp
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}
```

### Card Component
```typescript
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border bg-card text-card-foreground shadow-sm',
        className
      )}
      {...props}
    />
  )
}

export function CardHeader({ className, ...props }: CardProps) {
  return (
    <div className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
  )
}

export function CardTitle({ className, ...props }: CardProps) {
  return (
    <h3
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        className
      )}
      {...props}
    />
  )
}

export function CardContent({ className, ...props }: CardProps) {
  return <div className={cn('p-6 pt-0', className)} {...props} />
}
```

## Componentes Específicos del Proyecto

### PlanCard Component
```typescript
interface PlanCardProps {
  title: string
  price: string
  popular?: boolean
  features: string[]
  className?: string
}

export function PlanCard({ 
  title, 
  price, 
  popular = false, 
  features, 
  className 
}: PlanCardProps) {
  return (
    <Card className={cn(
      'relative p-6 hover:shadow-lg transition-shadow',
      popular && 'border-primary ring-2 ring-primary/20',
      className
    )}>
      {popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
            Más Popular
          </span>
        </div>
      )}
      
      <CardHeader className="text-center">
        <CardTitle className="text-xl">{title}</CardTitle>
        <div className="text-3xl font-bold text-primary">{price}</div>
      </CardHeader>
      
      <CardContent>
        <ul className="space-y-3">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center">
              <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
              <span className="text-sm">{feature}</span>
            </li>
          ))}
        </ul>
        
        <Button className="w-full mt-6" variant={popular ? 'default' : 'outline'}>
          Elegir Plan
        </Button>
      </CardContent>
    </Card>
  )
}
```

### CTAButton Component
```typescript
interface CTAButtonProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
}

export function CTAButton({ 
  href, 
  children, 
  variant = 'primary', 
  className,
  ...props 
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        'inline-flex items-center justify-center rounded-md font-medium transition-all duration-200',
        'px-6 py-3 text-base',
        variant === 'primary' && [
          'bg-primary text-primary-foreground',
          'hover:bg-primary/90 hover:scale-105',
          'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2'
        ],
        variant === 'secondary' && [
          'bg-secondary text-secondary-foreground border border-secondary',
          'hover:bg-secondary/80 hover:scale-105',
          'focus:outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-2'
        ],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  )
}
```

## Patrones de Composición

### Compound Components
```typescript
// Componente principal
export function Testimonial({ children, className }: TestimonialProps) {
  return (
    <Card className={cn('p-6', className)}>
      {children}
    </Card>
  )
}

// Sub-componentes
Testimonial.Quote = function TestimonialQuote({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="text-muted-foreground italic mb-4">
      "{children}"
    </blockquote>
  )
}

Testimonial.Author = function TestimonialAuthor({ 
  name, 
  role, 
  company, 
  avatar 
}: AuthorProps) {
  return (
    <div className="flex items-center space-x-3">
      <img src={avatar} alt={name} className="w-12 h-12 rounded-full" />
      <div>
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-muted-foreground">{role} - {company}</div>
      </div>
    </div>
  )
}

// Uso
<Testimonial>
  <Testimonial.Quote>
    Excelente servicio y atención personalizada.
  </Testimonial.Quote>
  <Testimonial.Author
    name="María González"
    role="CEO"
    company="Tech Solutions"
    avatar="/avatar.jpg"
  />
</Testimonial>
```

### Render Props Pattern
```typescript
interface DataFetcherProps<T> {
  url: string
  children: (data: T | null, loading: boolean, error: string | null) => React.ReactNode
}

export function DataFetcher<T>({ url, children }: DataFetcherProps<T>) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchData()
  }, [url])

  const fetchData = async () => {
    try {
      setLoading(true)
      const response = await fetch(url)
      const result = await response.json()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }

  return <>{children(data, loading, error)}</>
}

// Uso
<DataFetcher<Service[]> url="/api/services">
  {(services, loading, error) => {
    if (loading) return <ServicesSkeleton />
    if (error) return <ErrorMessage error={error} />
    return <ServicesList services={services} />
  }}
</DataFetcher>
```

## Hooks Personalizados

### useLocalStorage
```typescript
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === 'undefined') return initialValue
    
    try {
      const item = window.localStorage.getItem(key)
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error)
      return initialValue
    }
  })

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value
      setStoredValue(valueToStore)
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error)
    }
  }

  return [storedValue, setValue] as const
}
```

### useDebounce
```typescript
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}
```

## Animaciones y Transiciones

### Framer Motion Integration
```typescript
import { motion } from 'framer-motion'

export function AnimatedCard({ children, ...props }: CardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card {...props}>
        {children}
      </Card>
    </motion.div>
  )
}
```

### CSS Transitions
```css
/* globals.css */
.transition-smooth {
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.hover-lift:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
}
```

## Accesibilidad

### ARIA Labels y Roles
```typescript
export function ServiceCard({ service }: { service: Service }) {
  return (
    <Card 
      role="article"
      aria-labelledby={`service-${service.id}-title`}
      className="hover:shadow-lg transition-shadow"
    >
      <CardHeader>
        <CardTitle id={`service-${service.id}-title`}>
          {service.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p aria-describedby={`service-${service.id}-description`}>
          {service.description}
        </p>
        <Button 
          aria-label={`Más información sobre ${service.title}`}
          className="mt-4"
        >
          Más Info
        </Button>
      </CardContent>
    </Card>
  )
}
```

### Focus Management
```typescript
export function Modal({ isOpen, onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus()
    }
  }, [isOpen])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose()
    }
  }

  return (
    <div
      ref={modalRef}
      role="dialog"
      aria-modal="true"
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center"
    >
      {children}
    </div>
  )
}
```