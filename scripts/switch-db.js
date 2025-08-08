#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const POSTGRES_SCHEMA = 'prisma/schema.prisma';
const SQLITE_SCHEMA = 'prisma/schema.sqlite.prisma';

function switchToSQLite() {
  console.log('🔄 Cambiando a SQLite...');
  
  if (!fs.existsSync(SQLITE_SCHEMA)) {
    console.error('❌ No se encontró el schema de SQLite');
    return false;
  }

  // Hacer backup del schema actual
  if (fs.existsSync(POSTGRES_SCHEMA)) {
    fs.copyFileSync(POSTGRES_SCHEMA, POSTGRES_SCHEMA + '.backup');
  }

  // Copiar schema de SQLite
  fs.copyFileSync(SQLITE_SCHEMA, POSTGRES_SCHEMA);
  
  console.log('✅ Cambiado a SQLite');
  console.log('📝 Archivo de base de datos: prisma/dev.db');
  return true;
}

function switchToPostgreSQL() {
  console.log('🔄 Cambiando a PostgreSQL...');
  
  const backupFile = POSTGRES_SCHEMA + '.backup';
  if (!fs.existsSync(backupFile)) {
    console.error('❌ No se encontró el backup del schema de PostgreSQL');
    return false;
  }

  // Restaurar schema de PostgreSQL
  fs.copyFileSync(backupFile, POSTGRES_SCHEMA);
  
  console.log('✅ Cambiado a PostgreSQL');
  console.log('📝 Configura DATABASE_URL en tu .env');
  return true;
}

function showStatus() {
  const schema = fs.readFileSync(POSTGRES_SCHEMA, 'utf8');
  const isSQLite = schema.includes('provider = "sqlite"');
  
  console.log(`📊 Estado actual: ${isSQLite ? 'SQLite' : 'PostgreSQL'}`);
  console.log(`📁 Schema: ${POSTGRES_SCHEMA}`);
  
  if (isSQLite) {
    const dbExists = fs.existsSync('prisma/dev.db');
    console.log(`🗄️  Base de datos: ${dbExists ? '✅ Existe' : '❌ No existe'}`);
  }
}

// Ejecutar comando
const command = process.argv[2];

switch (command) {
  case 'sqlite':
    switchToSQLite();
    break;
  case 'postgres':
    switchToPostgreSQL();
    break;
  case 'status':
    showStatus();
    break;
  default:
    console.log('📋 Uso:');
    console.log('  node scripts/switch-db.js sqlite    # Cambiar a SQLite');
    console.log('  node scripts/switch-db.js postgres  # Cambiar a PostgreSQL');
    console.log('  node scripts/switch-db.js status    # Ver estado actual');
    break;
}
