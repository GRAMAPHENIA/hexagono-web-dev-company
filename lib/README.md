# Sistema de Cotizaciones - Hexágono Web

## Descripción
Sistema completo de gestión de cotizaciones para servicios web desarrollado con Next.js 15, TypeScript, Prisma y PostgreSQL.

## Estructura del Proyecto

### Base de Datos (`/lib/database.ts`)
- Operaciones CRUD para cotizaciones
- Gestión de características, archivos adjuntos y notas
- Historial de cambios de estado
- Funciones de estadísticas y salud de la BD

### Validaciones (`/lib/validations/`)
- **quote.ts**: Schemas de Zod para validación de datos
- Validación de información del cliente
- Validación de detalles del proyecto
- Validación de archivos subidos

### Tipos (`/lib/types/`)
- **quote.ts**: Definiciones de tipos TypeScript
- Tipos extendidos con relaciones
- Constantes para servicios y estados
- Interfaces para respuestas de API

### Configuración (`/lib/config/`)
- **app.ts**: Configuración general de la aplicación
- **env.ts**: Validación de variables de entorno
- Configuración de servicios externos

### Utilidades (`/lib/utils/`)
- **api.ts**: Manejo de errores y respuestas de API
- **format.ts**: Formateo de datos (precios, fechas, etc.)
- **pricing.ts**: Cálculo de precios y características

### Scripts (`/lib/scripts/`)
- **setup.ts**: Configuración inicial del proyecto
- **seed.ts**: Datos de prueba para desarrollo
- **check-config.ts**: Verificación de configuración

## Servicios Disponibles

### Desarrollo Web
1. **Landing Page** - $170.000 ARS
2. **Web Corporativa** - $250.000 ARS
3. **Tienda Online** - $370.000 ARS

### Gestión de Redes Sociales
1. **Plan Inicial** - $85.000 ARS
2. **Plan Activo** - $180.000 ARS
3. **Plan Premium** - $310.000 ARS

## Características Adicionales

### Comunes
- SEO Avanzado: $45.000
- Google Analytics: $15.000
- Chat Online: $25.000
- Formularios Avanzados: $20.000
- Sitio Multiidioma: $80.000
- Certificado SSL: $12.000

### Específicas por Servicio
- **Landing Page**: Popup promocional, contador regresivo
- **Web Corporativa**: Blog, galería, testimonios, página de equipo
- **E-commerce**: Pasarela de pagos, inventario, cupones, wishlist
- **Redes Sociales**: Contenido premium, stories, campañas publicitarias

## Comandos Disponibles

### Base de Datos
```bash
pnpm db:generate    # Generar cliente de Prisma
pnpm db:push        # Sincronizar esquema
pnpm db:migrate     # Crear migración
pnpm db:reset       # Resetear base de datos
pnpm db:studio      # Abrir Prisma Studio
pnpm db:seed        # Crear datos de prueba
```

### Configuración
```bash
pnpm setup          # Configuración inicial
pnpm check-config   # Verificar configuración
```

### Desarrollo
```bash
pnpm dev            # Servidor de desarrollo
pnpm build          # Construir para producción
pnpm test           # Ejecutar tests
pnpm lint           # Linter
```

## Variables de Entorno Requeridas

### Base de Datos
- `DATABASE_URL`: URL de conexión a PostgreSQL

### Aplicación
- `NEXT_PUBLIC_APP_URL`: URL base de la aplicación
- `NEXTAUTH_SECRET`: Secreto para autenticación
- `NEXTAUTH_URL`: URL para NextAuth

### Email
- `RESEND_API_KEY`: API key de Resend
- `ADMIN_EMAIL`: Email del administrador
- `COMPANY_EMAIL`: Email de la empresa

### Empresa
- `COMPANY_PHONE`: Teléfono de contacto
- `COMPANY_WHATSAPP`: WhatsApp de contacto

### Almacenamiento (Opcional)
- `BLOB_READ_WRITE_TOKEN`: Token de Vercel Blob

## Flujo de Cotización

1. **Cliente solicita cotización** → Estado: `PENDING`
2. **Admin revisa solicitud** → Estado: `IN_REVIEW`
3. **Se genera presupuesto** → Estado: `QUOTED`
4. **Cliente acepta/rechaza** → Estado: `COMPLETED` / `CANCELLED`

## Estados de Cotización
- `PENDING`: Pendiente de revisión
- `IN_REVIEW`: En proceso de revisión
- `QUOTED`: Cotización enviada al cliente
- `COMPLETED`: Proyecto completado
- `CANCELLED`: Cotización cancelada

## Prioridades
- `LOW`: Baja prioridad
- `MEDIUM`: Prioridad media (por defecto)
- `HIGH`: Alta prioridad

## Funcionalidades Principales

### Para Clientes
- Formulario de solicitud de cotización
- Seguimiento de estado con token de acceso
- Subida de archivos adjuntos
- Visualización de características incluidas

### Para Administradores
- Dashboard de gestión de cotizaciones
- Filtros por estado, prioridad, tipo de servicio
- Historial de cambios de estado
- Notas internas y públicas
- Cálculo automático de precios
- Estadísticas y reportes

## Seguridad
- Validación de datos con Zod
- Tokens de acceso seguros para seguimiento
- Sanitización de inputs
- Rate limiting en APIs
- Manejo seguro de archivos

## Testing
- Tests unitarios para utilidades
- Tests de componentes con Testing Library
- Tests de integración para APIs
- Cobertura de código con Jest

## Deployment
- Optimizado para Vercel
- Soporte para PostgreSQL en producción
- Variables de entorno validadas
- Build optimizado con Next.js 15

## Contribución
1. Seguir estándares de código definidos
2. Escribir tests para nuevas funcionalidades
3. Validar con TypeScript y ESLint
4. Documentar cambios importantes