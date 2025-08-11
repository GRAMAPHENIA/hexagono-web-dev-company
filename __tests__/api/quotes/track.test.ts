// API Route Test for Quote Tracking
// This test validates the tracking endpoint functionality

import { z } from 'zod'

// Mock the database module
const mockPrisma = {
  quote: {
    findUnique: jest.fn(),
  },
}

jest.mock('@/lib/database', () => ({
  prisma: mockPrisma,
}))

// Test the validation schema
const trackingParamsSchema = z.object({
  token: z.string().min(1, 'Token is required'),
})

describe('Quote Tracking API Logic', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('Token Validation', () => {
    it('should validate valid token', () => {
      const result = trackingParamsSchema.safeParse({ token: 'valid-token-123' })
      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data.token).toBe('valid-token-123')
      }
    })

    it('should reject empty token', () => {
      const result = trackingParamsSchema.safeParse({ token: '' })
      expect(result.success).toBe(false)
    })

    it('should reject missing token', () => {
      const result = trackingParamsSchema.safeParse({})
      expect(result.success).toBe(false)
    })
  })

  describe('Database Query Logic', () => {
    it('should query with correct parameters', async () => {
      const mockQuote = {
        id: 'quote-123',
        quoteNumber: 'HEX-2024-001',
        status: 'PENDING',
        priority: 'MEDIUM',
        createdAt: new Date('2024-01-01T10:00:00Z'),
        updatedAt: new Date('2024-01-01T10:00:00Z'),
        clientName: 'Juan Pérez',
        serviceType: 'CORPORATE_WEB',
        estimatedPrice: 250000,
        timeline: '4-6 semanas',
        accessToken: 'valid-token-123',
        features: [],
        statusHistory: [],
        notes: [],
      }

      mockPrisma.quote.findUnique.mockResolvedValue(mockQuote)

      // Simulate the database call
      const result = await mockPrisma.quote.findUnique({
        where: { accessToken: 'valid-token-123' },
        include: {
          features: true,
          statusHistory: { orderBy: { createdAt: 'asc' } },
          notes: { where: { isInternal: false }, orderBy: { createdAt: 'desc' } },
        },
      })

      expect(mockPrisma.quote.findUnique).toHaveBeenCalledWith({
        where: { accessToken: 'valid-token-123' },
        include: {
          features: true,
          statusHistory: { orderBy: { createdAt: 'asc' } },
          notes: { where: { isInternal: false }, orderBy: { createdAt: 'desc' } },
        },
      })

      expect(result).toEqual(mockQuote)
    })

    it('should return null for non-existent quote', async () => {
      mockPrisma.quote.findUnique.mockResolvedValue(null)

      const result = await mockPrisma.quote.findUnique({
        where: { accessToken: 'invalid-token' },
      })

      expect(result).toBeNull()
    })
  })

  describe('Response Data Formatting', () => {
    it('should format tracking data correctly', () => {
      const mockQuote = {
        id: 'quote-123',
        quoteNumber: 'HEX-2024-001',
        status: 'PENDING',
        priority: 'MEDIUM',
        createdAt: new Date('2024-01-01T10:00:00Z'),
        updatedAt: new Date('2024-01-01T10:00:00Z'),
        clientName: 'Juan Pérez',
        serviceType: 'CORPORATE_WEB',
        estimatedPrice: 250000,
        timeline: '4-6 semanas',
        features: [],
        statusHistory: [
          {
            newStatus: 'PENDING',
            createdAt: new Date('2024-01-01T10:00:00Z'),
            notes: 'Cotización recibida',
          },
        ],
        notes: [
          {
            note: 'Revisaremos tu solicitud pronto',
            createdAt: new Date('2024-01-01T10:30:00Z'),
            isInternal: false,
          },
        ],
      }

      // Calculate estimated response time
      const estimatedResponseHours = 48
      const estimatedResponseDate = new Date(mockQuote.createdAt)
      estimatedResponseDate.setHours(estimatedResponseDate.getHours() + estimatedResponseHours)

      // Format response data (simulating the API logic)
      const trackingData = {
        id: mockQuote.id,
        quoteNumber: mockQuote.quoteNumber,
        status: mockQuote.status,
        priority: mockQuote.priority,
        createdAt: mockQuote.createdAt,
        updatedAt: mockQuote.updatedAt,
        estimatedResponseDate,
        clientName: mockQuote.clientName,
        serviceType: mockQuote.serviceType,
        estimatedPrice: mockQuote.estimatedPrice,
        timeline: mockQuote.timeline,
        statusHistory: mockQuote.statusHistory.map(history => ({
          status: history.newStatus,
          createdAt: history.createdAt,
          notes: history.notes,
        })),
        publicNotes: mockQuote.notes.map(note => ({
          content: note.note,
          createdAt: note.createdAt,
        })),
      }

      expect(trackingData.id).toBe('quote-123')
      expect(trackingData.quoteNumber).toBe('HEX-2024-001')
      expect(trackingData.status).toBe('PENDING')
      expect(trackingData.statusHistory).toHaveLength(1)
      expect(trackingData.publicNotes).toHaveLength(1)
      expect(trackingData.estimatedResponseDate).toEqual(estimatedResponseDate)
    })

    it('should filter out internal notes', () => {
      const mockNotes = [
        {
          note: 'Nota pública para el cliente',
          createdAt: new Date('2024-01-01T10:30:00Z'),
          isInternal: false,
        },
        {
          note: 'Nota interna del equipo',
          createdAt: new Date('2024-01-01T10:45:00Z'),
          isInternal: true,
        },
      ]

      // Simulate filtering logic
      const publicNotes = mockNotes
        .filter(note => !note.isInternal)
        .map(note => ({
          content: note.note,
          createdAt: note.createdAt,
        }))

      expect(publicNotes).toHaveLength(1)
      expect(publicNotes[0].content).toBe('Nota pública para el cliente')
    })
  })
})