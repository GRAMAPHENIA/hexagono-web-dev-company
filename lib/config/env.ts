import { z } from 'zod'

// Schema de validación para variables de entorno
const envSchema = z.object({
  // Database
  DATABASE_URL: z.string().url('DATABASE_URL debe ser una URL válida'),
  
  // Application
  NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),
  NEXT_PUBLIC_APP_URL: z.string().url('NEXT_PUBLIC_APP_URL debe ser una URL válida'),
  
  // Authentication
  NEXTAUTH_SECRET: z.string().min(32, 'NEXTAUTH_SECRET debe tener al menos 32 caracteres'),
  NEXTAUTH_URL: z.string().url('NEXTAUTH_URL debe ser una URL válida'),
  
  // Email
  RESEND_API_KEY: z.string().startsWith('re_', 'RESEND_API_KEY debe empezar con "re_"'),
  ADMIN_EMAIL: z.string().email('ADMIN_EMAIL debe ser un email válido'),
  COMPANY_EMAIL: z.string().email('COMPANY_EMAIL debe ser un email válido'),
  
  // Company info
  COMPANY_PHONE: z.string().min(10, 'COMPANY_PHONE debe tener al menos 10 caracteres'),
  COMPANY_WHATSAPP: z.string().min(10, 'COMPANY_WHATSAPP debe tener al menos 10 caracteres'),
  
  // File storage
  BLOB_READ_WRITE_TOKEN: z.string().optional(),
  
  // Site configuration
  NEXT_PUBLIC_SITE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SITE_NAME: z.string().optional(),
  
  // Optional development settings
  DEBUG: z.string().transform(val => val === 'true').optional(),
  LOG_LEVEL: z.enum(['error', 'warn', 'info', 'debug']).default('info'),
})

// Función para validar y obtener variables de entorno
function getEnvVars() {
  try {
    return envSchema.parse(process.env)
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
      throw new Error(`Variables de entorno inválidas:\n${missingVars.join('\n')}`)
    }
    throw error
  }
}

// Exportar variables validadas
export const env = getEnvVars()

// Función para verificar si estamos en desarrollo
export const isDevelopment = env.NODE_ENV === 'development'
export const isProduction = env.NODE_ENV === 'production'
export const isStaging = env.NODE_ENV === 'staging'

// Función para verificar configuración de servicios externos
export function checkExternalServices() {
  const services = {
    database: !!env.DATABASE_URL,
    email: !!env.RESEND_API_KEY && env.RESEND_API_KEY !== 're_your_api_key_here',
    fileStorage: !!env.BLOB_READ_WRITE_TOKEN && env.BLOB_READ_WRITE_TOKEN !== 'vercel_blob_your_token_here',
    auth: !!env.NEXTAUTH_SECRET && env.NEXTAUTH_SECRET !== 'your_nextauth_secret_here'
  }

  return services
}

// Función para obtener configuración de logging
export function getLogConfig() {
  return {
    level: env.LOG_LEVEL,
    debug: env.DEBUG || isDevelopment,
    timestamp: true,
    colorize: isDevelopment
  }
}

// Función para obtener URLs de la aplicación
export function getAppUrls() {
  const baseUrl = env.NEXT_PUBLIC_APP_URL
  
  return {
    base: baseUrl,
    api: `${baseUrl}/api`,
    admin: `${baseUrl}/admin`,
    quote: {
      create: `${baseUrl}/cotizacion`,
      track: `${baseUrl}/cotizacion/seguimiento`,
      admin: `${baseUrl}/admin/cotizaciones`
    }
  }
}

// Función para obtener configuración de la empresa
export function getCompanyConfig() {
  return {
    name: env.NEXT_PUBLIC_SITE_NAME || 'Hexágono Web',
    email: env.COMPANY_EMAIL,
    phone: env.COMPANY_PHONE,
    whatsapp: env.COMPANY_WHATSAPP,
    adminEmail: env.ADMIN_EMAIL
  }
}

// Función para verificar si todas las configuraciones están listas para producción
export function isProductionReady() {
  if (!isProduction) return true

  const requiredForProduction = [
    env.DATABASE_URL,
    env.NEXTAUTH_SECRET,
    env.RESEND_API_KEY,
    env.ADMIN_EMAIL,
    env.COMPANY_EMAIL
  ]

  const placeholderValues = [
    'your_nextauth_secret_here',
    're_your_api_key_here',
    'vercel_blob_your_token_here'
  ]

  return requiredForProduction.every(value => 
    value && !placeholderValues.some(placeholder => value.includes(placeholder))
  )
}

// Función para obtener configuración de rate limiting
export function getRateLimitConfig() {
  return {
    quotes: {
      windowMs: 15 * 60 * 1000, // 15 minutos
      max: isDevelopment ? 100 : 5 // más permisivo en desarrollo
    },
    api: {
      windowMs: 60 * 1000, // 1 minuto
      max: isDevelopment ? 1000 : 100
    }
  }
}