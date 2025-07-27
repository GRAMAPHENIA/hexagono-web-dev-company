import { AppConfig } from '@/lib/types/quote'

// Configuración principal de la aplicación
export const appConfig: AppConfig = {
  company: {
    name: process.env.NEXT_PUBLIC_SITE_NAME || 'Hexágono Web',
    email: process.env.COMPANY_EMAIL || 'contacto@hexagono.xyz',
    phone: process.env.COMPANY_PHONE || '+54 11 2378-2307',
    whatsapp: process.env.COMPANY_WHATSAPP || '5491123782307'
  },
  pricing: {
    currency: 'ARS',
    taxRate: 0.21 // IVA 21%
  },
  features: {
    emailNotifications: true,
    fileUploads: true,
    quoteTracking: true
  }
}

// URLs de la aplicación
export const appUrls = {
  base: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  quote: {
    create: '/cotizacion',
    track: '/cotizacion/seguimiento',
    admin: '/admin/cotizaciones'
  },
  api: {
    quotes: '/api/quotes',
    upload: '/api/upload',
    pricing: '/api/pricing'
  }
}

// Configuración de archivos
export const fileConfig = {
  maxSize: 10 * 1024 * 1024, // 10MB
  allowedTypes: [
    'image/jpeg',
    'image/png',
    'image/webp',
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
  ],
  allowedExtensions: ['.jpg', '.jpeg', '.png', '.webp', '.pdf', '.doc', '.docx']
}

// Configuración de paginación
export const paginationConfig = {
  defaultLimit: 10,
  maxLimit: 100,
  defaultPage: 1
}

// Configuración de email
export const emailConfig = {
  from: process.env.COMPANY_EMAIL || 'contacto@hexagono.xyz',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@hexagono.xyz',
  templates: {
    newQuote: 'nueva-cotizacion',
    quoteUpdate: 'actualizacion-cotizacion',
    quoteCompleted: 'cotizacion-completada'
  }
}

// Configuración de tokens de acceso
export const tokenConfig = {
  length: 32,
  expirationDays: 30
}

// Configuración de validación
export const validationConfig = {
  clientName: {
    minLength: 2,
    maxLength: 255
  },
  clientEmail: {
    maxLength: 255
  },
  clientPhone: {
    pattern: /^\+?[1-9]\d{1,14}$/
  },
  description: {
    maxLength: 2000
  },
  timeline: {
    maxLength: 100
  },
  budgetRange: {
    maxLength: 100
  },
  note: {
    maxLength: 2000
  },
  featureName: {
    maxLength: 255
  }
}

// Configuración de caché
export const cacheConfig = {
  quotes: {
    ttl: 5 * 60, // 5 minutos
    key: 'quotes'
  },
  stats: {
    ttl: 15 * 60, // 15 minutos
    key: 'quote-stats'
  }
}

// Configuración de rate limiting
export const rateLimitConfig = {
  quotes: {
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 5 // máximo 5 cotizaciones por IP cada 15 minutos
  },
  api: {
    windowMs: 60 * 1000, // 1 minuto
    max: 100 // máximo 100 requests por IP por minuto
  }
}