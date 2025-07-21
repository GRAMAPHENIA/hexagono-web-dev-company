# Estándares de Codificación - Hexágono Web

## Principios Generales
- **Código limpio y legible**: Priorizar claridad sobre brevedad
- **TypeScript obligatorio**: Todo el código debe estar tipado
- **Componentes reutilizables**: Evitar duplicación de código
- **Performance first**: Optimizar desde el desarrollo
- **Accesibilidad**: Seguir estándares WCAG 2.1

## Convenciones de Nomenclatura

### Archivos y Carpetas
- **Componentes**: PascalCase (`UserProfile.tsx`)
- **Páginas**: kebab-case (`about-us/page.tsx`)
- **Utilidades**: camelCase (`formatPrice.ts`)
- **Hooks**: camelCase con prefijo `use` (`useLocalStorage.ts`)
- **Types**: PascalCase (`UserData.ts`)

### Variables y Funciones
- **Variables**: camelCase (`userName`, `isLoading`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`)
- **Funciones**: camelCase (`handleSubmit`, `formatCurrency`)
- **Componentes**: PascalCase (`UserCard`, `PriceDisplay`)

## Estructura de Componentes

### Orden de Elementos
1. Imports (externos primero, luego internos)
2. Types/Interfaces
3. Componente principal
4. Componentes auxiliares (si los hay)
5. Export default

### Ejemplo de Componente
```typescript
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'

interface PriceCardProps {
  title: string
  price: number
  currency: string
  features: string[]
  popular?: boolean
}

export function PriceCard({ 
  title, 
  price, 
  currency, 
  features, 
  popular = false 
}: PriceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  
  return (
    <div className={`card ${popular ? 'border-primary' : ''}`}>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="text-2xl">{formatPrice(price, currency)}</p>
      {/* Resto del componente */}
    </div>
  )
}
```

## Manejo de Estados
- **useState**: Para estado local simple
- **useReducer**: Para estado complejo con múltiples acciones
- **Context**: Solo para estado global necesario
- **Server State**: Usar React Query o SWR cuando sea necesario

## Styling con Tailwind

### Clases Preferidas
- **Spacing**: Usar escala de Tailwind (`p-4`, `m-2`, `gap-6`)
- **Colors**: Usar variables CSS personalizadas
- **Responsive**: Mobile-first (`sm:`, `md:`, `lg:`)
- **Dark Mode**: Usar prefijo `dark:` para tema oscuro

### Componentes Reutilizables
```typescript
// Usar class-variance-authority para variantes
import { cva } from 'class-variance-authority'

const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md font-medium',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground',
        outline: 'border border-input bg-background',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 px-3',
        lg: 'h-11 px-8',
      },
    },
  }
)
```

## Manejo de Errores
- **Error Boundaries**: Para errores de React
- **Try-catch**: Para operaciones asíncronas
- **Validación**: Usar Zod para validación de datos
- **Feedback**: Mostrar mensajes claros al usuario

## Performance

### Optimizaciones Obligatorias
- **Lazy Loading**: Para componentes pesados
- **Image Optimization**: Usar Next.js Image
- **Bundle Splitting**: Importaciones dinámicas
- **Memoization**: React.memo para componentes costosos

### Ejemplo de Lazy Loading
```typescript
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

export function App() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <HeavyComponent />
    </Suspense>
  )
}
```

## Testing

### Estructura de Tests
- **Unit Tests**: Para funciones puras y hooks
- **Component Tests**: Para componentes individuales
- **Integration Tests**: Para flujos completos
- **E2E Tests**: Para funcionalidades críticas

### Ejemplo de Test
```typescript
import { render, screen } from '@testing-library/react'
import { PriceCard } from './PriceCard'

describe('PriceCard', () => {
  it('should display price correctly', () => {
    render(
      <PriceCard 
        title="Plan Básico"
        price={100000}
        currency="ARS"
        features={['Feature 1']}
      />
    )
    
    expect(screen.getByText('$100.000')).toBeInTheDocument()
  })
})
```

## Accesibilidad

### Requisitos Mínimos
- **Semantic HTML**: Usar elementos semánticos
- **ARIA Labels**: Para elementos interactivos
- **Keyboard Navigation**: Navegación completa por teclado
- **Color Contrast**: Mínimo 4.5:1 para texto normal
- **Focus Indicators**: Visibles y claros

## Comentarios y Documentación
- **JSDoc**: Para funciones y componentes públicos
- **Comentarios inline**: Solo cuando el código no es auto-explicativo
- **README**: Actualizar con cambios importantes
- **Changelog**: Documentar cambios significativos

## Git y Versionado

### Commits
- **Conventional Commits**: `feat:`, `fix:`, `docs:`, etc.
- **Mensajes claros**: Describir qué y por qué
- **Commits pequeños**: Una funcionalidad por commit

### Branches
- **main**: Código de producción
- **develop**: Desarrollo activo
- **feature/**: Nuevas funcionalidades
- **fix/**: Correcciones de bugs
- **hotfix/**: Correcciones urgentes