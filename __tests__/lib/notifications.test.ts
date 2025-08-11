import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import { NotificationService } from '@/lib/notifications'

// Mock dependencies
jest.mock('@/lib/email', () => ({
  sendEmailWithRetry: jest.fn(),
  emailConfig: {
    adminEmail: 'admin@hexagono.xyz',
  },
}))

jest.mock('@/lib/database', () => ({
  quoteOperations: {
    findById: jest.fn(),
    findMany: jest.fn(),
  },
}))

jest.mock('@/lib/email-templates', () => ({
  createClientQuoteConfirmationTemplate: jest.fn(),
  createAdminQuoteNotificationTemplate: jest.fn(),
  createQuoteStatusUpdateTemplate: jest.fn(),
  createReminderTemplate: jest.fn(),
}))

describe('NotificationService', () => {
  let notificationService: NotificationService
  let mockSendEmailWithRetry: jest.MockedFunction<any>
  let mockQuoteOperations: any
  let mockTemplates: any

  beforeEach(() => {
    jest.clearAllMocks()
    
    // Set up mocks
    mockSendEmailWithRetry = require('@/lib/email').sendEmailWithRetry
    mockQuoteOperations = require('@/lib/database').quoteOperations
    mockTemplates = require('@/lib/email-templates')

    // Set environment variable for testing
    process.env.NEXT_PUBLIC_APP_URL = 'https://test.hexagono.xyz'
    
    notificationService = new NotificationService()
  })

  describe('sendNewQuoteNotifications', () => {
    const mockQuote = {
      id: 'quote-123',
      quoteNumber: 'HEX-202401-0001',
      clientName: 'Juan Pérez',
      clientEmail: 'juan@example.com',
      serviceType: 'CORPORATE_WEB',
      estimatedPrice: 250000,
      accessToken: 'abc123token',
    }

    it('should send notifications to both client and admin', async () => {
      mockQuoteOperations.findById.mockResolvedValue(mockQuote)
      mockTemplates.createClientQuoteConfirmationTemplate.mockReturnValue({
        subject: 'Client Subject',
        html: '<p>Client HTML</p>',
        text: 'Client Text',
      })
      mockTemplates.createAdminQuoteNotificationTemplate.mockReturnValue({
        subject: 'Admin Subject',
        html: '<p>Admin HTML</p>',
        text: 'Admin Text',
      })
      mockSendEmailWithRetry.mockResolvedValue(true)

      const result = await notificationService.sendNewQuoteNotifications('quote-123')

      expect(result.clientNotified).toBe(true)
      expect(result.adminNotified).toBe(true)
      expect(mockSendEmailWithRetry).toHaveBeenCalledTimes(2)
      
      // Check client email
      expect(mockSendEmailWithRetry).toHaveBeenCalledWith({
        to: 'juan@example.com',
        subject: 'Client Subject',
        html: '<p>Client HTML</p>',
        text: 'Client Text',
      })
      
      // Check admin email
      expect(mockSendEmailWithRetry).toHaveBeenCalledWith({
        to: 'admin@hexagono.xyz',
        subject: 'Admin Subject',
        html: '<p>Admin HTML</p>',
        text: 'Admin Text',
      })
    })

    it('should handle quote not found', async () => {
      mockQuoteOperations.findById.mockResolvedValue(null)

      const result = await notificationService.sendNewQuoteNotifications('nonexistent')

      expect(result.clientNotified).toBe(false)
      expect(result.adminNotified).toBe(false)
      expect(mockSendEmailWithRetry).not.toHaveBeenCalled()
    })

    it('should handle email sending failures', async () => {
      mockQuoteOperations.findById.mockResolvedValue(mockQuote)
      mockTemplates.createClientQuoteConfirmationTemplate.mockReturnValue({
        subject: 'Subject',
        html: '<p>HTML</p>',
        text: 'Text',
      })
      mockTemplates.createAdminQuoteNotificationTemplate.mockReturnValue({
        subject: 'Subject',
        html: '<p>HTML</p>',
        text: 'Text',
      })
      mockSendEmailWithRetry
        .mockResolvedValueOnce(false) // Client email fails
        .mockResolvedValueOnce(true)  // Admin email succeeds

      const result = await notificationService.sendNewQuoteNotifications('quote-123')

      expect(result.clientNotified).toBe(false)
      expect(result.adminNotified).toBe(true)
    })
  })

  describe('sendStatusUpdateNotification', () => {
    const mockQuote = {
      id: 'quote-123',
      quoteNumber: 'HEX-202401-0001',
      clientName: 'Juan Pérez',
      clientEmail: 'juan@example.com',
      serviceType: 'CORPORATE_WEB',
      estimatedPrice: 250000,
      accessToken: 'abc123token',
    }

    it('should send status update notification', async () => {
      mockQuoteOperations.findById.mockResolvedValue(mockQuote)
      mockTemplates.createQuoteStatusUpdateTemplate.mockReturnValue({
        subject: 'Status Update Subject',
        html: '<p>Status Update HTML</p>',
        text: 'Status Update Text',
      })
      mockSendEmailWithRetry.mockResolvedValue(true)

      const result = await notificationService.sendStatusUpdateNotification(
        'quote-123',
        'QUOTED',
        'IN_REVIEW',
        'Cotización completada'
      )

      expect(result).toBe(true)
      expect(mockTemplates.createQuoteStatusUpdateTemplate).toHaveBeenCalledWith({
        quoteNumber: 'HEX-202401-0001',
        clientName: 'Juan Pérez',
        clientEmail: 'juan@example.com',
        serviceType: 'CORPORATE_WEB',
        estimatedPrice: 250000,
        trackingUrl: 'https://test.hexagono.xyz/cotizacion/seguimiento/abc123token',
        newStatus: 'QUOTED',
        previousStatus: 'IN_REVIEW',
        statusMessage: 'Cotización completada',
      })
    })
  })

  describe('sendReminderNotification', () => {
    it('should send reminder for pending quotes older than 48 hours', async () => {
      const oldDate = new Date(Date.now() - 50 * 60 * 60 * 1000) // 50 hours ago
      const mockQuote = {
        id: 'quote-123',
        quoteNumber: 'HEX-202401-0001',
        clientName: 'Juan Pérez',
        clientEmail: 'juan@example.com',
        serviceType: 'CORPORATE_WEB',
        status: 'PENDING',
        createdAt: oldDate,
        accessToken: 'abc123token',
      }

      mockQuoteOperations.findById.mockResolvedValue(mockQuote)
      mockTemplates.createReminderTemplate.mockReturnValue({
        subject: 'Reminder Subject',
        html: '<p>Reminder HTML</p>',
        text: 'Reminder Text',
      })
      mockSendEmailWithRetry.mockResolvedValue(true)

      const result = await notificationService.sendReminderNotification('quote-123')

      expect(result).toBe(true)
      expect(mockSendEmailWithRetry).toHaveBeenCalledWith({
        to: 'juan@example.com',
        subject: 'Reminder Subject',
        html: '<p>Reminder HTML</p>',
        text: 'Reminder Text',
      })
    })

    it('should not send reminder for recent quotes', async () => {
      const recentDate = new Date(Date.now() - 24 * 60 * 60 * 1000) // 24 hours ago
      const mockQuote = {
        id: 'quote-123',
        status: 'PENDING',
        createdAt: recentDate,
      }

      mockQuoteOperations.findById.mockResolvedValue(mockQuote)

      const result = await notificationService.sendReminderNotification('quote-123')

      expect(result).toBe(false)
      expect(mockSendEmailWithRetry).not.toHaveBeenCalled()
    })

    it('should not send reminder for non-pending quotes', async () => {
      const oldDate = new Date(Date.now() - 50 * 60 * 60 * 1000)
      const mockQuote = {
        id: 'quote-123',
        status: 'COMPLETED',
        createdAt: oldDate,
      }

      mockQuoteOperations.findById.mockResolvedValue(mockQuote)

      const result = await notificationService.sendReminderNotification('quote-123')

      expect(result).toBe(false)
      expect(mockSendEmailWithRetry).not.toHaveBeenCalled()
    })
  })

  describe('sendBulkReminderNotifications', () => {
    it('should process multiple quotes for reminders', async () => {
      const oldDate = new Date(Date.now() - 50 * 60 * 60 * 1000)
      const mockQuotes = [
        {
          id: 'quote-1',
          quoteNumber: 'HEX-202401-0001',
          clientName: 'Juan Pérez',
          clientEmail: 'juan@example.com',
          serviceType: 'CORPORATE_WEB',
          status: 'PENDING',
          createdAt: oldDate,
          accessToken: 'token1',
        },
        {
          id: 'quote-2',
          quoteNumber: 'HEX-202401-0002',
          clientName: 'María García',
          clientEmail: 'maria@example.com',
          serviceType: 'LANDING_PAGE',
          status: 'PENDING',
          createdAt: oldDate,
          accessToken: 'token2',
        },
      ]

      mockQuoteOperations.findMany.mockResolvedValue({
        quotes: mockQuotes,
      })
      
      // Mock individual reminder calls
      const sendReminderSpy = jest.spyOn(notificationService, 'sendReminderNotification')
      sendReminderSpy.mockResolvedValue(true)

      const result = await notificationService.sendBulkReminderNotifications()

      expect(result.processed).toBe(2)
      expect(result.successful).toBe(2)
      expect(result.failed).toBe(0)
      expect(sendReminderSpy).toHaveBeenCalledTimes(2)
    })
  })

  describe('sendHighPriorityNotification', () => {
    it('should send high priority notification for expensive quotes', async () => {
      const mockQuote = {
        id: 'quote-123',
        quoteNumber: 'HEX-202401-0001',
        clientName: 'Juan Pérez',
        clientEmail: 'juan@example.com',
        serviceType: 'ECOMMERCE',
        estimatedPrice: 400000, // Above 300k threshold
        accessToken: 'abc123token',
      }

      mockQuoteOperations.findById.mockResolvedValue(mockQuote)
      mockTemplates.createAdminQuoteNotificationTemplate.mockReturnValue({
        subject: '🔥 URGENTE - High Priority Subject',
        html: '<p>High Priority HTML</p>',
        text: 'High Priority Text',
      })
      mockSendEmailWithRetry.mockResolvedValue(true)

      const result = await notificationService.sendHighPriorityNotification('quote-123')

      expect(result).toBe(true)
      expect(mockSendEmailWithRetry).toHaveBeenCalledWith({
        to: 'admin@hexagono.xyz',
        subject: '🔥 URGENTE - High Priority Subject',
        html: '<p>High Priority HTML</p>',
        text: 'High Priority Text',
      })
    })

    it('should not send high priority notification for low-value quotes', async () => {
      const mockQuote = {
        id: 'quote-123',
        estimatedPrice: 200000, // Below 300k threshold
      }

      mockQuoteOperations.findById.mockResolvedValue(mockQuote)

      const result = await notificationService.sendHighPriorityNotification('quote-123')

      expect(result).toBe(false)
      expect(mockSendEmailWithRetry).not.toHaveBeenCalled()
    })
  })
})