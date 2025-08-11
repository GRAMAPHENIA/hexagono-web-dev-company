import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import { NextRequest } from 'next/server'
import { PATCH, GET } from '@/app/api/quotes/[id]/status/route'

// Mock dependencies
jest.mock('@/lib/database', () => ({
  quoteOperations: {
    findById: jest.fn(),
    updateStatus: jest.fn(),
  },
}))

jest.mock('@/lib/notifications', () => ({
  sendStatusUpdateNotification: jest.fn(),
}))

jest.mock('@/lib/utils/api-errors', () => ({
  handleApiError: jest.fn(),
  createSuccessResponse: jest.fn(),
  logError: jest.fn(),
}))

describe('/api/quotes/[id]/status', () => {
  let mockQuoteOperations: any
  let mockSendStatusUpdateNotification: jest.MockedFunction<any>
  let mockCreateSuccessResponse: jest.MockedFunction<any>
  let mockHandleApiError: jest.MockedFunction<any>

  beforeEach(() => {
    jest.clearAllMocks()
    
    mockQuoteOperations = require('@/lib/database').quoteOperations
    mockSendStatusUpdateNotification = require('@/lib/notifications').sendStatusUpdateNotification
    mockCreateSuccessResponse = require('@/lib/utils/api-errors').createSuccessResponse
    mockHandleApiError = require('@/lib/utils/api-errors').handleApiError

    // Set up default mock responses
    mockCreateSuccessResponse.mockImplementation((data, message) => 
      new Response(JSON.stringify({ success: true, data, message }), { status: 200 })
    )
    mockHandleApiError.mockImplementation((error) => 
      new Response(JSON.stringify({ success: false, error: error.message }), { status: 500 })
    )
  })

  describe('PATCH', () => {
    const mockQuote = {
      id: 'quote-123',
      quoteNumber: 'HEX-202401-0001',
      status: 'PENDING',
    }

    const mockUpdatedQuote = {
      id: 'quote-123',
      status: 'IN_REVIEW',
      updatedAt: new Date(),
    }

    it('should update quote status successfully', async () => {
      mockQuoteOperations.findById.mockResolvedValue(mockQuote)
      mockQuoteOperations.updateStatus.mockResolvedValue([mockUpdatedQuote])
      mockSendStatusUpdateNotification.mockResolvedValue(true)

      const requestBody = {
        status: 'IN_REVIEW',
        notes: 'Revisando detalles del proyecto',
        changedBy: 'admin@hexagono.xyz',
      }

      const request = new NextRequest('http://localhost:3000/api/quotes/quote-123/status', {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
        headers: {
          'content-type': 'application/json',
        },
      })

      const response = await PATCH(request, { params: { id: 'quote-123' } })

      expect(response.status).toBe(200)
      expect(mockQuoteOperations.updateStatus).toHaveBeenCalledWith(
        'quote-123',
        'IN_REVIEW',
        'admin@hexagono.xyz',
        'Revisando detalles del proyecto'
      )
      expect(mockSendStatusUpdateNotification).toHaveBeenCalledWith(
        'quote-123',
        'IN_REVIEW',
        'PENDING',
        'Revisando detalles del proyecto'
      )
    })

    it('should validate request data', async () => {
      const invalidRequestBody = {
        status: 'INVALID_STATUS',
        changedBy: '',
      }

      const request = new NextRequest('http://localhost:3000/api/quotes/quote-123/status', {
        method: 'PATCH',
        body: JSON.stringify(invalidRequestBody),
        headers: {
          'content-type': 'application/json',
        },
      })

      const response = await PATCH(request, { params: { id: 'quote-123' } })
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Datos de entrada inválidos')
      expect(data.details).toBeDefined()
    })

    it('should handle quote not found', async () => {
      mockQuoteOperations.findById.mockResolvedValue(null)

      const requestBody = {
        status: 'IN_REVIEW',
        changedBy: 'admin@hexagono.xyz',
      }

      const request = new NextRequest('http://localhost:3000/api/quotes/quote-123/status', {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
        headers: {
          'content-type': 'application/json',
        },
      })

      const response = await PATCH(request, { params: { id: 'quote-123' } })
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Cotización no encontrada')
    })

    it('should not send notification if status unchanged', async () => {
      const unchangedQuote = { ...mockQuote, status: 'IN_REVIEW' }
      mockQuoteOperations.findById.mockResolvedValue(unchangedQuote)
      mockQuoteOperations.updateStatus.mockResolvedValue([mockUpdatedQuote])

      const requestBody = {
        status: 'IN_REVIEW',
        changedBy: 'admin@hexagono.xyz',
      }

      const request = new NextRequest('http://localhost:3000/api/quotes/quote-123/status', {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
        headers: {
          'content-type': 'application/json',
        },
      })

      await PATCH(request, { params: { id: 'quote-123' } })

      expect(mockSendStatusUpdateNotification).not.toHaveBeenCalled()
    })

    it('should handle notification sending errors gracefully', async () => {
      mockQuoteOperations.findById.mockResolvedValue(mockQuote)
      mockQuoteOperations.updateStatus.mockResolvedValue([mockUpdatedQuote])
      mockSendStatusUpdateNotification.mockRejectedValue(new Error('Email service unavailable'))

      const requestBody = {
        status: 'IN_REVIEW',
        changedBy: 'admin@hexagono.xyz',
      }

      const request = new NextRequest('http://localhost:3000/api/quotes/quote-123/status', {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
        headers: {
          'content-type': 'application/json',
        },
      })

      const response = await PATCH(request, { params: { id: 'quote-123' } })

      // Should still succeed even if notification fails
      expect(response.status).toBe(200)
      expect(mockQuoteOperations.updateStatus).toHaveBeenCalled()
    })
  })

  describe('GET', () => {
    const mockQuoteWithHistory = {
      id: 'quote-123',
      status: 'IN_REVIEW',
      statusHistory: [
        {
          id: 'history-1',
          previousStatus: null,
          newStatus: 'PENDING',
          changedBy: 'system',
          createdAt: new Date('2024-01-01'),
        },
        {
          id: 'history-2',
          previousStatus: 'PENDING',
          newStatus: 'IN_REVIEW',
          changedBy: 'admin@hexagono.xyz',
          createdAt: new Date('2024-01-02'),
        },
      ],
    }

    it('should get quote status history successfully', async () => {
      mockQuoteOperations.findById.mockResolvedValue(mockQuoteWithHistory)

      const request = new NextRequest('http://localhost:3000/api/quotes/quote-123/status', {
        method: 'GET',
      })

      const response = await GET(request, { params: { id: 'quote-123' } })

      expect(response.status).toBe(200)
      expect(mockCreateSuccessResponse).toHaveBeenCalledWith({
        currentStatus: 'IN_REVIEW',
        statusHistory: mockQuoteWithHistory.statusHistory,
      }, 'Historial de estado obtenido exitosamente')
    })

    it('should handle quote not found for status history', async () => {
      mockQuoteOperations.findById.mockResolvedValue(null)

      const request = new NextRequest('http://localhost:3000/api/quotes/quote-123/status', {
        method: 'GET',
      })

      const response = await GET(request, { params: { id: 'quote-123' } })
      const data = await response.json()

      expect(response.status).toBe(404)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Cotización no encontrada')
    })
  })

  describe('Error Handling', () => {
    it('should handle database errors', async () => {
      mockQuoteOperations.findById.mockRejectedValue(new Error('Database connection failed'))

      const requestBody = {
        status: 'IN_REVIEW',
        changedBy: 'admin@hexagono.xyz',
      }

      const request = new NextRequest('http://localhost:3000/api/quotes/quote-123/status', {
        method: 'PATCH',
        body: JSON.stringify(requestBody),
        headers: {
          'content-type': 'application/json',
        },
      })

      const response = await PATCH(request, { params: { id: 'quote-123' } })

      expect(mockHandleApiError).toHaveBeenCalledWith(expect.any(Error))
    })

    it('should handle malformed JSON', async () => {
      const request = new NextRequest('http://localhost:3000/api/quotes/quote-123/status', {
        method: 'PATCH',
        body: 'invalid json',
        headers: {
          'content-type': 'application/json',
        },
      })

      const response = await PATCH(request, { params: { id: 'quote-123' } })

      expect(mockHandleApiError).toHaveBeenCalled()
    })
  })
})