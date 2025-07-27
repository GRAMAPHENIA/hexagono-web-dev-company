#!/usr/bin/env tsx

import { db } from '@/lib/db'
import { env } from '@/lib/config/env'
import { utils } from '@/lib/database'

async function main() {
  if (env.NODE_ENV !== 'development') {
    console.log('⚠️  El seed solo está disponible en entorno de desarrollo')
    process.exit(1)
  }

  console.log('🌱 Creando datos de prueba para el sistema de cotizaciones...\n')

  try {
    // Limpiar datos existentes
    console.log('🧹 Limpiando datos existentes...')
    await db.quoteStatusHistory.deleteMany()
    await db.quoteNote.deleteMany()
    await db.quoteAttachment.deleteMany()
    await db.quoteFeature.deleteMany()
    await db.quote.deleteMany()
    console.log('✅ Datos limpiados')

    // Crear cotizaciones de ejemplo
    console.log('\n📝 Creando cotizaciones de ejemplo...')

    const quotes = [
      {
        clientName: 'María González',
        clientEmail: 'maria.gonzalez@empresa.com',
        clientPhone: '+54 11 2345-6789',
        clientCompany: 'Innovación Digital S.A.',
        serviceType: 'CORPORATE_WEB',
        description: 'Sitio web corporativo moderno con blog integrado y panel de administración',
        timeline: '4-5 semanas',
        budgetRange: '$250.000 - $350.000',
        status: 'PENDING',
        priority: 'HIGH',
        features: [
          { name: 'SEO Avanzado', cost: 45000 },
          { name: 'Blog Integrado', cost: 35000 },
          { name: 'Google Analytics', cost: 15000 }
        ]
      },
      {
        clientName: 'Carlos Rodríguez',
        clientEmail: 'carlos@tiendaonline.com',
        clientPhone: '+54 11 3456-7890',
        clientCompany: 'Tienda Online Plus',
        serviceType: 'ECOMMERCE',
        description: 'Tienda online completa con carrito de compras, pasarela de pagos y gestión de inventario',
        timeline: '6-8 semanas',
        budgetRange: '$400.000 - $500.000',
        status: 'IN_REVIEW',
        priority: 'MEDIUM',
        features: [
          { name: 'Pasarela de Pagos', cost: 60000 },
          { name: 'Gestión de Inventario', cost: 45000 },
          { name: 'Sistema de Cupones', cost: 35000 }
        ]
      },
      {
        clientName: 'Ana Martínez',
        clientEmail: 'ana.martinez@startup.com',
        clientPhone: '+54 11 4567-8901',
        clientCompany: 'StartUp Innovadora',
        serviceType: 'LANDING_PAGE',
        description: 'Landing page para lanzamiento de producto con formulario de pre-registro',
        timeline: '2-3 semanas',
        budgetRange: '$150.000 - $200.000',
        status: 'QUOTED',
        priority: 'HIGH',
        features: [
          { name: 'SEO Avanzado', cost: 45000 },
          { name: 'Popup Promocional', cost: 18000 },
          { name: 'Contador Regresivo', cost: 15000 }
        ]
      },
      {
        clientName: 'Roberto Silva',
        clientEmail: 'roberto@agenciamarketing.com',
        clientPhone: '+54 11 5678-9012',
        clientCompany: 'Agencia de Marketing 360',
        serviceType: 'SOCIAL_MEDIA',
        description: 'Gestión completa de redes sociales con contenido premium y campañas publicitarias',
        timeline: 'Servicio mensual',
        budgetRange: '$200.000 - $300.000',
        status: 'COMPLETED',
        priority: 'MEDIUM',
        features: [
          { name: 'Contenido Premium', cost: 25000 },
          { name: 'Campañas Publicitarias', cost: 50000 },
          { name: 'Stories Destacadas', cost: 15000 }
        ]
      },
      {
        clientName: 'Laura Fernández',
        clientEmail: 'laura@consultora.com',
        clientPhone: '+54 11 6789-0123',
        clientCompany: 'Consultora Profesional',
        serviceType: 'CORPORATE_WEB',
        description: 'Sitio web para consultora con sección de servicios, equipo y testimonios',
        timeline: '3-4 semanas',
        budgetRange: '$200.000 - $280.000',
        status: 'CANCELLED',
        priority: 'LOW',
        features: [
          { name: 'Sección de Testimonios', cost: 18000 },
          { name: 'Página de Equipo', cost: 25000 }
        ]
      }
    ]

    for (let i = 0; i < quotes.length; i++) {
      const quoteData = quotes[i]
      const quoteNumber = await utils.generateQuoteNumber()
      const accessToken = utils.generateAccessToken()
      const estimatedPrice = utils.calculateEstimatedPrice(
        quoteData.serviceType as any,
        quoteData.features.map(f => f.name.toLowerCase().replace(/\s+/g, '-'))
      )

      const quote = await db.quote.create({
        data: {
          quoteNumber,
          clientName: quoteData.clientName,
          clientEmail: quoteData.clientEmail,
          clientPhone: quoteData.clientPhone,
          clientCompany: quoteData.clientCompany,
          serviceType: quoteData.serviceType as any,
          description: quoteData.description,
          timeline: quoteData.timeline,
          budgetRange: quoteData.budgetRange,
          estimatedPrice,
          status: quoteData.status as any,
          priority: quoteData.priority as any,
          accessToken,
          assignedTo: i % 2 === 0 ? 'admin@hexagono.xyz' : null,
          features: {
            create: quoteData.features.map(feature => ({
              featureName: feature.name,
              featureCost: feature.cost
            }))
          },
          notes: {
            create: [
              {
                author: 'Sistema',
                note: `Cotización creada automáticamente - ${quoteData.status}`,
                isInternal: true
              },
              ...(quoteData.status === 'COMPLETED' ? [{
                author: 'Cliente',
                note: 'Muy satisfecho con el resultado final. Excelente trabajo.',
                isInternal: false
              }] : []),
              ...(quoteData.status === 'CANCELLED' ? [{
                author: 'Admin',
                note: 'Cliente decidió posponer el proyecto por temas presupuestarios.',
                isInternal: true
              }] : [])
            ]
          },
          statusHistory: {
            create: [
              {
                previousStatus: null,
                newStatus: 'PENDING',
                changedBy: 'Sistema',
                notes: 'Cotización inicial creada'
              },
              ...(quoteData.status !== 'PENDING' ? [{
                previousStatus: 'PENDING',
                newStatus: quoteData.status,
                changedBy: 'Admin',
                notes: `Estado actualizado a ${quoteData.status}`
              }] : [])
            ]
          }
        }
      })

      console.log(`✅ Cotización creada: ${quote.quoteNumber} (${quoteData.clientName})`)
    }

    // Mostrar estadísticas finales
    console.log('\n📊 Estadísticas de datos creados:')
    const stats = await db.quote.groupBy({
      by: ['status'],
      _count: true
    })

    stats.forEach(stat => {
      console.log(`   - ${stat.status}: ${stat._count} cotizaciones`)
    })

    const totalFeatures = await db.quoteFeature.count()
    const totalNotes = await db.quoteNote.count()

    console.log(`   - Total características: ${totalFeatures}`)
    console.log(`   - Total notas: ${totalNotes}`)

    console.log('\n🎉 ¡Datos de prueba creados exitosamente!')
    console.log('\n💡 Puedes explorar los datos con:')
    console.log('   - pnpm db:studio')
    console.log('   - Visitar: http://localhost:3000/admin/cotizaciones')

  } catch (error) {
    console.error('\n💥 Error creando datos de prueba:', error)
    process.exit(1)
  } finally {
    await db.$disconnect()
  }
}

// Ejecutar script
main().catch((error) => {
  console.error('💥 Error ejecutando seed:', error)
  process.exit(1)
})