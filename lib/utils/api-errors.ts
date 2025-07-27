import { NextResponse } from 'next/server'
import { ZodError } from 'zod'
import { Prisma } from '@prisma/client'

/**
 * Custom error classes for the quote system
 */
export class QuoteValidationError extends Error {
  constructor(public field: string, message: string) {
    super(message)
    this.name = 'QuoteValidationError'
  }
}

export class QuoteNotFoundError extends Error {
  constructor(quoteId: string) {
    super(`Cotización con ID ${quoteId} no encontrada`)
    this.name = 'QuoteNotFoundError'
  }
}

export class QuoteAccessDeniedError extends Error {
  constructor(message: string = 'Acceso denegado a la cotización') {
    super(message)
    this.name = 'QuoteAccessDeniedError'
  }
}

export class FileUploadError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'FileUploadError'
  }
}

export class PricingCalculationError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'PricingCalculationError'
  }
}

/**
 * Error response interface
 */
interface ErrorResponse {
  error: string
  code?: string
  field?: string
  details?: Array<{
    field: string
    message: string
  }>
  timestamp: string
}

/**
 * Centralized API error handler
 */
export function handleApiError(error: unknown): NextResponse<ErrorResponse> {
  const timestamp = new Date().toISOString()

  // Zod validation errors
  if (error instanceof ZodError) {
    return NextResponse.json({
      error: 'Datos de entrada inválidos',
      code: 'VALIDATION_ERROR',
      details: error.errors.map(err => ({
        field: err.path.join('.'),
        message: err.message
      })),
      timestamp
    }, { status: 400 })
  }

  // Custom quote validation errors
  if (error instanceof QuoteValidationError) {
    return NextResponse.json({
      error: error.message,
      code: 'QUOTE_VALIDATION_ERROR',
      field: error.field,
      timestamp
    }, { status: 400 })
  }

  // Quote not found errors
  if (error instanceof QuoteNotFoundError) {
    return NextResponse.json({
      error: error.message,
      code: 'QUOTE_NOT_FOUND',
      timestamp
    }, { status: 404 })
  }

  // Access denied errors
  if (error instanceof QuoteAccessDeniedError) {
    return NextResponse.json({
      error: error.message,
      code: 'ACCESS_DENIED',
      timestamp
    }, { status: 403 })
  }

  // File upload errors
  if (error instanceof FileUploadError) {
    return NextResponse.json({
      error: error.message,
      code: 'FILE_UPLOAD_ERROR',
      timestamp
    }, { status: 400 })
  }

  // Pricing calculation errors
  if (error instanceof PricingCalculationError) {
    return NextResponse.json({
      error: error.message,
      code: 'PRICING_ERROR',
      timestamp
    }, { status: 400 })
  }

  // Prisma database errors
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    return handlePrismaError(error, timestamp)
  }

  // Handle errors with Prisma error codes (for mocked errors in tests)
  if (error && typeof error === 'object' && 'code' in error) {
    const prismaError = error as any
    if (prismaError.code === 'P2002') {
      const target = prismaError.meta?.target as string[] | undefined
      const field = target?.[0] || 'campo'
      return NextResponse.json({
        error: `Ya existe un registro con este ${field}`,
        code: 'DUPLICATE_ENTRY',
        field,
        timestamp
      }, { status: 409 })
    }
  }

  // Prisma validation errors
  if (error instanceof Prisma.PrismaClientValidationError) {
    return NextResponse.json({
      error: 'Error de validación en la base de datos',
      code: 'DATABASE_VALIDATION_ERROR',
      timestamp
    }, { status: 400 })
  }

  // Network/connection errors
  if (error instanceof Error && error.message.includes('ECONNREFUSED')) {
    return NextResponse.json({
      error: 'Error de conexión con la base de datos',
      code: 'DATABASE_CONNECTION_ERROR',
      timestamp
    }, { status: 503 })
  }

  // Generic error handling
  console.error('Unhandled API error:', error)
  
  return NextResponse.json({
    error: 'Error interno del servidor',
    code: 'INTERNAL_SERVER_ERROR',
    timestamp
  }, { status: 500 })
}

/**
 * Handle specific Prisma errors
 */
function handlePrismaError(error: Prisma.PrismaClientKnownRequestError, timestamp: string): NextResponse<ErrorResponse> {
  switch (error.code) {
    case 'P2002':
      // Unique constraint violation
      const target = error.meta?.target as string[] | undefined
      const field = target?.[0] || 'campo'
      return NextResponse.json({
        error: `Ya existe un registro con este ${field}`,
        code: 'DUPLICATE_ENTRY',
        field,
        timestamp
      }, { status: 409 })

    case 'P2025':
      // Record not found
      return NextResponse.json({
        error: 'Registro no encontrado',
        code: 'RECORD_NOT_FOUND',
        timestamp
      }, { status: 404 })

    case 'P2003':
      // Foreign key constraint violation
      return NextResponse.json({
        error: 'Error de referencia en la base de datos',
        code: 'FOREIGN_KEY_ERROR',
        timestamp
      }, { status: 400 })

    case 'P2014':
      // Required relation missing
      return NextResponse.json({
        error: 'Faltan datos relacionados requeridos',
        code: 'MISSING_RELATION',
        timestamp
      }, { status: 400 })

    default:
      console.error('Unhandled Prisma error:', error)
      return NextResponse.json({
        error: 'Error de base de datos',
        code: 'DATABASE_ERROR',
        timestamp
      }, { status: 500 })
  }
}

/**
 * Validation helper for API routes
 */
export function validateApiInput<T>(
  schema: any,
  data: unknown,
  customErrorMessage?: string
): T {
  const result = schema.safeParse(data)
  
  if (!result.success) {
    throw new ZodError(result.error.errors)
  }
  
  return result.data
}

/**
 * Async error wrapper for API routes
 */
export function withErrorHandling<T extends any[], R>(
  handler: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R | NextResponse<ErrorResponse>> => {
    try {
      return await handler(...args)
    } catch (error) {
      return handleApiError(error)
    }
  }
}

/**
 * Rate limiting error
 */
export class RateLimitError extends Error {
  constructor(message: string = 'Demasiadas solicitudes. Intente nuevamente más tarde.') {
    super(message)
    this.name = 'RateLimitError'
  }
}

/**
 * Service unavailable error
 */
export class ServiceUnavailableError extends Error {
  constructor(service: string) {
    super(`El servicio ${service} no está disponible temporalmente`)
    this.name = 'ServiceUnavailableError'
  }
}

/**
 * Log error for monitoring
 */
export function logError(error: unknown, context: string, metadata?: Record<string, any>) {
  const errorInfo = {
    timestamp: new Date().toISOString(),
    context,
    error: error instanceof Error ? {
      name: error.name,
      message: error.message,
      stack: error.stack
    } : error,
    metadata
  }

  // In production, this would send to a logging service like Sentry
  console.error('API Error:', JSON.stringify(errorInfo, null, 2))
}

/**
 * Success response helper
 */
export function createSuccessResponse<T>(
  data: T,
  message?: string,
  status: number = 200
) {
  return NextResponse.json({
    success: true,
    data,
    message,
    timestamp: new Date().toISOString()
  }, { status })
}

/**
 * Paginated response helper
 */
export function createPaginatedResponse<T>(
  data: T[],
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  },
  message?: string
) {
  return NextResponse.json({
    success: true,
    data,
    pagination,
    message,
    timestamp: new Date().toISOString()
  })
}