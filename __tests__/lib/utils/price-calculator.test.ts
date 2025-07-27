import {
  getBasePrice,
  getFeatureCost,
  calculatePriceEstimate,
  formatPrice,
  calculatePriority,
  getAvailableFeatures,
  validateFeatures
} from '@/lib/utils/price-calculator'
import type { ServiceType } from '@/lib/types/quote'

describe('Price Calculator Utilities', () => {
  describe('getBasePrice', () => {
    it('should return correct base prices for each service type', () => {
      expect(getBasePrice('LANDING_PAGE')).toBe(170000)
      expect(getBasePrice('CORPORATE_WEB')).toBe(250000)
      expect(getBasePrice('ECOMMERCE')).toBe(370000)
      expect(getBasePrice('SOCIAL_MEDIA')).toBe(85000)
    })

    it('should return 0 for invalid service type', () => {
      expect(getBasePrice('INVALID' as ServiceType)).toBe(0)
    })
  })

  describe('getFeatureCost', () => {
    it('should return correct costs for known features', () => {
      expect(getFeatureCost('contact-form')).toBe(15000)
      expect(getFeatureCost('seo-optimization')).toBe(25000)
      expect(getFeatureCost('payment-gateway')).toBe(60000)
      expect(getFeatureCost('blog-system')).toBe(45000)
    })

    it('should return 0 for unknown features', () => {
      expect(getFeatureCost('unknown-feature')).toBe(0)
      expect(getFeatureCost('')).toBe(0)
    })
  })

  describe('calculatePriceEstimate', () => {
    it('should calculate correct estimate for service without features', () => {
      const estimate = calculatePriceEstimate('LANDING_PAGE', [])
      
      expect(estimate.basePrice).toBe(170000)
      expect(estimate.additionalFeatures).toHaveLength(0)
      expect(estimate.totalEstimate).toBe(170000)
      expect(estimate.currency).toBe('ARS')
      expect(estimate.disclaimer).toContain('precio estimado')
    })

    it('should calculate correct estimate with valid features', () => {
      const features = ['contact-form', 'seo-optimization']
      const estimate = calculatePriceEstimate('LANDING_PAGE', features)
      
      expect(estimate.basePrice).toBe(170000)
      expect(estimate.additionalFeatures).toHaveLength(2)
      expect(estimate.additionalFeatures[0]).toEqual({ name: 'contact-form', cost: 15000 })
      expect(estimate.additionalFeatures[1]).toEqual({ name: 'seo-optimization', cost: 25000 })
      expect(estimate.totalEstimate).toBe(210000) // 170000 + 15000 + 25000
    })

    it('should ignore features with zero cost', () => {
      const features = ['contact-form', 'unknown-feature', 'seo-optimization']
      const estimate = calculatePriceEstimate('LANDING_PAGE', features)
      
      expect(estimate.additionalFeatures).toHaveLength(2) // Only valid features
      expect(estimate.totalEstimate).toBe(210000) // Should not include unknown feature
    })

    it('should handle empty features array', () => {
      const estimate = calculatePriceEstimate('CORPORATE_WEB')
      
      expect(estimate.basePrice).toBe(250000)
      expect(estimate.additionalFeatures).toHaveLength(0)
      expect(estimate.totalEstimate).toBe(250000)
    })

    it('should calculate complex estimates correctly', () => {
      const features = ['payment-gateway', 'inventory-management', 'customer-accounts']
      const estimate = calculatePriceEstimate('ECOMMERCE', features)
      
      const expectedTotal = 370000 + 60000 + 70000 + 35000 // Base + features
      expect(estimate.totalEstimate).toBe(expectedTotal)
    })
  })

  describe('formatPrice', () => {
    it('should format prices in Argentine pesos', () => {
      expect(formatPrice(170000)).toBe('$170.000')
      expect(formatPrice(1000000)).toBe('$1.000.000')
      expect(formatPrice(0)).toBe('$0')
    })

    it('should handle decimal numbers by rounding', () => {
      expect(formatPrice(170000.99)).toBe('$170.001')
      expect(formatPrice(170000.49)).toBe('$170.000')
    })

    it('should handle negative numbers', () => {
      expect(formatPrice(-1000)).toBe('-$1.000')
    })
  })

  describe('calculatePriority', () => {
    it('should return HIGH priority for prices >= 300000', () => {
      expect(calculatePriority(300000)).toBe('HIGH')
      expect(calculatePriority(500000)).toBe('HIGH')
      expect(calculatePriority(1000000)).toBe('HIGH')
    })

    it('should return MEDIUM priority for prices >= 150000 and < 300000', () => {
      expect(calculatePriority(150000)).toBe('MEDIUM')
      expect(calculatePriority(200000)).toBe('MEDIUM')
      expect(calculatePriority(299999)).toBe('MEDIUM')
    })

    it('should return LOW priority for prices < 150000', () => {
      expect(calculatePriority(0)).toBe('LOW')
      expect(calculatePriority(100000)).toBe('LOW')
      expect(calculatePriority(149999)).toBe('LOW')
    })
  })

  describe('getAvailableFeatures', () => {
    it('should return correct features for LANDING_PAGE', () => {
      const features = getAvailableFeatures('LANDING_PAGE')
      
      expect(features).toContain('contact-form')
      expect(features).toContain('newsletter-signup')
      expect(features).toContain('seo-optimization')
      expect(features).not.toContain('blog-system') // Corporate feature
      expect(features).not.toContain('payment-gateway') // E-commerce feature
    })

    it('should return correct features for CORPORATE_WEB', () => {
      const features = getAvailableFeatures('CORPORATE_WEB')
      
      expect(features).toContain('blog-system')
      expect(features).toContain('team-section')
      expect(features).toContain('seo-optimization') // Common feature
      expect(features).not.toContain('payment-gateway') // E-commerce feature
      expect(features).not.toContain('contact-form') // Landing page specific
    })

    it('should return correct features for ECOMMERCE', () => {
      const features = getAvailableFeatures('ECOMMERCE')
      
      expect(features).toContain('payment-gateway')
      expect(features).toContain('inventory-management')
      expect(features).toContain('seo-optimization') // Common feature
      expect(features).not.toContain('blog-system') // Corporate feature
      expect(features).not.toContain('contact-form') // Landing page specific
    })

    it('should return correct features for SOCIAL_MEDIA', () => {
      const features = getAvailableFeatures('SOCIAL_MEDIA')
      
      expect(features).toContain('active-plan-upgrade')
      expect(features).toContain('premium-plan-upgrade')
      expect(features).toContain('content-calendar')
      expect(features).not.toContain('seo-optimization') // Not applicable
      expect(features).not.toContain('payment-gateway') // Not applicable
    })

    it('should include common features for web services', () => {
      const landingFeatures = getAvailableFeatures('LANDING_PAGE')
      const corporateFeatures = getAvailableFeatures('CORPORATE_WEB')
      const ecommerceFeatures = getAvailableFeatures('ECOMMERCE')
      
      const commonFeatures = ['seo-optimization', 'analytics-setup', 'hosting-setup']
      
      commonFeatures.forEach(feature => {
        expect(landingFeatures).toContain(feature)
        expect(corporateFeatures).toContain(feature)
        expect(ecommerceFeatures).toContain(feature)
      })
    })
  })

  describe('validateFeatures', () => {
    it('should validate all features are available for service type', () => {
      const features = ['contact-form', 'seo-optimization']
      const result = validateFeatures('LANDING_PAGE', features)
      
      expect(result.isValid).toBe(true)
      expect(result.validFeatures).toEqual(features)
      expect(result.invalidFeatures).toHaveLength(0)
    })

    it('should identify invalid features for service type', () => {
      const features = ['contact-form', 'payment-gateway', 'seo-optimization']
      const result = validateFeatures('LANDING_PAGE', features)
      
      expect(result.isValid).toBe(false)
      expect(result.validFeatures).toEqual(['contact-form', 'seo-optimization'])
      expect(result.invalidFeatures).toEqual(['payment-gateway'])
    })

    it('should handle empty features array', () => {
      const result = validateFeatures('LANDING_PAGE', [])
      
      expect(result.isValid).toBe(true)
      expect(result.validFeatures).toHaveLength(0)
      expect(result.invalidFeatures).toHaveLength(0)
    })

    it('should handle all invalid features', () => {
      const features = ['payment-gateway', 'inventory-management']
      const result = validateFeatures('LANDING_PAGE', features)
      
      expect(result.isValid).toBe(false)
      expect(result.validFeatures).toHaveLength(0)
      expect(result.invalidFeatures).toEqual(features)
    })

    it('should validate features correctly for different service types', () => {
      // Test e-commerce specific feature
      const ecommerceResult = validateFeatures('ECOMMERCE', ['payment-gateway'])
      expect(ecommerceResult.isValid).toBe(true)
      
      // Same feature should be invalid for landing page
      const landingResult = validateFeatures('LANDING_PAGE', ['payment-gateway'])
      expect(landingResult.isValid).toBe(false)
    })
  })
})