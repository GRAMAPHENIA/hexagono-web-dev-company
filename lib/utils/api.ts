import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'
import { ApiResponse } from '@/lib/types/quote'

// Clase personalizada para errores de la aplicación
export class AppError extends Error {
  public statusCode: number
  public isOperational: boolean

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message)
    this.statusCode = statusCode
    this.isOperational = isOperational

    Error.captureStackTrace(this, this.constructor)
  }
}

// Función para crear respuestas de éxito
export function createSuccessResponse<T>(
  data: T,
  message?: string,
  status: number = 200
): NextResponse<ApiResponse<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      message
    },
    { status }
  )
}

// Función para crear respuestas de error
export function createErrorResponse(
  error: string,
  status: number = 500,
  data?: any
): NextResponse<ApiResponse> {
  return NextResponse.json(
    {
      success: false,
      error,
      data
    },
    { status }
  )
}

// Manejador global de errores para APIs
export function handleApiError(error: unknown): NextResponse<ApiResponse> {
  console.error('API Error:', error)

  // Error de validación de Zod
  if (error instanceof ZodError) {
    const validationErrors = error.errors.map(err => ({
      field: err.path.join('.'),
      message: err.message
    }))

    return createErrorResponse(
      'Datos de entrada inválidos',
      400,
      { validationErrors }
    )
  }

  // Error personalizado de la aplicación
  if (error instanceof AppError) {
    return createErrorResponse(error.message, error.statusCode)
  }

  // Errores de Prisma
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return createErrorResponse('Ya existe un registro con estos datos', 409)
      case 'P2025':
        return createErrorResponse('Registro no encontrado', 404)
      case 'P2003':
        return createErrorResponse('Violación de restricción de clave foránea', 400)
      default:
        return createErrorResponse('Error de base de datos', 500)
    }
  }

  if (error instanceof Prisma.PrismaClientUnknownRequestError) {
    return createErrorResponse('Error desconocido de base de datos', 500)
  }

  if (error instanceof Prisma.PrismaClientValidationError) {
    return createErrorResponse('Error de validación de datos', 400)
  }

  // Error genérico
  if (error instanceof Error) {
    return createErrorResponse(error.message, 500)
  }

  // Error desconocido
  return createErrorResponse('Error interno del servidor', 500)
}

// Wrapper para manejar errores en rutas de API
export function withErrorHandling(
  handler: (request: Request, context?: any) => Promise<NextResponse>
) {
  return async (request: Request, context?: any): Promise<NextResponse> => {
    try {
      return await handler(request, context)
    } catch (error) {
      return handleApiError(error)
    }
  }
}

// Función para validar parámetros de consulta
export function parseQueryParams(url: string) {
  const { searchParams } = new URL(url)
  const params: Record<string, string | string[]> = {}

  searchParams.forEach((value, key) => {
    if (params[key]) {
      if (Array.isArray(params[key])) {
        (params[key] as string[]).push(value)
      } else {
        params[key] = [params[key] as string, value]
      }
    } else {
      params[key] = value
    }
  })

  return params
}

// Función para validar y parsear números
export function parseNumber(value: string | null, defaultValue: number = 0): number {
  if (!value) return defaultValue
  const parsed = parseInt(value, 10)
  return isNaN(parsed) ? defaultValue : parsed
}

// Función para validar y parsear booleanos
export function parseBoolean(value: string | null, defaultValue: boolean = false): boolean {
  if (!value) return defaultValue
  return value.toLowerCase() === 'true'
}

// Función para sanitizar strings
export function sanitizeString(value: string | null): string | null {
  if (!value) return null
  return value.trim().replace(/[<>]/g, '')
}

// Función para generar tokens seguros
export function generateSecureToken(length: number = 32): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return result
}

// Función para formatear errores de validación
export function formatValidationErrors(errors: ZodError): Record<string, string> {
  const formatted: Record<string, string> = {}
  
  errors.errors.forEach(error => {
    const field = error.path.join('.')
    formatted[field] = error.message
  })
  
  return formatted
}

// Función para verificar permisos (placeholder para futuras implementaciones)
export function checkPermissions(requiredRole: string, userRole?: string): boolean {
  // Por ahora, solo verificamos si el usuario tiene rol de admin
  return userRole === 'admin'
}

// Función para log de actividades
export function logActivity(action: string, details: any, userId?: string) {
  console.log(`[${new Date().toISOString()}] ${action}`, {
    userId,
    details
  })
}