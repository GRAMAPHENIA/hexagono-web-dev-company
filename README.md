# Hexágono Web - Sitio Corporativo

Sitio web corporativo de Hexágono Web, empresa especializada en desarrollo web y gestión de redes sociales en Argentina.

## 🚀 Características

- **Sitio Web Moderno**: Desarrollado con Next.js 15 y React 19
- **Diseño Responsivo**: Optimizado para todos los dispositivos
- **SEO Optimizado**: Metadatos completos y sitemap automático
- **Tema Oscuro/Claro**: Soporte completo para ambos temas
- **Componentes Reutilizables**: UI construida con Radix UI y Tailwind CSS
- **TypeScript**: Código tipado para mayor robustez
- **Testing**: Configurado con Jest y Testing Library

## 🛠️ Stack Tecnológico

### Frontend
- **Next.js 15** - Framework React con App Router
- **React 19** - Biblioteca de UI
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Framework de CSS utility-first
- **Radix UI** - Componentes accesibles y sin estilos

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **Prettier** - Formateo de código
- **Jest** - Testing framework
- **Testing Library** - Utilidades de testing para React

### Deployment
- **Vercel** - Plataforma de deployment (recomendado)
- **Next.js Static Export** - Generación de sitio estático

## 📁 Estructura del Proyecto

```
├── app/                    # App Router de Next.js
│   ├── about/             # Página "Acerca de"
│   ├── contact/           # Página de contacto
│   ├── faq/               # Preguntas frecuentes
│   ├── services/          # Página de servicios
│   ├── testimonials/      # Testimonios de clientes
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página de inicio
├── components/            # Componentes reutilizables
│   ├── layout/           # Componentes de layout (header, footer)
│   └── ui/               # Componentes de UI base
├── lib/                  # Utilidades y configuraciones
│   ├── pricing.ts        # Configuración de planes y precios
│   ├── site-config.ts    # Configuración del sitio
│   ├── testimonials.ts   # Datos de testimonios
│   └── technologies.ts   # Tecnologías utilizadas
├── hooks/                # Custom hooks de React
├── styles/               # Estilos globales
└── __tests__/            # Tests unitarios
```

## 🚦 Comandos Disponibles

```bash
# Desarrollo
npm run dev          # Inicia el servidor de desarrollo
npm run build        # Construye la aplicación para producción
npm run start        # Inicia el servidor de producción
npm run lint         # Ejecuta ESLint
npm run lint:report  # Reporte de linting sin auto-fix

# Testing
npm run test         # Ejecuta los tests
npm run test:watch   # Ejecuta tests en modo watch
npm run test:coverage # Ejecuta tests con reporte de cobertura

# Utilidades
npm run type-check   # Verifica tipos de TypeScript
```

## 🔧 Configuración de Desarrollo

### Variables de Entorno

Crea un archivo `.env.local` con las siguientes variables:

```env
# Configuración del sitio
NEXT_PUBLIC_SITE_NAME="Hexágono Web"
NEXT_PUBLIC_SITE_URL="https://hexagono.xyz"

# Información de contacto
NEXT_PUBLIC_CONTACT_EMAIL="contacto@hexagono.xyz"
NEXT_PUBLIC_CONTACT_PHONE="+54 11 2378-2307"
NEXT_PUBLIC_WHATSAPP_NUMBER="5491123782307"

# Redes sociales
NEXT_PUBLIC_TWITTER_HANDLE="@hexagonoweb"
NEXT_PUBLIC_FACEBOOK_PAGE="hexagonoweb"
NEXT_PUBLIC_INSTAGRAM_HANDLE="hexagonoweb"

# SEO
NEXT_PUBLIC_GOOGLE_VERIFICATION="tu-codigo-de-verificacion"
NEXT_PUBLIC_YANDEX_VERIFICATION="tu-codigo-de-verificacion"
```

### Instalación

```bash
# Instalar dependencias
npm install

# Iniciar desarrollo
npm run dev
```

## 📋 Servicios Ofrecidos

### Desarrollo Web
- **Landing Page** ($170.000 ARS) - Página única optimizada para conversión
- **Web Corporativa** ($250.000 ARS) - Sitio web completo hasta 5 secciones
- **Tienda Online** ($370.000 ARS) - E-commerce con carrito y medios de pago

### Gestión de Redes Sociales
- **Plan Inicial** ($85.000 ARS) - 2 posts mensuales, 1 red social
- **Plan Activo** ($180.000 ARS) - 10 posts mensuales, 2 redes sociales
- **Plan Premium** ($310.000 ARS) - Posts ilimitados, todas las redes

## 🧪 Testing

El proyecto incluye configuración completa de testing:

```bash
# Ejecutar todos los tests
npm run test

# Tests en modo watch
npm run test:watch

# Cobertura de código
npm run test:coverage
```

## 📱 Responsive Design

El sitio está optimizado para:
- **Desktop** (1024px+)
- **Tablet** (768px - 1023px)
- **Mobile** (320px - 767px)

## 🎨 Personalización de Tema

El sitio soporta tema claro y oscuro usando `next-themes`. Los colores se pueden personalizar en:
- `tailwind.config.ts` - Configuración de colores
- `app/globals.css` - Variables CSS personalizadas

## 📈 SEO y Performance

- **Metadatos completos** para cada página
- **Open Graph** y **Twitter Cards**
- **Sitemap automático** generado por Next.js
- **Robots.txt** configurado
- **Imágenes optimizadas** con Next.js Image
- **Lazy loading** implementado

## 🚀 Deployment

### Vercel (Recomendado)
1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push

### Otros Proveedores
```bash
# Build para producción
npm run build

# Los archivos estáticos estarán en .next/
```

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agrega nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto es propiedad de Hexágono Web. Todos los derechos reservados.

## 📞 Contacto

- **Email**: contacto@hexagono.xyz
- **Teléfono**: +54 11 2378-2307
- **WhatsApp**: +54 9 11 2378-2307
- **Sitio Web**: https://hexagono.xyz

---

Desarrollado con ❤️ por el equipo de Hexágono Web