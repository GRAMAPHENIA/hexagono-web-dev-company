#!/usr/bin/env tsx

import { execSync } from 'child_process'
import { existsSync, writeFileSync } from 'fs'
import { initializeApp, seedDevelopmentData } from '@/lib/init'
import { env } from '@/lib/config/env'

async function main() {
  console.log('🛠️  Configurando proyecto Hexágono Web - Sistema de Cotizaciones...\n')

  try {
    // 1. Verificar si existe .env
    if (!existsSync('.env')) {
      console.log('📝 Creando archivo .env desde .env.example...')
      
      if (existsSync('.env.example')) {
        const envExample = require('fs').readFileSync('.env.example', 'utf8')
        writeFileSync('.env', envExample)
        console.log('✅ Archivo .env creado')
        console.log('⚠️  Recuerda configurar las variables de entorno necesarias')
      } else {
        console.log('❌ No se encontró .env.example')
      }
    } else {
      console.log('✅ Archivo .env ya existe')
    }

    // 2. Generar cliente de Prisma
    console.log('\n🔄 Generando cliente de Prisma...')
    try {
      execSync('npx prisma generate', { stdio: 'inherit' })
      console.log('✅ Cliente de Prisma generado')
    } catch (error) {
      console.error('❌ Error generando cliente de Prisma:', error)
      throw error
    }

    // 3. Sincronizar base de datos
    console.log('\n🗄️  Sincronizando esquema de base de datos...')
    try {
      execSync('npx prisma db push', { stdio: 'inherit' })
      console.log('✅ Base de datos sincronizada')
    } catch (error) {
      console.error('❌ Error sincronizando base de datos:', error)
      throw error
    }

    // 4. Inicializar aplicación
    console.log('\n🚀 Inicializando aplicación...')
    const result = await initializeApp()

    if (!result.success) {
      throw new Error(result.error)
    }

    // 5. Crear datos de prueba en desarrollo
    if (env.NODE_ENV === 'development') {
      console.log('\n🌱 ¿Crear datos de prueba? (desarrollo)')
      await seedDevelopmentData()
    }

    // 6. Instalar dependencias adicionales si es necesario
    console.log('\n📦 Verificando dependencias...')
    try {
      execSync('pnpm install', { stdio: 'inherit' })
      console.log('✅ Dependencias verificadas')
    } catch (error) {
      console.warn('⚠️  Advertencia al verificar dependencias:', error)
    }

    console.log('\n🎉 ¡Setup completado exitosamente!')
    console.log('\n📋 Próximos pasos:')
    console.log('1. Configurar las variables de entorno en .env')
    console.log('2. Ejecutar: pnpm dev')
    console.log('3. Visitar: http://localhost:3000')
    
    if (env.NODE_ENV === 'development') {
      console.log('\n💡 Herramientas de desarrollo:')
      console.log('   - pnpm db:studio    # Explorar base de datos')
      console.log('   - pnpm check-config # Verificar configuración')
      console.log('   - pnpm test         # Ejecutar tests')
    }

  } catch (error) {
    console.error('\n💥 Error durante el setup:', error)
    console.log('\n🔧 Pasos para solucionar:')
    console.log('1. Verificar que PostgreSQL esté ejecutándose')
    console.log('2. Verificar las variables de entorno en .env')
    console.log('3. Ejecutar: pnpm check-config')
    process.exit(1)
  }
}

// Ejecutar script
main().catch((error) => {
  console.error('💥 Error ejecutando setup:', error)
  process.exit(1)
})