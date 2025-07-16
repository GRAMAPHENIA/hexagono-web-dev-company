import { 
  webPlans, 
  socialPlans, 
  formatPrice, 
  getAllPlans, 
  getPlansByCategory, 
  getPlanById 
} from '@/lib/pricing'

describe('Pricing utilities', () => {
  describe('formatPrice', () => {
    it('formats ARS currency correctly', () => {
      expect(formatPrice(170000, 'ARS')).toMatch(/\$\s?170\.000/)
    })

    it('formats USD currency correctly', () => {
      expect(formatPrice(1000, 'USD')).toMatch(/US\$\s?1\.000/)
    })

    it('uses ARS as default currency', () => {
      expect(formatPrice(170000)).toMatch(/\$\s?170\.000/)
    })
  })

  describe('getAllPlans', () => {
    it('returns all plans from both categories', () => {
      const allPlans = getAllPlans()
      expect(allPlans.length).toBe(webPlans.length + socialPlans.length)
    })
  })

  describe('getPlansByCategory', () => {
    it('returns only web plans when category is web', () => {
      const plans = getPlansByCategory('web')
      expect(plans).toEqual(webPlans)
      expect(plans.every(plan => plan.category === 'web')).toBe(true)
    })

    it('returns only social plans when category is social', () => {
      const plans = getPlansByCategory('social')
      expect(plans).toEqual(socialPlans)
      expect(plans.every(plan => plan.category === 'social')).toBe(true)
    })
  })

  describe('getPlanById', () => {
    it('returns correct plan when ID exists', () => {
      const plan = getPlanById('landing-page')
      expect(plan).toBeDefined()
      expect(plan?.title).toBe('Landing Page')
    })

    it('returns undefined when ID does not exist', () => {
      const plan = getPlanById('non-existent-plan')
      expect(plan).toBeUndefined()
    })
  })

  describe('Plan structure validation', () => {
    it('all web plans have required properties', () => {
      webPlans.forEach(plan => {
        expect(plan).toHaveProperty('id')
        expect(plan).toHaveProperty('title')
        expect(plan).toHaveProperty('price')
        expect(plan).toHaveProperty('currency')
        expect(plan).toHaveProperty('features')
        expect(plan.category).toBe('web')
        expect(Array.isArray(plan.features)).toBe(true)
      })
    })

    it('all social plans have required properties', () => {
      socialPlans.forEach(plan => {
        expect(plan).toHaveProperty('id')
        expect(plan).toHaveProperty('title')
        expect(plan).toHaveProperty('price')
        expect(plan).toHaveProperty('currency')
        expect(plan).toHaveProperty('features')
        expect(plan.category).toBe('social')
        expect(Array.isArray(plan.features)).toBe(true)
      })
    })
  })
})