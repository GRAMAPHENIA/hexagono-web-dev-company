import {
  calculateQuotePrice,
  getRecommendedFeatures,
  getPriceRange,
  isFeatureCompatible,
  calculateDevelopmentTime,
  ADDITIONAL_FEATURES,
  URGENCY_MULTIPLIERS,
  DISCOUNTS
} from '@/lib/utils/pricing'

describe('Pricing Utils', () => {
  describe('calculateQuotePrice', () => {
    it('should calculate base price for each service type', () => {
      const landingPage = calculateQuotePrice('LANDING_PAGE')
      expect(landingPage.basePrice).toBe(170000)
      expect(landingPage.totalPrice).toBe(170000)

      const corporateWeb = calculateQuotePrice('CORPORATE_WEB')
      expect(corporateWeb.basePrice).toBe(250000)
      expect(corporateWeb.totalPrice).toBe(250000)

      const ecommerce = calculateQuotePrice('ECOMMERCE')
      expect(ecommerce.basePrice).toBe(370000)
      expect(ecommerce.totalPrice).toBe(370000)

      const socialMedia = calculateQuotePrice('SOCIAL_MEDIA')
      expect(socialMedia.basePrice).toBe(180000)
      expect(socialMedia.totalPrice).toBe(180000)
    })

    it('should add feature costs correctly', () => {
      const features = ['seo-avanzado', 'analytics']
      const result = calculateQuotePrice('LANDING_PAGE', features)
      
      const expectedFeaturesPrice = ADDITIONAL_FEATURES['seo-avanzado'].price + 
                                   ADDITIONAL_FEATURES['analytics'].price
      
      expect(result.featuresPrice).toBe(expectedFeaturesPrice)
      expect(result.totalPrice).toBe(170000 + expectedFeaturesPrice)
    })

    it('should apply urgency multipliers', () => {
      const normalPrice = calculateQuotePrice('LANDING_PAGE', [], 'normal')
      const urgentPrice = calculateQuotePrice('LANDING_PAGE', [], 'urgente')
      const veryUrgentPrice = calculateQuotePrice('LANDING_PAGE', [], 'muy-urgente')

      expect(urgentPrice.totalPrice).toBe(Math.round(normalPrice.totalPrice * 1.25))
      expect(veryUrgentPrice.totalPrice).toBe(Math.round(normalPrice.totalPrice * 1.5))
    })

    it('should apply discounts correctly', () => {
      const normalPrice = calculateQuotePrice('LANDING_PAGE')
      const discountedPrice = calculateQuotePrice('LANDING_PAGE', [], 'normal', 'cliente-recurrente')

      const expectedDiscount = normalPrice.totalPrice * 0.1
      expect(discountedPrice.totalPrice).toBe(Math.round(normalPrice.totalPrice - expectedDiscount))
    })

    it('should combine urgency and discount', () => {
      const basePrice = 170000
      const urgencyMultiplier = URGENCY_MULTIPLIERS['urgente']
      const discountRate = DISCOUNTS['estudiante']
      
      const result = calculateQuotePrice('LANDING_PAGE', [], 'urgente', 'estudiante')
      const expected = Math.round(basePrice * urgencyMultiplier * (1 - discountRate))
      
      expect(result.totalPrice).toBe(expected)
    })

    it('should create detailed breakdown', () => {
      const features = ['seo-avanzado', 'analytics']
      const result = calculateQuotePrice('LANDING_PAGE', features)

      expect(result.breakdown.service.name).toBe('Landing Page')
      expect(result.breakdown.service.price).toBe(170000)
      expect(result.breakdown.features).toHaveLength(2)
      expect(result.breakdown.features[0].name).toBe('SEO Avanzado')
      expect(result.breakdown.features[1].name).toBe('Google Analytics')
    })
  })

  describe('getRecommendedFeatures', () => {
    it('should return appropriate features for each service type', () => {
      const landingFeatures = getRecommendedFeatures('LANDING_PAGE')
      expect(landingFeatures).toContain('seo-avanzado')
      expect(landingFeatures).toContain('popup-promocional')

      const corporateFeatures = getRecommendedFeatures('CORPORATE_WEB')
      expect(corporateFeatures).toContain('blog')
      expect(corporateFeatures).toContain('testimonios')

      const ecommerceFeatures = getRecommendedFeatures('ECOMMERCE')
      expect(ecommerceFeatures).toContain('pasarela-pagos')
      expect(ecommerceFeatures).toContain('inventario-avanzado')

      const socialFeatures = getRecommendedFeatures('SOCIAL_MEDIA')
      expect(socialFeatures).toContain('contenido-premium')
      expect(socialFeatures).toContain('stories-destacadas')
    })

    it('should return empty array for unknown service type', () => {
      const features = getRecommendedFeatures('UNKNOWN_SERVICE' as any)
      expect(features).toEqual([])
    })
  })

  describe('getPriceRange', () => {
    it('should return realistic price ranges', () => {
      const landingRange = getPriceRange('LANDING_PAGE')
      expect(landingRange.min).toBeGreaterThan(170000)
      expect(landingRange.max).toBeGreaterThan(landingRange.min)

      const ecommerceRange = getPriceRange('ECOMMERCE')
      expect(ecommerceRange.min).toBeGreaterThan(370000)
      expect(ecommerceRange.max).toBeGreaterThan(ecommerceRange.min)
    })

    it('should have higher ranges for more complex services', () => {
      const landingRange = getPriceRange('LANDING_PAGE')
      const ecommerceRange = getPriceRange('ECOMMERCE')

      expect(ecommerceRange.min).toBeGreaterThan(landingRange.min)
      expect(ecommerceRange.max).toBeGreaterThan(landingRange.max)
    })
  })

  describe('isFeatureCompatible', () => {
    it('should allow compatible features', () => {
      expect(isFeatureCompatible('LANDING_PAGE', 'seo-avanzado')).toBe(true)
      expect(isFeatureCompatible('CORPORATE_WEB', 'blog')).toBe(true)
      expect(isFeatureCompatible('ECOMMERCE', 'pasarela-pagos')).toBe(true)
      expect(isFeatureCompatible('SOCIAL_MEDIA', 'contenido-premium')).toBe(true)
    })

    it('should reject incompatible features', () => {
      expect(isFeatureCompatible('LANDING_PAGE', 'pasarela-pagos')).toBe(false)
      expect(isFeatureCompatible('LANDING_PAGE', 'inventario-avanzado')).toBe(false)
      expect(isFeatureCompatible('SOCIAL_MEDIA', 'pasarela-pagos')).toBe(false)
      expect(isFeatureCompatible('ECOMMERCE', 'campanas-publicitarias')).toBe(false)
    })
  })

  describe('calculateDevelopmentTime', () => {
    it('should return appropriate time ranges for each service', () => {
      const landingTime = calculateDevelopmentTime('LANDING_PAGE')
      expect(landingTime.min).toBe(7)
      expect(landingTime.max).toBe(14)

      const corporateTime = calculateDevelopmentTime('CORPORATE_WEB')
      expect(corporateTime.min).toBe(14)
      expect(corporateTime.max).toBe(21)

      const ecommerceTime = calculateDevelopmentTime('ECOMMERCE')
      expect(ecommerceTime.min).toBe(21)
      expect(ecommerceTime.max).toBe(35)

      const socialTime = calculateDevelopmentTime('SOCIAL_MEDIA')
      expect(socialTime.min).toBe(3)
      expect(socialTime.max).toBe(7)
    })

    it('should add time for additional features', () => {
      const baseTime = calculateDevelopmentTime('LANDING_PAGE')
      const withFeaturesTime = calculateDevelopmentTime('LANDING_PAGE', ['seo-avanzado', 'multiidioma'])

      expect(withFeaturesTime.min).toBeGreaterThan(baseTime.min)
      expect(withFeaturesTime.max).toBeGreaterThan(baseTime.max)
    })

    it('should handle unknown features gracefully', () => {
      const baseTime = calculateDevelopmentTime('LANDING_PAGE')
      const withUnknownFeature = calculateDevelopmentTime('LANDING_PAGE', ['unknown-feature'])

      // Should add default 1 day for unknown features
      expect(withUnknownFeature.min).toBe(baseTime.min + Math.floor(1 * 0.7))
      expect(withUnknownFeature.max).toBe(baseTime.max + 1)
    })
  })

  describe('ADDITIONAL_FEATURES', () => {
    it('should have all required properties', () => {
      Object.values(ADDITIONAL_FEATURES).forEach(feature => {
        expect(feature).toHaveProperty('name')
        expect(feature).toHaveProperty('price')
        expect(feature).toHaveProperty('description')
        expect(typeof feature.name).toBe('string')
        expect(typeof feature.price).toBe('number')
        expect(typeof feature.description).toBe('string')
        expect(feature.price).toBeGreaterThan(0)
      })
    })
  })

  describe('URGENCY_MULTIPLIERS', () => {
    it('should have correct multiplier values', () => {
      expect(URGENCY_MULTIPLIERS.normal).toBe(1.0)
      expect(URGENCY_MULTIPLIERS.urgente).toBe(1.25)
      expect(URGENCY_MULTIPLIERS['muy-urgente']).toBe(1.5)
    })
  })

  describe('DISCOUNTS', () => {
    it('should have valid discount rates', () => {
      Object.values(DISCOUNTS).forEach(discount => {
        expect(discount).toBeGreaterThan(0)
        expect(discount).toBeLessThan(1)
      })
    })
  })
})