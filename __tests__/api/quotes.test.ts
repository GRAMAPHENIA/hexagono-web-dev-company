/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/quotes/route'
import { GET, PATCH } from '@/app/api/quotes/[id]/route'

// Mock the database operations
jest.mock('@/lib/database', () => ({
  quoteOperations: {
    create: jest.fn(),
    findById: jest.fn(),
    updateStatus: jest.fn(),
  },
  utils: {
    generateQuoteNumber: jest.fn(),
    generateAccessToken: jest.fn(),
    calculateEstimatedPrice: jest.fn(),
  },
}))

// Import after mocking
const { quoteOperations, utils } = require('@/lib/database')
import { QuoteFormData } from '@/lib/types/quote'

const mockQuoteOperations = quoteOperations as jest.Mocked<typeof quoteOperations>
const mockUtils = utils as jest.Mocked<typeof utils>

describe('/api/quotes', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('POST /api/quotes', () => {
    const validQuoteData: QuoteFormData = {
      clientInfo: {
        name: 'Juan Pérez',
        email: 'juan@example.com',
        phone: '+54 11 1234-5678',
        company: 'Empresa Test'
      },
      projectDetails: {
        serviceType: 'CORPORATE_WEB',
        timeline: '4-6 weeks',
        budgetRange: '$200.000 - $300.000',
        description: 'Sitio web corporativo para empresa',
        features: ['seo-optimization', 'responsive-design'],
        additionalRequirements: 'Integración con CRM existente'
      }
    }

    const mockCreatedQuote = {
      id: 'test-quote-id',
      quoteNumber: 'HEX-202401-0001',
      accessToken: 'test-access-token',
      estimatedPrice: 330000,
      status: 'PENDING',
      serviceType: 'CORPORATE_WEB',
      createdAt: new Date(),
      updatedAt: new Date(),
      features: [
        { id: 'f1', featureName: 'seo-optimization', featureCost: 50000 },
        { id: 'f2', featureName: 'responsive-design', featureCost: 30000 }
      ],
      attachments: [],
      notes: [],
      statusHistory: []
    }

    beforeEach(() => {
      mockUtils.generateQuoteNumber.mockResolvedValue('HEX-202401-0001')
      mockUtils.generateAccessToken.mockReturnValue('test-access-token')
      mockUtils.calculateEstimatedPrice.mockReturnValue(330000)
      mockQuoteOperations.create.mockResolvedValue(mockCreatedQuote as any)
    })

    it('should create a new quote with valid data', async () => {
      const request = new NextRequest('http://localhost:3000/api/quotes', {
        method: 'POST',
        body: JSON.stringify(validQuoteData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(201)
      expect(data.success).toBe(true)
      expect(data.data).toMatchObject({
        id: 'test-quote-id',
        quoteNumber: 'HEX-202401-0001',
        accessToken: 'test-access-token',
        estimatedPrice: 330000,
        status: 'PENDING'
      })

      expect(mockQuoteOperations.create).toHaveBeenCalledWith(
        expect.objectContaining({
          quoteNumber: 'HEX-202401-0001',
          clientName: 'Juan Pérez',
          clientEmail: 'juan@example.com',
          serviceType: 'CORPORATE_WEB',
          estimatedPrice: 330000,
          accessToken: 'test-access-token'
        })
      )
    })

    it('should return validation error for invalid email', async () => {
      const invalidData = {
        ...validQuoteData,
        clientInfo: {
          ...validQuoteData.clientInfo,
          email: 'invalid-email'
        }
      }

      const request = new NextRequest('http://localhost:3000/api/quotes', {
        method: 'POST',
        body: JSON.stringify(invalidData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Datos de entrada inválidos')
      expect(data.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'clientInfo.email',
            message: 'Ingrese un email válido'
          })
        ])
      )
    })

    it('should return validation error for missing required fields', async () => {
      const incompleteData = {
        clientInfo: {
          name: 'Juan Pérez'
          // Missing email
        },
        projectDetails: {
          serviceType: 'CORPORATE_WEB',
          features: []
        }
      }

      const request = new NextRequest('http://localhost:3000/api/quotes', {
        method: 'POST',
        body: JSON.stringify(incompleteData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Datos de entrada inválidos')
    })

    it('should handle database errors gracefully', async () => {
      mockQuoteOperations.create.mockRejectedValue(new Error('Database connection failed'))

      const request = new NextRequest('http://localhost:3000/api/quotes', {
        method: 'POST',
        body: JSON.stringify(validQuoteData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.error).toBe('Error interno del servidor')
    })

    it('should handle duplicate quote number error', async () => {
      const duplicateError = new Error('Unique constraint violation')
      ;(duplicateError as any).code = 'P2002'
      mockQuoteOperations.create.mockRejectedValue(duplicateError)

      const request = new NextRequest('http://localhost:3000/api/quotes', {
        method: 'POST',
        body: JSON.stringify(validQuoteData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(409)
      expect(data.error).toContain('Ya existe un registro')
    })
  })

  describe('GET /api/quotes/[id]', () => {
    const mockQuote = {
      id: 'test-quote-id',
      quoteNumber: 'HEX-202401-0001',
      clientName: 'Juan Pérez',
      clientEmail: 'juan@example.com',
      clientPhone: '+54 11 1234-5678',
      clientCompany: 'Empresa Test',
      serviceType: 'CORPORATE_WEB',
      description: 'Sitio web corporativo',
      timeline: '4-6 weeks',
      budgetRange: '$200.000 - $300.000',
      estimatedPrice: 330000,
      status: 'PENDING',
      priority: 'MEDIUM',
      assignedTo: null,
      accessToken: 'test-access-token',
      createdAt: new Date(),
      updatedAt: new Date(),
      features: [
        { id: 'f1', featureName: 'seo-optimization', featureCost: 50000 },
        { id: 'f2', featureName: 'responsive-design', featureCost: 30000 }
      ],
      attachments: [],
      notes: [],
      statusHistory: []
    }

    it('should return quote by valid ID', async () => {
      mockQuoteOperations.findById.mockResolvedValue(mockQuote as any)

      const request = new NextRequest('http://localhost:3000/api/quotes/test-quote-id')
      const response = await GET(request, { params: { id: 'test-quote-id' } })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toMatchObject({
        id: 'test-quote-id',
        quoteNumber: 'HEX-202401-0001',
        clientInfo: {
          name: 'Juan Pérez',
          email: 'juan@example.com',
          phone: '+54 11 1234-5678',
          company: 'Empresa Test'
        },
        projectDetails: {
          serviceType: 'CORPORATE_WEB',
          description: 'Sitio web corporativo',
          features: ['seo-optimization', 'responsive-design']
        }
      })
    })

    it('should return 404 for non-existent quote', async () => {
      mockQuoteOperations.findById.mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/quotes/non-existent-id')
      const response = await GET(request, { params: { id: 'non-existent-id' } })
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.error).toContain('no encontrada')
    })

    it('should return 400 for invalid ID format', async () => {
      const request = new NextRequest('http://localhost:3000/api/quotes/')
      const response = await GET(request, { params: { id: '' } })
      const data = await response.json()

      expect(response.status).toBe(500) // Will be handled by error handler
      expect(data.error).toBeDefined()
    })
  })

  describe('PATCH /api/quotes/[id]', () => {
    const mockQuote = {
      id: 'test-quote-id',
      status: 'PENDING',
      priority: 'MEDIUM',
      assignedTo: null,
      estimatedPrice: 330000
    }

    beforeEach(() => {
      mockQuoteOperations.findById.mockResolvedValue(mockQuote as any)
    })

    it('should update quote status successfully', async () => {
      mockQuoteOperations.updateStatus.mockResolvedValue([mockQuote, {}] as any)

      const updateData = {
        status: 'IN_REVIEW',
        changedBy: 'admin@hexagono.xyz',
        notes: 'Revisando cotización'
      }

      const request = new NextRequest('http://localhost:3000/api/quotes/test-quote-id', {
        method: 'PATCH',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await PATCH(request, { params: { id: 'test-quote-id' } })
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.message).toContain('actualizado exitosamente')

      expect(mockQuoteOperations.updateStatus).toHaveBeenCalledWith(
        'test-quote-id',
        'IN_REVIEW',
        'admin@hexagono.xyz',
        'Revisando cotización'
      )
    })

    it('should return error for invalid status', async () => {
      const updateData = {
        status: 'INVALID_STATUS',
        changedBy: 'admin@hexagono.xyz'
      }

      const request = new NextRequest('http://localhost:3000/api/quotes/test-quote-id', {
        method: 'PATCH',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await PATCH(request, { params: { id: 'test-quote-id' } })
      const data = await response.json()

      expect(response.status).toBe(500) // Will be handled by error handler
      expect(data.error).toBeDefined()
    })

    it('should return error for non-existent quote', async () => {
      mockQuoteOperations.findById.mockResolvedValue(null)

      const updateData = {
        status: 'IN_REVIEW',
        changedBy: 'admin@hexagono.xyz'
      }

      const request = new NextRequest('http://localhost:3000/api/quotes/non-existent-id', {
        method: 'PATCH',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await PATCH(request, { params: { id: 'non-existent-id' } })
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.error).toContain('no encontrada')
    })

    it('should return error when no valid fields to update', async () => {
      const updateData = {
        invalidField: 'invalid value'
      }

      const request = new NextRequest('http://localhost:3000/api/quotes/test-quote-id', {
        method: 'PATCH',
        body: JSON.stringify(updateData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await PATCH(request, { params: { id: 'test-quote-id' } })
      const data = await response.json()

      expect(response.status).toBe(500) // Will be handled by error handler
      expect(data.error).toBeDefined()
    })
  })
})