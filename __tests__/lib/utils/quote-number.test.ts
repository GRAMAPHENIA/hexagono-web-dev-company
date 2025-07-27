import {
  generateQuoteNumber,
  isValidQuoteNumber,
  extractDateFromQuoteNumber,
  extractSequenceFromQuoteNumber,
  generateAccessToken,
  isValidAccessToken
} from '@/lib/utils/quote-number'

describe('Quote Number Utilities', () => {
  describe('generateQuoteNumber', () => {
    it('should generate a quote number with correct format', () => {
      const quoteNumber = generateQuoteNumber(1)
      expect(quoteNumber).toMatch(/^COT-\d{8}-\d{4}$/)
    })

    it('should generate quote number with provided sequence', () => {
      const quoteNumber = generateQuoteNumber(123)
      expect(quoteNumber).toMatch(/^COT-\d{8}-0123$/)
    })

    it('should generate quote number with current date', () => {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      const expectedDatePart = `${year}${month}${day}`
      
      const quoteNumber = generateQuoteNumber(1)
      expect(quoteNumber).toContain(expectedDatePart)
    })

    it('should pad sequence number with zeros', () => {
      const quoteNumber = generateQuoteNumber(5)
      expect(quoteNumber).toMatch(/^COT-\d{8}-0005$/)
    })

    it('should generate different numbers when called multiple times', () => {
      const quote1 = generateQuoteNumber()
      const quote2 = generateQuoteNumber()
      expect(quote1).not.toBe(quote2)
    })
  })

  describe('isValidQuoteNumber', () => {
    it('should validate correct quote number format', () => {
      expect(isValidQuoteNumber('COT-20241221-0001')).toBe(true)
      expect(isValidQuoteNumber('COT-20240101-9999')).toBe(true)
    })

    it('should reject invalid quote number formats', () => {
      expect(isValidQuoteNumber('COT-2024121-0001')).toBe(false) // Wrong date format
      expect(isValidQuoteNumber('COT-20241221-001')).toBe(false) // Wrong sequence format
      expect(isValidQuoteNumber('QUOTE-20241221-0001')).toBe(false) // Wrong prefix
      expect(isValidQuoteNumber('COT-20241221')).toBe(false) // Missing sequence
      expect(isValidQuoteNumber('')).toBe(false) // Empty string
      expect(isValidQuoteNumber('invalid')).toBe(false) // Completely invalid
    })
  })

  describe('extractDateFromQuoteNumber', () => {
    it('should extract correct date from valid quote number', () => {
      const date = extractDateFromQuoteNumber('COT-20241221-0001')
      expect(date).toBeInstanceOf(Date)
      expect(date?.getFullYear()).toBe(2024)
      expect(date?.getMonth()).toBe(11) // December (0-indexed)
      expect(date?.getDate()).toBe(21)
    })

    it('should return null for invalid quote number', () => {
      expect(extractDateFromQuoteNumber('invalid')).toBeNull()
      expect(extractDateFromQuoteNumber('COT-2024121-0001')).toBeNull()
    })

    it('should handle different valid dates', () => {
      const date1 = extractDateFromQuoteNumber('COT-20240101-0001')
      expect(date1?.getMonth()).toBe(0) // January
      expect(date1?.getDate()).toBe(1)

      const date2 = extractDateFromQuoteNumber('COT-20241231-9999')
      expect(date2?.getMonth()).toBe(11) // December
      expect(date2?.getDate()).toBe(31)
    })
  })

  describe('extractSequenceFromQuoteNumber', () => {
    it('should extract correct sequence from valid quote number', () => {
      expect(extractSequenceFromQuoteNumber('COT-20241221-0001')).toBe(1)
      expect(extractSequenceFromQuoteNumber('COT-20241221-0123')).toBe(123)
      expect(extractSequenceFromQuoteNumber('COT-20241221-9999')).toBe(9999)
    })

    it('should return null for invalid quote number', () => {
      expect(extractSequenceFromQuoteNumber('invalid')).toBeNull()
      expect(extractSequenceFromQuoteNumber('COT-2024121-0001')).toBeNull()
    })

    it('should handle leading zeros correctly', () => {
      expect(extractSequenceFromQuoteNumber('COT-20241221-0001')).toBe(1)
      expect(extractSequenceFromQuoteNumber('COT-20241221-0010')).toBe(10)
      expect(extractSequenceFromQuoteNumber('COT-20241221-0100')).toBe(100)
    })
  })

  describe('generateAccessToken', () => {
    it('should generate a 32-character token', () => {
      const token = generateAccessToken()
      expect(token).toHaveLength(32)
    })

    it('should generate tokens with only alphanumeric characters', () => {
      const token = generateAccessToken()
      expect(token).toMatch(/^[A-Za-z0-9]+$/)
    })

    it('should generate different tokens each time', () => {
      const token1 = generateAccessToken()
      const token2 = generateAccessToken()
      expect(token1).not.toBe(token2)
    })

    it('should generate tokens multiple times without collision (statistical test)', () => {
      const tokens = new Set()
      for (let i = 0; i < 100; i++) {
        tokens.add(generateAccessToken())
      }
      expect(tokens.size).toBe(100) // All tokens should be unique
    })
  })

  describe('isValidAccessToken', () => {
    it('should validate correct access token format', () => {
      const validToken = 'abcdefghijklmnopqrstuvwxyz123456'
      expect(isValidAccessToken(validToken)).toBe(true)
    })

    it('should reject invalid access token formats', () => {
      expect(isValidAccessToken('short')).toBe(false) // Too short
      expect(isValidAccessToken('abcdefghijklmnopqrstuvwxyz1234567')).toBe(false) // Too long
      expect(isValidAccessToken('abcdefghijklmnopqrstuvwxyz12345!')).toBe(false) // Invalid character
      expect(isValidAccessToken('')).toBe(false) // Empty string
      expect(isValidAccessToken('abcdefghijklmnopqrstuvwxyz12345 ')).toBe(false) // Contains space
    })

    it('should accept tokens generated by generateAccessToken', () => {
      for (let i = 0; i < 10; i++) {
        const token = generateAccessToken()
        expect(isValidAccessToken(token)).toBe(true)
      }
    })
  })
})