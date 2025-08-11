# Sistema de Seguimiento de Cotizaciones - Ejemplos de Uso

## Descripción General

El sistema de seguimiento permite a los clientes consultar el estado de sus cotizaciones usando un token único de acceso. Este documento muestra ejemplos de cómo funciona el sistema.

## Flujo Básico de Seguimiento

### 1. URL de Seguimiento
```
https://hexagono.xyz/cotizacion/seguimiento/abc123def456
```

### 2. Llamada a la API
```typescript
GET /api/quotes/track/abc123def456

Response:
{
  "id": "quote-123",
  "quoteNumber": "HEX-2024-001",
  "status": "PENDING",
  "priority": "MEDIUM",
  "createdAt": "2024-01-01T10:00:00Z",
  "updatedAt": "2024-01-01T10:00:00Z",
  "estimatedResponseDate": "2024-01-03T10:00:00Z",
  "clientName": "Juan Pérez",
  "serviceType": "CORPORATE_WEB",
  "estimatedPrice": 250000,
  "timeline": "4-6 semanas",
  "statusHistory": [...],
  "publicNotes": [...]
}
```

## Progresión de Estados

| Estado | Descripción | Tiempo Estimado |
|--------|-------------|-----------------|
| `PENDING` | Cotización recibida y en cola | Mostrar estimación |
| `IN_REVIEW` | En proceso de análisis | Mostrar estimación |
| `QUOTED` | Propuesta lista | No mostrar |
| `COMPLETED` | Proceso completado | No mostrar |
| `CANCELLED` | Cotización cancelada | No mostrar |

## Niveles de Prioridad

- **Alta**: Cotizaciones >$300.000 ARS (24h respuesta)
- **Media**: Cotizaciones estándar (48h respuesta)
- **Baja**: Cotizaciones menores (72h respuesta)

## Tipos de Servicio

- `LANDING_PAGE` → "Landing Page"
- `CORPORATE_WEB` → "Web Corporativa"
- `ECOMMERCE` → "Tienda Online"
- `SOCIAL_MEDIA` → "Gestión de Redes Sociales"

## Actualización Automática

- Intervalo: 30 segundos
- Solo para estados activos (`PENDING`, `IN_REVIEW`)
- Máximo 3 reintentos en caso de error

## Manejo de Errores

### Token Inválido (404)
```json
{
  "error": "Cotización no encontrada"
}
```

### Error de Red
```json
{
  "error": "Network error"
}
```

### Error del Servidor (500)
```json
{
  "error": "Error interno del servidor"
}
```

## Notas Públicas vs Internas

Solo las notas marcadas como `isInternal: false` son visibles para el cliente:

```typescript
// Visible para el cliente
{
  "note": "Propuesta lista para envío",
  "isInternal": false,
  "createdAt": "2024-01-02T08:30:00Z"
}

// Solo para uso interno
{
  "note": "Revisar con el equipo de diseño",
  "isInternal": true,
  "createdAt": "2024-01-01T11:30:00Z"
}
```

## Timeline Visual

El historial de estados se muestra como una línea de tiempo con:
- Iconos específicos para cada estado
- Colores diferenciados
- Timestamps relativos ("hace 2 horas")
- Notas asociadas a cada cambio

## Seguridad

- Acceso solo con token válido
- No exposición de datos internos
- Tokens únicos por cotización
- Sin indexación en motores de búsqueda (`noindex, nofollow`)