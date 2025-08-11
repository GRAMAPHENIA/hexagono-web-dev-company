import { describe, it, expect, jest, beforeEach } from '@jest/globals'
import { 
  sendEmail, 
  sendEmailWithRetry, 
  isValidEmail, 
  formatPriceForEmail, 
  getServiceTypeDisplayName 
} from '@/lib/email'

// Mock Resend
jest.mock('resend', () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: {
      send: jest.fn(),
    },
  })),
}))

describe('Email Service', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name+tag@domain.co.uk')).toBe(true)
      expect(isValidEmail('user@subdomain.domain.com')).toBe(true)
    })

    it('should reject invalid email addresses', () => {
      expect(isValidEmail('invalid-email')).toBe(false)
      expect(isValidEmail('test@')).toBe(false)
      expect(isValidEmail('@domain.com')).toBe(false)
      expect(isValidEmail('test.domain.com')).toBe(false)
      expect(isValidEmail('')).toBe(false)
    })
  })

  describe('formatPriceForEmail', () => {
    it('should format prices correctly for Argentine locale', () => {
      expect(formatPriceForEmail(250000)).toBe('$250.000')
      expect(formatPriceForEmail(1500000)).toBe('$1.500.000')
      expect(formatPriceForEmail(100)).toBe('$100')
    })

    it('should handle zero and negative values', () => {
      expect(formatPriceForEmail(0)).toBe('$0')
      expect(formatPriceForEmail(-100)).toBe('-$100')
    })
  })

  describe('getServiceTypeDisplayName', () => {
    it('should return correct display names for service types', () => {
      expect(getServiceTypeDisplayName('LANDING_PAGE')).toBe('Landing Page')
      expect(getServiceTypeDisplayName('CORPORATE_WEB')).toBe('Web Corporativa')
      expect(getServiceTypeDisplayName('ECOMMERCE')).toBe('Tienda Online')
      expect(getServiceTypeDisplayName('SOCIAL_MEDIA')).toBe('Gestión de Redes Sociales')
    })

    it('should return original value for unknown service types', () => {
      expect(getServiceTypeDisplayName('UNKNOWN_TYPE')).toBe('UNKNOWN_TYPE')
    })
  })

  describe('sendEmail', () => {
    it('should send email successfully', async () => {
      const mockSend = jest.fn().mockResolvedValue({
        data: { id: 'email-id-123' },
        error: null,
      })

      // Mock the resend instance
      const { Resend } = require('resend')
      Resend.mockImplementation(() => ({
        emails: { send: mockSend },
      }))

      const template = {
        to: 'test@example.com',
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
        text: 'Test text',
      }

      const result = await sendEmail(template)

      expect(result).toBe(true)
      expect(mockSend).toHaveBeenCalledWith({
        from: 'contacto@hexagono.xyz',
        to: 'test@example.com',
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
        text: 'Test text',
        replyTo: 'contacto@hexagono.xyz',
      })
    })

    it('should handle email sending errors', async () => {
      const mockSend = jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'Email sending failed' },
      })

      const { Resend } = require('resend')
      Resend.mockImplementation(() => ({
        emails: { send: mockSend },
      }))

      const template = {
        to: 'test@example.com',
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
      }

      const result = await sendEmail(template)

      expect(result).toBe(false)
    })
  })

  describe('sendEmailWithRetry', () => {
    it('should retry failed email sends', async () => {
      const mockSend = jest.fn()
        .mockResolvedValueOnce({ data: null, error: { message: 'Failed' } })
        .mockResolvedValueOnce({ data: { id: 'email-id-123' }, error: null })

      const { Resend } = require('resend')
      Resend.mockImplementation(() => ({
        emails: { send: mockSend },
      }))

      const template = {
        to: 'test@example.com',
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
      }

      const result = await sendEmailWithRetry(template, 3, 100)

      expect(result).toBe(true)
      expect(mockSend).toHaveBeenCalledTimes(2)
    })

    it('should fail after max retries', async () => {
      const mockSend = jest.fn().mockResolvedValue({
        data: null,
        error: { message: 'Failed' },
      })

      const { Resend } = require('resend')
      Resend.mockImplementation(() => ({
        emails: { send: mockSend },
      }))

      const template = {
        to: 'test@example.com',
        subject: 'Test Subject',
        html: '<p>Test HTML</p>',
      }

      const result = await sendEmailWithRetry(template, 2, 50)

      expect(result).toBe(false)
      expect(mockSend).toHaveBeenCalledTimes(2)
    })
  })
})