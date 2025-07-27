/**
 * @jest-environment node
 */
import { NextResponse } from 'next/server'
import { ZodError, z } from 'zod'
import { Prisma } from '@prisma/client'
import {
  handleApiError,
  QuoteValidationError,
  QuoteNotFoundError,
  QuoteAccessDeniedError,
  FileUploadError,
  PricingCalculationError,
  createSuccessResponse,
  createPaginatedResponse,
  logError
} from '@/lib/utils/api-errors'

// Mock console.error to avoid noise in tests
const mockConsoleError = jest.spyOn(console, 'error').mockImplementation(() => {})

describe('API Error Handling', () => {
  afterEach(() => {
    mockConsoleError.mockClear()
  })

  afterAll(() => {
    mockConsoleError.mockRestore()
  })

  describe('handleApiError', () => {
    it('should handle ZodError correctly', async () => {
      const schema = z.object({
        name: z.string().min(2),
        email: z.string().email()
      })

      try {
        schema.parse({ name: 'A', email: 'invalid' })
      } catch (error) {
        const response = handleApiError(error)
        const data = await response.json()

        expect(response.status).toBe(400)
        expect(data.error).toBe('Datos de entrada inválidos')
        expect(data.code).toBe('VALIDATION_ERROR')
        expect(data.details).toHaveLength(2)
        expect(data.details[0]).toMatchObject({
          field: 'name',
          message: expect.any(String)
        })
        expect(data.details[1]).toMatchObject({
          field: 'email',
          message: expect.any(String)
        })
        expect(data.timestamp).toBeDefined()
      }
    })

    it('should handle QuoteValidationError correctly', async () => {
      const error = new QuoteValidationError('email', 'Email inválido')
      const response = handleApiError(error)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Email inválido')
      expect(data.code).toBe('QUOTE_VALIDATION_ERROR')
      expect(data.field).toBe('email')
      expect(data.timestamp).toBeDefined()
    })

    it('should handle QuoteNotFoundError correctly', async () => {
      const error = new QuoteNotFoundError('test-id')
      const response = handleApiError(error)
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.error).toBe('Cotización con ID test-id no encontrada')
      expect(data.code).toBe('QUOTE_NOT_FOUND')
      expect(data.timestamp).toBeDefined()
    })

    it('should handle QuoteAccessDeniedError correctly', async () => {
      const error = new QuoteAccessDeniedError('No tienes permisos')
      const response = handleApiError(error)
      const data = await response.json()

      expect(response.status).toBe(403)
      expect(data.error).toBe('No tienes permisos')
      expect(data.code).toBe('ACCESS_DENIED')
      expect(data.timestamp).toBeDefined()
    })

    it('should handle FileUploadError correctly', async () => {
      const error = new FileUploadError('Archivo demasiado grande')
      const response = handleApiError(error)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Archivo demasiado grande')
      expect(data.code).toBe('FILE_UPLOAD_ERROR')
      expect(data.timestamp).toBeDefined()
    })

    it('should handle PricingCalculationError correctly', async () => {
      const error = new PricingCalculationError('Error en cálculo de precio')
      const response = handleApiError(error)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Error en cálculo de precio')
      expect(data.code).toBe('PRICING_ERROR')
      expect(data.timestamp).toBeDefined()
    })

    it('should handle Prisma unique constraint error (P2002)', async () => {
      const error = new Prisma.PrismaClientKnownRequestError(
        'Unique constraint failed',
        {
          code: 'P2002',
          clientVersion: '5.0.0',
          meta: { target: ['email'] }
        }
      )

      const response = handleApiError(error)
      const data = await response.json()

      expect(response.status).toBe(409)
      expect(data.error).toBe('Ya existe un registro con este email')
      expect(data.code).toBe('DUPLICATE_ENTRY')
      expect(data.field).toBe('email')
      expect(data.timestamp).toBeDefined()
    })

    it('should handle Prisma record not found error (P2025)', async () => {
      const error = new Prisma.PrismaClientKnownRequestError(
        'Record not found',
        {
          code: 'P2025',
          clientVersion: '5.0.0'
        }
      )

      const response = handleApiError(error)
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.error).toBe('Registro no encontrado')
      expect(data.code).toBe('RECORD_NOT_FOUND')
      expect(data.timestamp).toBeDefined()
    })

    it('should handle Prisma foreign key error (P2003)', async () => {
      const error = new Prisma.PrismaClientKnownRequestError(
        'Foreign key constraint failed',
        {
          code: 'P2003',
          clientVersion: '5.0.0'
        }
      )

      const response = handleApiError(error)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Error de referencia en la base de datos')
      expect(data.code).toBe('FOREIGN_KEY_ERROR')
      expect(data.timestamp).toBeDefined()
    })

    it('should handle Prisma validation error', async () => {
      const error = new Prisma.PrismaClientValidationError(
        'Validation error',
        { clientVersion: '5.0.0' }
      )

      const response = handleApiError(error)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Error de validación en la base de datos')
      expect(data.code).toBe('DATABASE_VALIDATION_ERROR')
      expect(data.timestamp).toBeDefined()
    })

    it('should handle connection errors', async () => {
      const error = new Error('ECONNREFUSED: Connection refused')
      const response = handleApiError(error)
      const data = await response.json()

      expect(response.status).toBe(503)
      expect(data.error).toBe('Error de conexión con la base de datos')
      expect(data.code).toBe('DATABASE_CONNECTION_ERROR')
      expect(data.timestamp).toBeDefined()
    })

    it('should handle generic errors', async () => {
      const error = new Error('Unknown error')
      const response = handleApiError(error)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Error interno del servidor')
      expect(data.code).toBe('INTERNAL_SERVER_ERROR')
      expect(data.timestamp).toBeDefined()
      expect(mockConsoleError).toHaveBeenCalledWith('Unhandled API error:', error)
    })

    it('should handle non-Error objects', async () => {
      const error = 'String error'
      const response = handleApiError(error)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Error interno del servidor')
      expect(data.code).toBe('INTERNAL_SERVER_ERROR')
      expect(data.timestamp).toBeDefined()
    })
  })

  describe('createSuccessResponse', () => {
    it('should create success response with default status', async () => {
      const data = { id: 'test', name: 'Test' }
      const response = createSuccessResponse(data, 'Success message')
      const responseData = await response.json()

      expect(response.status).toBe(200)
      expect(responseData).toMatchObject({
        success: true,
        data,
        message: 'Success message',
        timestamp: expect.any(String)
      })
    })

    it('should create success response with custom status', async () => {
      const data = { id: 'test' }
      const response = createSuccessResponse(data, 'Created', 201)
      const responseData = await response.json()

      expect(response.status).toBe(201)
      expect(responseData).toMatchObject({
        success: true,
        data,
        message: 'Created',
        timestamp: expect.any(String)
      })
    })

    it('should create success response without message', async () => {
      const data = { id: 'test' }
      const response = createSuccessResponse(data)
      const responseData = await response.json()

      expect(response.status).toBe(200)
      expect(responseData).toMatchObject({
        success: true,
        data,
        timestamp: expect.any(String)
      })
      expect(responseData.message).toBeUndefined()
    })
  })

  describe('createPaginatedResponse', () => {
    it('should create paginated response correctly', async () => {
      const data = [{ id: '1' }, { id: '2' }]
      const pagination = {
        page: 1,
        limit: 10,
        total: 25,
        pages: 3
      }

      const response = createPaginatedResponse(data, pagination, 'Data retrieved')
      const responseData = await response.json()

      expect(response.status).toBe(200)
      expect(responseData).toMatchObject({
        success: true,
        data,
        pagination,
        message: 'Data retrieved',
        timestamp: expect.any(String)
      })
    })
  })

  describe('logError', () => {
    it('should log error with context and metadata', () => {
      const error = new Error('Test error')
      const context = 'test_context'
      const metadata = { userId: 'test-user' }

      logError(error, context, metadata)

      expect(mockConsoleError).toHaveBeenCalledWith(
        'API Error:',
        expect.stringContaining('"context":"test_context"')
      )
      expect(mockConsoleError).toHaveBeenCalledWith(
        'API Error:',
        expect.stringContaining('"userId":"test-user"')
      )
    })

    it('should log non-Error objects', () => {
      const error = 'String error'
      const context = 'test_context'

      logError(error, context)

      expect(mockConsoleError).toHaveBeenCalledWith(
        'API Error:',
        expect.stringContaining('"error":"String error"')
      )
    })
  })

  describe('Custom Error Classes', () => {
    it('should create QuoteValidationError correctly', () => {
      const error = new QuoteValidationError('email', 'Invalid email')
      
      expect(error.name).toBe('QuoteValidationError')
      expect(error.message).toBe('Invalid email')
      expect(error.field).toBe('email')
      expect(error instanceof Error).toBe(true)
    })

    it('should create QuoteNotFoundError correctly', () => {
      const error = new QuoteNotFoundError('test-id')
      
      expect(error.name).toBe('QuoteNotFoundError')
      expect(error.message).toBe('Cotización con ID test-id no encontrada')
      expect(error instanceof Error).toBe(true)
    })

    it('should create QuoteAccessDeniedError with default message', () => {
      const error = new QuoteAccessDeniedError()
      
      expect(error.name).toBe('QuoteAccessDeniedError')
      expect(error.message).toBe('Acceso denegado a la cotización')
      expect(error instanceof Error).toBe(true)
    })

    it('should create QuoteAccessDeniedError with custom message', () => {
      const error = new QuoteAccessDeniedError('Custom access denied')
      
      expect(error.name).toBe('QuoteAccessDeniedError')
      expect(error.message).toBe('Custom access denied')
      expect(error instanceof Error).toBe(true)
    })

    it('should create FileUploadError correctly', () => {
      const error = new FileUploadError('File too large')
      
      expect(error.name).toBe('FileUploadError')
      expect(error.message).toBe('File too large')
      expect(error instanceof Error).toBe(true)
    })

    it('should create PricingCalculationError correctly', () => {
      const error = new PricingCalculationError('Calculation failed')
      
      expect(error.name).toBe('PricingCalculationError')
      expect(error.message).toBe('Calculation failed')
      expect(error instanceof Error).toBe(true)
    })
  })
})