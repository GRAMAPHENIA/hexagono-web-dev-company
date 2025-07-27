import {
  formatPrice,
  formatNumber,
  formatFileSize,
  formatPhoneNumber,
  formatSlug,
  formatQuoteStatus,
  formatPriority,
  formatServiceType,
  truncateText,
  capitalize,
  toTitleCase
} from '@/lib/utils/format'

describe('Format Utils', () => {
  describe('formatPrice', () => {
    it('should format prices in ARS currency', () => {
      expect(formatPrice(100000)).toBe('$100.000')
      expect(formatPrice(250000)).toBe('$250.000')
      expect(formatPrice(1500000)).toBe('$1.500.000')
    })

    it('should format prices without currency symbol', () => {
      expect(formatPrice(100000, false)).toBe('100.000')
      expect(formatPrice(250000, false)).toBe('250.000')
    })

    it('should handle zero and negative values', () => {
      expect(formatPrice(0)).toBe('$0')
      expect(formatPrice(-100)).toBe('-$100')
    })
  })

  describe('formatNumber', () => {
    it('should format numbers with thousand separators', () => {
      expect(formatNumber(1000)).toBe('1.000')
      expect(formatNumber(1000000)).toBe('1.000.000')
      expect(formatNumber(123456789)).toBe('123.456.789')
    })

    it('should handle small numbers', () => {
      expect(formatNumber(0)).toBe('0')
      expect(formatNumber(123)).toBe('123')
    })
  })

  describe('formatFileSize', () => {
    it('should format file sizes correctly', () => {
      expect(formatFileSize(0)).toBe('0 Bytes')
      expect(formatFileSize(1024)).toBe('1 KB')
      expect(formatFileSize(1048576)).toBe('1 MB')
      expect(formatFileSize(1073741824)).toBe('1 GB')
    })

    it('should handle decimal values', () => {
      expect(formatFileSize(1536)).toBe('1.5 KB')
      expect(formatFileSize(2621440)).toBe('2.5 MB')
    })
  })

  describe('formatPhoneNumber', () => {
    it('should format Argentine phone numbers', () => {
      expect(formatPhoneNumber('+5491123456789')).toBe('+54 91 1234-5678')
      expect(formatPhoneNumber('+5411123456789')).toBe('+54 11 1234-5678')
    })

    it('should return original format for non-Argentine numbers', () => {
      expect(formatPhoneNumber('+1234567890')).toBe('+1234567890')
      expect(formatPhoneNumber('123-456-7890')).toBe('123-456-7890')
    })
  })

  describe('formatSlug', () => {
    it('should create URL-friendly slugs', () => {
      expect(formatSlug('Hola Mundo')).toBe('hola-mundo')
      expect(formatSlug('Título con Acentos')).toBe('titulo-con-acentos')
      expect(formatSlug('Texto con Ñ y símbolos!')).toBe('texto-con-n-y-simbolos')
    })

    it('should handle special characters', () => {
      expect(formatSlug('Test@#$%^&*()')).toBe('test')
      expect(formatSlug('Multiple   Spaces')).toBe('multiple-spaces')
      expect(formatSlug('---Multiple---Dashes---')).toBe('multiple-dashes')
    })
  })

  describe('formatQuoteStatus', () => {
    it('should format quote statuses to Spanish', () => {
      expect(formatQuoteStatus('PENDING')).toBe('Pendiente')
      expect(formatQuoteStatus('IN_REVIEW')).toBe('En Revisión')
      expect(formatQuoteStatus('QUOTED')).toBe('Cotizada')
      expect(formatQuoteStatus('COMPLETED')).toBe('Completada')
      expect(formatQuoteStatus('CANCELLED')).toBe('Cancelada')
    })

    it('should return original value for unknown statuses', () => {
      expect(formatQuoteStatus('UNKNOWN_STATUS')).toBe('UNKNOWN_STATUS')
    })
  })

  describe('formatPriority', () => {
    it('should format priorities to Spanish', () => {
      expect(formatPriority('LOW')).toBe('Baja')
      expect(formatPriority('MEDIUM')).toBe('Media')
      expect(formatPriority('HIGH')).toBe('Alta')
    })

    it('should return original value for unknown priorities', () => {
      expect(formatPriority('UNKNOWN_PRIORITY')).toBe('UNKNOWN_PRIORITY')
    })
  })

  describe('formatServiceType', () => {
    it('should format service types to Spanish', () => {
      expect(formatServiceType('LANDING_PAGE')).toBe('Landing Page')
      expect(formatServiceType('CORPORATE_WEB')).toBe('Web Corporativa')
      expect(formatServiceType('ECOMMERCE')).toBe('Tienda Online')
      expect(formatServiceType('SOCIAL_MEDIA')).toBe('Gestión de Redes Sociales')
    })

    it('should return original value for unknown service types', () => {
      expect(formatServiceType('UNKNOWN_SERVICE')).toBe('UNKNOWN_SERVICE')
    })
  })

  describe('truncateText', () => {
    it('should truncate long text', () => {
      const longText = 'Este es un texto muy largo que debería ser truncado'
      expect(truncateText(longText, 20)).toBe('Este es un texto muy...')
    })

    it('should not truncate short text', () => {
      const shortText = 'Texto corto'
      expect(truncateText(shortText, 20)).toBe('Texto corto')
    })

    it('should use default length of 100', () => {
      const text = 'A'.repeat(150)
      const result = truncateText(text)
      expect(result).toHaveLength(103) // 100 + '...'
      expect(result.endsWith('...')).toBe(true)
    })
  })

  describe('capitalize', () => {
    it('should capitalize first letter', () => {
      expect(capitalize('hello')).toBe('Hello')
      expect(capitalize('WORLD')).toBe('World')
      expect(capitalize('tEST')).toBe('Test')
    })

    it('should handle empty strings', () => {
      expect(capitalize('')).toBe('')
    })
  })

  describe('toTitleCase', () => {
    it('should convert to title case', () => {
      expect(toTitleCase('hello world')).toBe('Hello World')
      expect(toTitleCase('HELLO WORLD')).toBe('Hello World')
      expect(toTitleCase('hELLo WoRLd')).toBe('Hello World')
    })

    it('should handle single words', () => {
      expect(toTitleCase('hello')).toBe('Hello')
      expect(toTitleCase('HELLO')).toBe('Hello')
    })
  })
})