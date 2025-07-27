import { db } from '@/lib/db'
import { env, checkExternalServices, isProductionReady } from '@/lib/config/env'
import { healthCheck } from '@/lib/database'

// Función para inicializar la aplicación
export async function initializeApp() {
  console.log('🚀 Inicializando aplicación Hexágono Web...')

  try {
    // 1. Verificar variables de entorno
    console.log('📋 Verificando configuración...')
    const services = checkExternalServices()
    
    console.log('✅ Variables de entorno validadas')
    console.log(`   - Base de datos: ${services.database ? '✅' : '❌'}`)
    console.log(`   - Email: ${services.email ? '✅' : '⚠️  (usando placeholder)'}`)
    console.log(`   - Almacenamiento: ${services.fileStorage ? '✅' : '⚠️  (usando placeholder)'}`)
    console.log(`   - Autenticación: ${services.auth ? '✅' : '⚠️  (usando placeholder)'}`)

    // 2. Verificar conexión a la base de datos
    console.log('🗄️  Verificando conexión a la base de datos...')
    let dbHealth
    let retries = 3
    
    while (retries > 0) {
      dbHealth = await healthCheck.checkConnection()
      
      if (dbHealth.status === 'healthy') {
        console.log('✅ Conexión a la base de datos exitosa')
        break
      } else {
        retries--
        if (retries > 0) {
          console.log(`⚠️  Reintentando conexión... (${retries} intentos restantes)`)
          await new Promise(resolve => setTimeout(resolve, 2000))
        } else {
          console.error('❌ Error de conexión a la base de datos:', dbHealth.error)
          console.log('💡 Sugerencias:')
          console.log('   - Verificar que el servidor de base de datos esté ejecutándose')
          console.log('   - Revisar la variable DATABASE_URL en .env')
          console.log('   - Ejecutar: pnpm run db:push')
          throw new Error('Database connection failed after retries')
        }
      }
    }

    // 3. Verificar esquema de la base de datos
    console.log('📊 Verificando esquema de la base de datos...')
    try {
      await db.quote.findFirst()
      console.log('✅ Esquema de base de datos verificado')
    } catch (error) {
      console.error('❌ Error en el esquema de la base de datos:', error)
      throw new Error('Database schema verification failed')
    }

    // 4. Obtener estadísticas de la base de datos
    console.log('📈 Obteniendo estadísticas...')
    const stats = await healthCheck.getStats()
    console.log(`   - Total de cotizaciones: ${stats.quotes.total}`)
    console.log(`   - Cotizaciones pendientes: ${stats.quotes.pending}`)
    console.log(`   - Cotizaciones completadas: ${stats.quotes.completed}`)

    // 5. Verificar si está listo para producción
    if (env.NODE_ENV === 'production') {
      console.log('🔍 Verificando configuración de producción...')
      const productionReady = isProductionReady()
      
      if (productionReady) {
        console.log('✅ Configuración de producción verificada')
      } else {
        console.warn('⚠️  Advertencia: Algunas configuraciones usan valores placeholder')
      }
    }

    console.log('🎉 Aplicación inicializada correctamente')
    return {
      success: true,
      services,
      dbHealth,
      stats,
      environment: env.NODE_ENV
    }

  } catch (error) {
    console.error('💥 Error durante la inicialización:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      environment: env.NODE_ENV
    }
  }
}

// Función para verificar dependencias críticas
export async function checkCriticalDependencies() {
  const checks = {
    prisma: false,
    zod: false,
    nextjs: false
  }

  try {
    // Verificar Prisma
    await import('@prisma/client')
    checks.prisma = true
  } catch (error) {
    console.error('❌ Prisma no está disponible:', error)
  }

  try {
    // Verificar Zod
    await import('zod')
    checks.zod = true
  } catch (error) {
    console.error('❌ Zod no está disponible:', error)
  }

  try {
    // Verificar Next.js
    await import('next')
    checks.nextjs = true
  } catch (error) {
    console.error('❌ Next.js no está disponible:', error)
  }

  return checks
}

// Función para crear datos de prueba en desarrollo
export async function seedDevelopmentData() {
  if (env.NODE_ENV !== 'development') {
    console.log('⚠️  Seed solo disponible en desarrollo')
    return
  }

  console.log('🌱 Creando datos de prueba...')

  try {
    // Verificar si ya existen datos
    const existingQuotes = await db.quote.count()
    
    if (existingQuotes > 0) {
      console.log(`ℹ️  Ya existen ${existingQuotes} cotizaciones en la base de datos`)
      return
    }

    // Crear cotización de ejemplo
    const sampleQuote = await db.quote.create({
      data: {
        quoteNumber: 'HEX-202501-0001',
        clientName: 'Juan Pérez',
        clientEmail: 'juan.perez@ejemplo.com',
        clientPhone: '+54 11 1234-5678',
        clientCompany: 'Empresa Ejemplo S.A.',
        serviceType: 'CORPORATE_WEB',
        description: 'Sitio web corporativo para empresa de servicios',
        timeline: '3-4 semanas',
        budgetRange: '$200.000 - $300.000',
        estimatedPrice: 250000,
        status: 'PENDING',
        priority: 'MEDIUM',
        accessToken: 'sample-access-token-123456789',
        features: {
          create: [
            {
              featureName: 'SEO Avanzado',
              featureCost: 45000
            },
            {
              featureName: 'Blog Integrado',
              featureCost: 35000
            }
          ]
        },
        notes: {
          create: [
            {
              author: 'Sistema',
              note: 'Cotización creada automáticamente para pruebas',
              isInternal: true
            }
          ]
        },
        statusHistory: {
          create: [
            {
              previousStatus: null,
              newStatus: 'PENDING',
              changedBy: 'Sistema',
              notes: 'Cotización inicial creada'
            }
          ]
        }
      }
    })

    console.log('✅ Datos de prueba creados exitosamente')
    console.log(`   - Cotización ID: ${sampleQuote.id}`)
    console.log(`   - Número: ${sampleQuote.quoteNumber}`)
    console.log(`   - Token de acceso: ${sampleQuote.accessToken}`)

  } catch (error) {
    console.error('❌ Error creando datos de prueba:', error)
  }
}

// Función para limpiar datos de desarrollo
export async function cleanDevelopmentData() {
  if (env.NODE_ENV !== 'development') {
    console.log('⚠️  Limpieza solo disponible en desarrollo')
    return
  }

  console.log('🧹 Limpiando datos de desarrollo...')

  try {
    // Eliminar en orden correcto debido a las relaciones
    await db.quoteStatusHistory.deleteMany()
    await db.quoteNote.deleteMany()
    await db.quoteAttachment.deleteMany()
    await db.quoteFeature.deleteMany()
    await db.quote.deleteMany()

    console.log('✅ Datos de desarrollo limpiados')

  } catch (error) {
    console.error('❌ Error limpiando datos:', error)
  }
}

// Función para mostrar información del sistema
export function showSystemInfo() {
  console.log('\n📋 Información del Sistema')
  console.log('========================')
  console.log(`Entorno: ${env.NODE_ENV}`)
  console.log(`URL de la aplicación: ${env.NEXT_PUBLIC_APP_URL}`)
  console.log(`Email de la empresa: ${env.COMPANY_EMAIL}`)
  console.log(`Teléfono: ${env.COMPANY_PHONE}`)
  console.log(`Base de datos: ${env.DATABASE_URL.includes('localhost') ? 'Local' : 'Remota'}`)
  console.log('========================\n')
}