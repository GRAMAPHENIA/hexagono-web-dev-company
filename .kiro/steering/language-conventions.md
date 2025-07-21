---
inclusion: always
---

# Convenciones de Idioma - Hexágono Web

## Principio General
- **Contenido web**: Español (es-AR)
- **Código**: Inglés

## URLs y Rutas

### URLs Públicas (Español)
```
✅ Correcto:
/servicios
/contacto
/cotizacion
/testimonios
/acerca-de
/preguntas-frecuentes
/cotizacion/seguimiento/[token]

❌ Incorrecto:
/services
/contact
/quotes
/testimonials
/about
/faq
```

### URLs Administrativas y APIs (Inglés)
```
✅ Correcto:
/admin/quotes
/admin/users
/api/quotes
/api/pricing/calculate
/api/upload

❌ Incorrecto:
/admin/cotizaciones
/admin/usuarios
/api/cotizaciones
```

## Contenido de Usuario

### Textos de Interfaz (Español)
```typescript
// ✅ Correcto
const messages = {
  submitButton: "Enviar Cotización",
  loadingMessage: "Cargando...",
  errorMessage: "Ha ocurrido un error",
  successMessage: "Cotización enviada exitosamente"
}

// ❌ Incorrecto
const messages = {
  submitButton: "Submit Quote",
  loadingMessage: "Loading...",
  errorMessage: "An error occurred"
}
```

### Metadatos SEO (Español)
```typescript
// ✅ Correcto
export const metadata: Metadata = {
  title: 'Servicios de Desarrollo Web - Hexágono Web',
  description: 'Creamos sitios web profesionales y gestionamos tus redes sociales en Argentina.',
  keywords: ['desarrollo web', 'argentina', 'sitios web']
}

// ❌ Incorrecto
export const metadata: Metadata = {
  title: 'Web Development Services - Hexágono Web',
  description: 'We create professional websites...',
  keywords: ['web development', 'argentina', 'websites']
}
```

## Código y Desarrollo

### Variables y Funciones (Inglés)
```typescript
// ✅ Correcto
interface QuoteFormData {
  clientName: string
  serviceType: ServiceType
  estimatedPrice: number
}

function calculateQuotePrice(serviceType: string): number {
  // implementation
}

const isFormValid = validateQuoteForm(formData)

// ❌ Incorrecto
interface DatosCotizacion {
  nombreCliente: string
  tipoServicio: TipoServicio
  precioEstimado: number
}

function calcularPrecioCotizacion(tipoServicio: string): number {
  // implementation
}

const esFormularioValido = validarFormularioCotizacion(datos)
```

### Comentarios de Código (Inglés)
```typescript
// ✅ Correcto
/**
 * Calculates the estimated price for a quote based on service type and features
 * @param serviceType - The type of service requested
 * @param features - Array of additional features
 * @returns Estimated price in ARS
 */
function calculateEstimatedPrice(serviceType: ServiceType, features: string[]): number {
  // Base price calculation
  let basePrice = getBasePrice(serviceType)
  
  // Add feature costs
  const featureCosts = features.reduce((total, feature) => {
    return total + getFeatureCost(feature)
  }, 0)
  
  return basePrice + featureCosts
}

// ❌ Incorrecto
/**
 * Calcula el precio estimado para una cotización basado en el tipo de servicio
 * @param tipoServicio - El tipo de servicio solicitado
 * @returns Precio estimado en ARS
 */
function calcularPrecioEstimado(tipoServicio: TipoServicio): number {
  // Cálculo del precio base
  let precioBase = obtenerPrecioBase(tipoServicio)
  return precioBase
}
```

### Nombres de Archivos y Carpetas
```
✅ Correcto (código):
components/QuoteForm.tsx
lib/priceCalculator.ts
hooks/useQuoteForm.ts
types/QuoteTypes.ts

✅ Correcto (rutas públicas):
app/cotizacion/page.tsx
app/servicios/page.tsx
app/contacto/page.tsx

✅ Correcto (rutas admin/api):
app/admin/quotes/page.tsx
app/api/quotes/route.ts
```

## Base de Datos

### Nombres de Tablas y Columnas (Inglés)
```sql
-- ✅ Correcto
CREATE TABLE quotes (
  id UUID PRIMARY KEY,
  client_name VARCHAR(255),
  service_type VARCHAR(50),
  estimated_price DECIMAL(10,2),
  created_at TIMESTAMP
);

-- ❌ Incorrecto
CREATE TABLE cotizaciones (
  id UUID PRIMARY KEY,
  nombre_cliente VARCHAR(255),
  tipo_servicio VARCHAR(50),
  precio_estimado DECIMAL(10,2),
  fecha_creacion TIMESTAMP
);
```

## Mensajes de Error y Validación

### Mensajes al Usuario (Español)
```typescript
// ✅ Correcto
const validationMessages = {
  required: "Este campo es obligatorio",
  email: "Ingrese un email válido",
  phone: "Ingrese un teléfono válido",
  fileSize: "El archivo no debe superar los 10MB",
  fileType: "Tipo de archivo no permitido"
}

// ❌ Incorrecto
const validationMessages = {
  required: "This field is required",
  email: "Please enter a valid email",
  phone: "Please enter a valid phone"
}
```

### Logs y Debugging (Inglés)
```typescript
// ✅ Correcto
console.log('Quote created successfully:', quoteId)
console.error('Failed to send email notification:', error)
logger.info('Processing quote request', { quoteId, serviceType })

// ❌ Incorrecto
console.log('Cotización creada exitosamente:', quoteId)
console.error('Error al enviar notificación por email:', error)
```

## Configuración Regional

### Formato de Números y Fechas
```typescript
// ✅ Correcto - Formato argentino para mostrar al usuario
const priceFormatter = new Intl.NumberFormat('es-AR', {
  style: 'currency',
  currency: 'ARS'
})

const dateFormatter = new Intl.DateTimeFormat('es-AR', {
  year: 'numeric',
  month: 'long',
  day: 'numeric'
})

// Variables internas en inglés
const formattedPrice = priceFormatter.format(estimatedPrice)
const formattedDate = dateFormatter.format(createdAt)
```

## Excepciones y Casos Especiales

### Términos Técnicos Aceptados en Inglés
- Email (no "correo electrónico")
- Website/sitio web (ambos aceptables)
- Landing page (término técnico establecido)
- SEO (acrónimo técnico)
- API (acrónimo técnico)

### Nombres de Servicios (Español)
```typescript
// ✅ Correcto - nombres de servicios en español
const serviceTypes = {
  LANDING_PAGE: 'Landing Page',
  CORPORATE_WEB: 'Web Corporativa', 
  ECOMMERCE: 'Tienda Online',
  SOCIAL_MEDIA: 'Gestión de Redes Sociales'
}
```

## Herramientas de Validación

### ESLint Rules Sugeridas
```json
{
  "rules": {
    "prefer-english-comments": "error",
    "prefer-english-variables": "error",
    "spanish-user-messages": "warn"
  }
}
```

### Checklist de Revisión
- [ ] URLs públicas en español
- [ ] URLs admin/API en inglés  
- [ ] Variables y funciones en inglés
- [ ] Comentarios de código en inglés
- [ ] Mensajes de usuario en español
- [ ] Metadatos SEO en español
- [ ] Logs y debugging en inglés
- [ ] Schema de DB en inglés
- [ ] Formato de números/fechas argentino