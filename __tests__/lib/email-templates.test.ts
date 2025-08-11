import { describe, it, expect } from '@jest/globals'
import {
  createClientQuoteConfirmationTemplate,
  createAdminQuoteNotificationTemplate,
  createQuoteStatusUpdateTemplate,
  createReminderTemplate,
} from '@/lib/email-templates'
import { QuoteEmailData } from '@/lib/email'

describe('Email Templates', () => {
  const mockQuoteData: QuoteEmailData = {
    quoteNumber: 'HEX-202401-0001',
    clientName: 'Juan Pérez',
    clientEmail: 'juan@example.com',
    serviceType: 'CORPORATE_WEB',
    estimatedPrice: 250000,
    trackingUrl: 'https://hexagono.xyz/cotizacion/seguimiento/abc123',
    adminUrl: 'https://hexagono.xyz/admin/cotizaciones/quote-id-123',
  }

  describe('createClientQuoteConfirmationTemplate', () => {
    it('should create client confirmation template with all required elements', () => {
      const template = createClientQuoteConfirmationTemplate(mockQuoteData)

      expect(template.subject).toContain('HEX-202401-0001')
      expect(template.subject).toContain('Web Corporativa')
      expect(template.html).toContain('Juan Pérez')
      expect(template.html).toContain('HEX-202401-0001')
      expect(template.html).toContain('Web Corporativa')
      expect(template.html).toContain('$250.000')
      expect(template.html).toContain(mockQuoteData.trackingUrl)
      expect(template.text).toContain('Juan Pérez')
      expect(template.text).toContain('HEX-202401-0001')
    })

    it('should handle missing estimated price', () => {
      const dataWithoutPrice = { ...mockQuoteData, estimatedPrice: undefined }
      const template = createClientQuoteConfirmationTemplate(dataWithoutPrice)

      expect(template.html).toContain('A consultar')
      expect(template.text).toContain('A consultar')
    })

    it('should include contact information', () => {
      const template = createClientQuoteConfirmationTemplate(mockQuoteData)

      expect(template.html).toContain('contacto@hexagono.xyz')
      expect(template.html).toContain('+54 11 2378-2307')
      expect(template.text).toContain('contacto@hexagono.xyz')
      expect(template.text).toContain('+54 11 2378-2307')
    })
  })

  describe('createAdminQuoteNotificationTemplate', () => {
    it('should create admin notification template', () => {
      const template = createAdminQuoteNotificationTemplate(mockQuoteData)

      expect(template.subject).toContain('HEX-202401-0001')
      expect(template.subject).toContain('Web Corporativa')
      expect(template.html).toContain('Juan Pérez')
      expect(template.html).toContain('juan@example.com')
      expect(template.html).toContain('$250.000')
      expect(template.html).toContain(mockQuoteData.adminUrl)
    })

    it('should mark high priority quotes as urgent', () => {
      const highPriorityData = { ...mockQuoteData, estimatedPrice: 400000 }
      const template = createAdminQuoteNotificationTemplate(highPriorityData)

      expect(template.subject).toContain('🔥 URGENTE')
      expect(template.html).toContain('ALTA PRIORIDAD')
      expect(template.html).toContain('ALTA')
    })

    it('should handle normal priority quotes', () => {
      const template = createAdminQuoteNotificationTemplate(mockQuoteData)

      expect(template.subject).not.toContain('🔥 URGENTE')
      expect(template.html).toContain('Media')
    })
  })

  describe('createQuoteStatusUpdateTemplate', () => {
    it('should create status update template', () => {
      const statusData = {
        ...mockQuoteData,
        newStatus: 'QUOTED',
        statusMessage: 'Cotización completada y enviada',
        previousStatus: 'IN_REVIEW',
      }

      const template = createQuoteStatusUpdateTemplate(statusData)

      expect(template.subject).toContain('HEX-202401-0001')
      expect(template.subject).toContain('Cotizada')
      expect(template.html).toContain('Juan Pérez')
      expect(template.html).toContain('Cotizada')
      expect(template.html).toContain('Cotización completada y enviada')
      expect(template.html).toContain(mockQuoteData.trackingUrl)
    })

    it('should show special message for quoted status', () => {
      const statusData = {
        ...mockQuoteData,
        newStatus: 'QUOTED',
      }

      const template = createQuoteStatusUpdateTemplate(statusData)

      expect(template.html).toContain('¡Tu cotización está lista!')
    })

    it('should show special message for completed status', () => {
      const statusData = {
        ...mockQuoteData,
        newStatus: 'COMPLETED',
      }

      const template = createQuoteStatusUpdateTemplate(statusData)

      expect(template.html).toContain('¡Cotización completada!')
    })
  })

  describe('createReminderTemplate', () => {
    it('should create reminder template', () => {
      const template = createReminderTemplate(mockQuoteData)

      expect(template.subject).toContain('HEX-202401-0001')
      expect(template.subject).toContain('Recordatorio')
      expect(template.html).toContain('Juan Pérez')
      expect(template.html).toContain('HEX-202401-0001')
      expect(template.html).toContain('Web Corporativa')
      expect(template.html).toContain(mockQuoteData.trackingUrl)
      expect(template.text).toContain('Juan Pérez')
      expect(template.text).toContain('HEX-202401-0001')
    })

    it('should include contact information for additional questions', () => {
      const template = createReminderTemplate(mockQuoteData)

      expect(template.html).toContain('contacto@hexagono.xyz')
      expect(template.html).toContain('+54 11 2378-2307')
      expect(template.text).toContain('contacto@hexagono.xyz')
      expect(template.text).toContain('+54 11 2378-2307')
    })
  })

  describe('Service Type Display Names', () => {
    it('should correctly display all service types', () => {
      const serviceTypes = [
        { type: 'LANDING_PAGE', expected: 'Landing Page' },
        { type: 'CORPORATE_WEB', expected: 'Web Corporativa' },
        { type: 'ECOMMERCE', expected: 'Tienda Online' },
        { type: 'SOCIAL_MEDIA', expected: 'Gestión de Redes Sociales' },
      ]

      serviceTypes.forEach(({ type, expected }) => {
        const data = { ...mockQuoteData, serviceType: type }
        const template = createClientQuoteConfirmationTemplate(data)
        expect(template.html).toContain(expected)
      })
    })
  })

  describe('Template Structure', () => {
    it('should include proper HTML structure', () => {
      const template = createClientQuoteConfirmationTemplate(mockQuoteData)

      expect(template.html).toContain('<!DOCTYPE html>')
      expect(template.html).toContain('<html lang="es">')
      expect(template.html).toContain('<head>')
      expect(template.html).toContain('<body>')
      expect(template.html).toContain('</html>')
    })

    it('should include responsive meta tags', () => {
      const template = createClientQuoteConfirmationTemplate(mockQuoteData)

      expect(template.html).toContain('charset="UTF-8"')
      expect(template.html).toContain('viewport')
    })

    it('should include CSS styles', () => {
      const template = createClientQuoteConfirmationTemplate(mockQuoteData)

      expect(template.html).toContain('<style>')
      expect(template.html).toContain('font-family')
      expect(template.html).toContain('background')
    })
  })
})