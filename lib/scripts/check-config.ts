#!/usr/bin/env tsx

import { initializeApp, checkCriticalDependencies, showSystemInfo } from '@/lib/init'
import { env, checkExternalServices } from '@/lib/config/env'

async function main() {
  console.log('🔍 Verificando configuración del sistema de cotizaciones...\n')

  // Mostrar información del sistema
  showSystemInfo()

  // Verificar dependencias críticas
  console.log('📦 Verificando dependencias críticas...')
  const dependencies = await checkCriticalDependencies()
  
  Object.entries(dependencies).forEach(([dep, available]) => {
    console.log(`   - ${dep}: ${available ? '✅' : '❌'}`)
  })

  // Verificar servicios externos
  console.log('\n🔌 Verificando servicios externos...')
  const services = checkExternalServices()
  
  Object.entries(services).forEach(([service, configured]) => {
    const status = configured ? '✅ Configurado' : '⚠️  No configurado'
    console.log(`   - ${service}: ${status}`)
  })

  // Inicializar aplicación completa
  console.log('\n🚀 Inicializando aplicación...')
  const result = await initializeApp()

  if (result.success) {
    console.log('\n✅ ¡Configuración verificada exitosamente!')
    console.log('\n📊 Resumen:')
    console.log(`   - Entorno: ${result.environment}`)
    console.log(`   - Base de datos: ${result.dbHealth?.status}`)
    console.log(`   - Total cotizaciones: ${result.stats?.quotes.total || 0}`)
    
    if (env.NODE_ENV === 'development') {
      console.log('\n💡 Comandos útiles para desarrollo:')
      console.log('   - pnpm dev          # Iniciar servidor de desarrollo')
      console.log('   - pnpm db:studio    # Abrir Prisma Studio')
      console.log('   - pnpm db:seed      # Crear datos de prueba')
      console.log('   - pnpm test         # Ejecutar tests')
    }
  } else {
    console.error('\n❌ Error en la configuración:')
    console.error(`   ${result.error}`)
    process.exit(1)
  }
}

// Ejecutar script
main().catch((error) => {
  console.error('💥 Error ejecutando verificación:', error)
  process.exit(1)
})