---
inclusion: fileMatch
fileMatchPattern: "app/**/*"
---

# Mejores Prácticas Next.js 15 - Hexágono Web

## App Router (Next.js 15)

### Estructura de Rutas
- Usar App Router exclusivamente
- Archivos especiales: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`
- Grupos de rutas con paréntesis: `(marketing)/about/page.tsx`
- Rutas dinámicas: `[slug]/page.tsx`, `[...slug]/page.tsx`

### Layouts y Templates
```typescript
// app/layout.tsx - Layout raíz
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

// app/(marketing)/layout.tsx - Layout anidado
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="marketing-layout">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
```

## Metadatos y SEO

### Metadatos Estáticos
```typescript
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Título de la Página',
  description: 'Descripción optimizada para SEO',
  keywords: ['desarrollo web', 'argentina', 'hexágono'],
  openGraph: {
    title: 'Título para redes sociales',
    description: 'Descripción para redes sociales',
    images: ['/og-image.jpg'],
  },
}
```

### Metadatos Dinámicos
```typescript
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const service = await getService(params.slug)
  
  return {
    title: `${service.title} | Hexágono Web`,
    description: service.description,
    openGraph: {
      title: service.title,
      description: service.description,
      images: [service.image],
    },
  }
}
```

## Server Components vs Client Components

### Server Components (por defecto)
- Usar para contenido estático
- Acceso directo a bases de datos
- Mejor performance inicial
- No pueden usar hooks de React

```typescript
// Server Component
export default async function ServicesPage() {
  const services = await getServices() // Llamada directa a DB
  
  return (
    <div>
      {services.map(service => (
        <ServiceCard key={service.id} service={service} />
      ))}
    </div>
  )
}
```

### Client Components
- Usar solo cuando sea necesario
- Interactividad, hooks, event listeners
- Marcar con 'use client'

```typescript
'use client'

import { useState } from 'react'

export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const handleSubmit = async (e: FormEvent) => {
    // Lógica del formulario
  }
  
  return <form onSubmit={handleSubmit}>...</form>
}
```

## Data Fetching

### Server Actions
```typescript
// app/actions.ts
'use server'

export async function createContact(formData: FormData) {
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  
  // Validación con Zod
  const result = contactSchema.safeParse({ name, email })
  if (!result.success) {
    return { error: 'Datos inválidos' }
  }
  
  // Guardar en base de datos
  await saveContact(result.data)
  return { success: true }
}
```

### Uso en Componentes
```typescript
import { createContact } from './actions'

export function ContactForm() {
  return (
    <form action={createContact}>
      <input name="name" required />
      <input name="email" type="email" required />
      <button type="submit">Enviar</button>
    </form>
  )
}
```

## Optimización de Imágenes

### Next.js Image Component
```typescript
import Image from 'next/image'

export function ServiceCard({ service }: { service: Service }) {
  return (
    <div>
      <Image
        src={service.image}
        alt={service.title}
        width={400}
        height={300}
        priority={service.featured} // Para imágenes above-the-fold
        placeholder="blur"
        blurDataURL="data:image/jpeg;base64,..."
      />
    </div>
  )
}
```

## Streaming y Suspense

### Loading UI
```typescript
// app/services/loading.tsx
export default function Loading() {
  return (
    <div className="space-y-4">
      <div className="h-8 bg-gray-200 rounded animate-pulse" />
      <div className="h-4 bg-gray-200 rounded animate-pulse" />
    </div>
  )
}
```

### Suspense Boundaries
```typescript
import { Suspense } from 'react'

export default function ServicesPage() {
  return (
    <div>
      <h1>Nuestros Servicios</h1>
      <Suspense fallback={<ServicesSkeleton />}>
        <ServicesList />
      </Suspense>
    </div>
  )
}
```

## Error Handling

### Error Boundaries
```typescript
// app/error.tsx
'use client'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="error-container">
      <h2>Algo salió mal</h2>
      <button onClick={reset}>Intentar de nuevo</button>
    </div>
  )
}
```

### Not Found
```typescript
// app/not-found.tsx
export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold">404</h1>
      <p>Página no encontrada</p>
      <Link href="/">Volver al inicio</Link>
    </div>
  )
}
```

## Configuración de Next.js

### next.config.mjs
```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    typedRoutes: true, // Rutas tipadas
  },
  images: {
    domains: ['example.com'],
    formats: ['image/webp', 'image/avif'],
  },
  async redirects() {
    return [
      {
        source: '/old-page',
        destination: '/new-page',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
```

## Performance

### Bundle Analyzer
```bash
npm install @next/bundle-analyzer
```

### Lazy Loading
```typescript
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Cargando...</p>,
  ssr: false, // Solo client-side si es necesario
})
```

### Memoización
```typescript
import { memo } from 'react'

export const ServiceCard = memo(function ServiceCard({ service }: Props) {
  return <div>...</div>
})
```

## Middleware

### middleware.ts
```typescript
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Redirecciones, autenticación, etc.
  if (request.nextUrl.pathname.startsWith('/admin')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/admin/:path*']
}
```

## Internacionalización (i18n)

### Configuración básica
```typescript
// next.config.mjs
const nextConfig = {
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },
}
```

## Testing con Next.js

### Jest Configuration
```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
}

module.exports = createJestConfig(customJestConfig)
```