import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import { NextRequest } from 'next/server'
import { POST, GET } from '@/app/api/cron/reminders/route'

// Mock the notifications module
jest.mock('@/lib/notifications', () => ({
  sendBulkReminderNotifications: jest.fn(),
}))

describe('/api/cron/reminders', () => {
  let mockSendBulkReminderNotifications: jest.MockedFunction<any>

  beforeEach(() => {
    jest.clearAllMocks()
    mockSendBulkReminderNotifications = require('@/lib/notifications').sendBulkReminderNotifications
    
    // Set up environment variables
    process.env.CRON_SECRET = 'test-secret'
    process.env.NODE_ENV = 'test'
  })

  describe('POST', () => {
    it('should process reminders with valid authorization', async () => {
      mockSendBulkReminderNotifications.mockResolvedValue({
        processed: 5,
        successful: 4,
        failed: 1,
      })

      const request = new NextRequest('http://localhost:3000/api/cron/reminders', {
        method: 'POST',
        headers: {
          'authorization': 'Bearer test-secret',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data.processed).toBe(5)
      expect(data.data.successful).toBe(4)
      expect(data.data.failed).toBe(1)
      expect(mockSendBulkReminderNotifications).toHaveBeenCalledTimes(1)
    })

    it('should reject unauthorized requests', async () => {
      const request = new NextRequest('http://localhost:3000/api/cron/reminders', {
        method: 'POST',
        headers: {
          'authorization': 'Bearer wrong-secret',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
      expect(mockSendBulkReminderNotifications).not.toHaveBeenCalled()
    })

    it('should reject requests without authorization header', async () => {
      const request = new NextRequest('http://localhost:3000/api/cron/reminders', {
        method: 'POST',
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(401)
      expect(data.error).toBe('Unauthorized')
      expect(mockSendBulkReminderNotifications).not.toHaveBeenCalled()
    })

    it('should handle errors in reminder processing', async () => {
      mockSendBulkReminderNotifications.mockRejectedValue(new Error('Database connection failed'))

      const request = new NextRequest('http://localhost:3000/api/cron/reminders', {
        method: 'POST',
        headers: {
          'authorization': 'Bearer test-secret',
        },
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Failed to process reminder notifications')
      expect(data.message).toBe('Database connection failed')
    })
  })

  describe('GET', () => {
    it('should work in development environment', async () => {
      process.env.NODE_ENV = 'development'
      
      mockSendBulkReminderNotifications.mockResolvedValue({
        processed: 2,
        successful: 2,
        failed: 0,
      })

      const request = new NextRequest('http://localhost:3000/api/cron/reminders', {
        method: 'GET',
      })

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data.processed).toBe(2)
      expect(mockSendBulkReminderNotifications).toHaveBeenCalledTimes(1)
    })

    it('should be forbidden in production environment', async () => {
      process.env.NODE_ENV = 'production'

      const request = new NextRequest('http://localhost:3000/api/cron/reminders', {
        method: 'GET',
      })

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(403)
      expect(data.error).toBe('This endpoint is only available in development')
      expect(mockSendBulkReminderNotifications).not.toHaveBeenCalled()
    })

    it('should handle errors in development testing', async () => {
      process.env.NODE_ENV = 'development'
      mockSendBulkReminderNotifications.mockRejectedValue(new Error('Test error'))

      const request = new NextRequest('http://localhost:3000/api/cron/reminders', {
        method: 'GET',
      })

      const response = await GET(request)
      const data = await response.json()

      expect(response.status).toBe(500)
      expect(data.success).toBe(false)
      expect(data.error).toBe('Failed to test reminder notifications')
    })
  })
})