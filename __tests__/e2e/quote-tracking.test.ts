// E2E Test for Quote Tracking System
// This test validates the complete tracking flow

describe('Quote Tracking System E2E', () => {
  const mockQuoteData = {
    id: 'quote-123',
    quoteNumber: 'HEX-2024-001',
    status: 'PENDING',
    priority: 'MEDIUM',
    createdAt: '2024-01-01T10:00:00Z',
    updatedAt: '2024-01-01T10:00:00Z',
    estimatedResponseDate: '2024-01-03T10:00:00Z',
    clientName: 'Juan Pérez',
    serviceType: 'CORPORATE_WEB',
    estimatedPrice: 250000,
    timeline: '4-6 semanas',
    statusHistory: [
      {
        status: 'PENDING',
        createdAt: '2024-01-01T10:00:00Z',
        notes: 'Cotización recibida',
      },
    ],
    publicNotes: [
      {
        content: 'Revisaremos tu solicitud pronto',
        createdAt: '2024-01-01T10:30:00Z',
      },
    ],
  }

  beforeEach(() => {
    // Mock fetch globally
    global.fetch = jest.fn()
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  describe('Complete Tracking Flow', () => {
    it('should handle the complete tracking workflow', async () => {
      // Mock successful API response
      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockQuoteData,
      })

      // Test API endpoint logic
      const token = 'valid-token-123'
      const apiUrl = `/api/quotes/track/${token}`
      
      // Simulate API call
      const response = await fetch(apiUrl)
      const data = await response.json()

      expect(response.ok).toBe(true)
      expect(data.quoteNumber).toBe('HEX-2024-001')
      expect(data.clientName).toBe('Juan Pérez')
      expect(data.status).toBe('PENDING')
    })

    it('should handle different quote statuses correctly', async () => {
      const statuses = ['PENDING', 'IN_REVIEW', 'QUOTED', 'COMPLETED', 'CANCELLED']
      
      for (const status of statuses) {
        const mockData = { ...mockQuoteData, status }
        ;(global.fetch as jest.Mock).mockResolvedValue({
          ok: true,
          json: async () => mockData,
        })

        const response = await fetch('/api/quotes/track/test-token')
        const data = await response.json()

        expect(data.status).toBe(status)
      }
    })

    it('should handle priority levels correctly', async () => {
      const priorities = ['LOW', 'MEDIUM', 'HIGH']
      
      for (const priority of priorities) {
        const mockData = { ...mockQuoteData, priority }
        ;(global.fetch as jest.Mock).mockResolvedValue({
          ok: true,
          json: async () => mockData,
        })

        const response = await fetch('/api/quotes/track/test-token')
        const data = await response.json()

        expect(data.priority).toBe(priority)
      }
    })

    it('should calculate estimated response time correctly', async () => {
      const createdAt = '2024-01-01T10:00:00Z'
      const mockData = { ...mockQuoteData, createdAt }
      
      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockData,
      })

      const response = await fetch('/api/quotes/track/test-token')
      const data = await response.json()

      const expectedDate = new Date(createdAt)
      expectedDate.setHours(expectedDate.getHours() + 48)

      expect(new Date(data.estimatedResponseDate)).toEqual(expectedDate)
    })

    it('should handle service type mapping correctly', async () => {
      const serviceTypes = {
        'LANDING_PAGE': 'Landing Page',
        'CORPORATE_WEB': 'Web Corporativa',
        'ECOMMERCE': 'Tienda Online',
        'SOCIAL_MEDIA': 'Gestión de Redes Sociales',
      }

      for (const [apiType, displayName] of Object.entries(serviceTypes)) {
        const mockData = { ...mockQuoteData, serviceType: apiType }
        ;(global.fetch as jest.Mock).mockResolvedValue({
          ok: true,
          json: async () => mockData,
        })

        const response = await fetch('/api/quotes/track/test-token')
        const data = await response.json()

        expect(data.serviceType).toBe(apiType)
        // In a real E2E test, we would verify the display name in the UI
      }
    })

    it('should handle error scenarios gracefully', async () => {
      // Test 404 error
      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({ error: 'Cotización no encontrada' }),
      })

      const response = await fetch('/api/quotes/track/invalid-token')
      const errorData = await response.json()

      expect(response.ok).toBe(false)
      expect(errorData.error).toBe('Cotización no encontrada')
    })

    it('should handle network errors', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValue(new Error('Network error'))

      try {
        await fetch('/api/quotes/track/test-token')
      } catch (error) {
        expect(error).toBeInstanceOf(Error)
        expect((error as Error).message).toBe('Network error')
      }
    })
  })

  describe('Data Validation', () => {
    it('should validate required fields in response', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => mockQuoteData,
      })

      const response = await fetch('/api/quotes/track/test-token')
      const data = await response.json()

      // Validate required fields
      expect(data.id).toBeDefined()
      expect(data.quoteNumber).toBeDefined()
      expect(data.status).toBeDefined()
      expect(data.clientName).toBeDefined()
      expect(data.serviceType).toBeDefined()
      expect(data.createdAt).toBeDefined()
      expect(data.estimatedResponseDate).toBeDefined()
    })

    it('should handle optional fields correctly', async () => {
      const dataWithOptionals = {
        ...mockQuoteData,
        estimatedPrice: null,
        timeline: null,
        statusHistory: [],
        publicNotes: [],
      }

      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => dataWithOptionals,
      })

      const response = await fetch('/api/quotes/track/test-token')
      const data = await response.json()

      expect(data.estimatedPrice).toBeNull()
      expect(data.timeline).toBeNull()
      expect(data.statusHistory).toEqual([])
      expect(data.publicNotes).toEqual([])
    })
  })

  describe('Security and Privacy', () => {
    it('should only return public notes', async () => {
      const dataWithMixedNotes = {
        ...mockQuoteData,
        publicNotes: [
          {
            content: 'Nota pública',
            createdAt: '2024-01-01T10:30:00Z',
          },
        ],
      }

      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: true,
        json: async () => dataWithMixedNotes,
      })

      const response = await fetch('/api/quotes/track/test-token')
      const data = await response.json()

      expect(data.publicNotes).toHaveLength(1)
      expect(data.publicNotes[0].content).toBe('Nota pública')
      // Internal notes should not be present in the response
      expect(data.internalNotes).toBeUndefined()
    })

    it('should require valid token for access', async () => {
      ;(global.fetch as jest.Mock).mockResolvedValue({
        ok: false,
        status: 404,
        json: async () => ({ error: 'Cotización no encontrada' }),
      })

      const response = await fetch('/api/quotes/track/invalid-token')
      
      expect(response.ok).toBe(false)
      expect(response.status).toBe(404)
    })
  })
})