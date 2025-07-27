/**
 * @jest-environment node
 */
import { NextRequest } from 'next/server'
import { POST } from '@/app/api/pricing/calculate/route'

describe('/api/pricing/calculate', () => {
  describe('POST /api/pricing/calculate', () => {
    it('should calculate price for landing page with basic features', async () => {
      const requestData = {
        serviceType: 'LANDING_PAGE',
        features: ['seo-optimization', 'responsive-design'],
        customRequirements: 'Integración con formulario de contacto'
      }

      const request = new NextRequest('http://localhost:3000/api/pricing/calculate', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toMatchObject({
        basePrice: 170000,
        currency: 'ARS',
        disclaimer: expect.any(String)
      })
      expect(data.data.additionalFeatures).toHaveLength(2)
      expect(data.data.totalEstimate).toBeGreaterThan(170000)
    })

    it('should calculate price for corporate web with multiple features', async () => {
      const requestData = {
        serviceType: 'CORPORATE_WEB',
        features: [
          'seo-optimization',
          'responsive-design',
          'cms-integration',
          'contact-forms',
          'blog-functionality'
        ]
      }

      const request = new NextRequest('http://localhost:3000/api/pricing/calculate', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toMatchObject({
        basePrice: 250000,
        currency: 'ARS'
      })
      expect(data.data.additionalFeatures).toHaveLength(5)
      expect(data.data.totalEstimate).toBeGreaterThan(250000)
    })

    it('should calculate price for e-commerce with advanced features', async () => {
      const requestData = {
        serviceType: 'ECOMMERCE',
        features: [
          'payment-gateway',
          'inventory-management',
          'shopping-cart',
          'product-catalog',
          'order-management',
          'shipping-integration'
        ]
      }

      const request = new NextRequest('http://localhost:3000/api/pricing/calculate', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toMatchObject({
        basePrice: 370000,
        currency: 'ARS'
      })
      expect(data.data.additionalFeatures).toHaveLength(6)
      expect(data.data.totalEstimate).toBeGreaterThan(370000)
      
      // E-commerce should have higher multiplier
      const seoFeature = data.data.additionalFeatures.find(f => f.name === 'Optimización SEO')
      if (seoFeature) {
        expect(seoFeature.cost).toBeGreaterThan(50000) // Should be multiplied by 1.3
      }
    })

    it('should calculate price for social media management', async () => {
      const requestData = {
        serviceType: 'SOCIAL_MEDIA',
        features: [
          'social-media-integration',
          'google-analytics',
          'newsletter-integration'
        ]
      }

      const request = new NextRequest('http://localhost:3000/api/pricing/calculate', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data).toMatchObject({
        basePrice: 180000,
        currency: 'ARS'
      })
      expect(data.data.additionalFeatures).toHaveLength(3)
    })

    it('should handle empty features array', async () => {
      const requestData = {
        serviceType: 'LANDING_PAGE',
        features: []
      }

      const request = new NextRequest('http://localhost:3000/api/pricing/calculate', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      expect(data.data.basePrice).toBe(170000)
      expect(data.data.additionalFeatures).toHaveLength(0)
      expect(data.data.totalEstimate).toBe(170000)
    })

    it('should include complexity bonus for long custom requirements', async () => {
      const longRequirements = 'A'.repeat(200) // Long custom requirements

      const requestData = {
        serviceType: 'CORPORATE_WEB',
        features: ['seo-optimization'],
        customRequirements: longRequirements
      }

      const request = new NextRequest('http://localhost:3000/api/pricing/calculate', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      
      // Should include 15% complexity bonus
      const expectedBase = 250000
      const expectedFeatureCost = 50000
      const expectedComplexityBonus = Math.round(expectedBase * 0.15)
      const expectedTotal = expectedBase + expectedFeatureCost + expectedComplexityBonus
      
      expect(data.data.totalEstimate).toBe(expectedTotal)
    })

    it('should generate appropriate disclaimer for complex projects', async () => {
      const requestData = {
        serviceType: 'ECOMMERCE',
        features: [
          'payment-gateway',
          'inventory-management',
          'shopping-cart',
          'product-catalog',
          'order-management',
          'shipping-integration',
          'multilingual',
          'api-integration',
          'advanced-security'
        ],
        customRequirements: 'Complex integration requirements'
      }

      const request = new NextRequest('http://localhost:3000/api/pricing/calculate', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.data.disclaimer).toContain('complejidad del proyecto')
      expect(data.data.disclaimer).toContain('consulta personalizada')
    })

    it('should return validation error for invalid service type', async () => {
      const requestData = {
        serviceType: 'INVALID_SERVICE',
        features: ['seo-optimization']
      }

      const request = new NextRequest('http://localhost:3000/api/pricing/calculate', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Datos de entrada inválidos')
      expect(data.details).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            field: 'serviceType'
          })
        ])
      )
    })

    it('should return validation error for missing service type', async () => {
      const requestData = {
        features: ['seo-optimization']
      }

      const request = new NextRequest('http://localhost:3000/api/pricing/calculate', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(400)
      expect(data.error).toBe('Datos de entrada inválidos')
    })

    it('should handle unknown features gracefully', async () => {
      const requestData = {
        serviceType: 'LANDING_PAGE',
        features: ['unknown-feature', 'seo-optimization', 'another-unknown']
      }

      const request = new NextRequest('http://localhost:3000/api/pricing/calculate', {
        method: 'POST',
        body: JSON.stringify(requestData),
        headers: { 'Content-Type': 'application/json' }
      })

      const response = await POST(request)
      const data = await response.json()

      expect(response.status).toBe(200)
      expect(data.success).toBe(true)
      
      // Unknown features should have 0 cost
      const unknownFeature = data.data.additionalFeatures.find(f => f.name === 'unknown-feature')
      if (unknownFeature) {
        expect(unknownFeature.cost).toBe(0)
      }
      
      // Known features should have proper cost
      const seoFeature = data.data.additionalFeatures.find(f => f.name === 'Optimización SEO')
      expect(seoFeature?.cost).toBeGreaterThan(0)
    })

    it('should apply correct service multipliers', async () => {
      const features = ['seo-optimization'] // 50000 base cost
      
      // Test each service type with same feature
      const serviceTypes = [
        { type: 'LANDING_PAGE', multiplier: 0.8, expected: 40000 },
        { type: 'CORPORATE_WEB', multiplier: 1.0, expected: 50000 },
        { type: 'ECOMMERCE', multiplier: 1.3, expected: 65000 },
        { type: 'SOCIAL_MEDIA', multiplier: 0.9, expected: 45000 }
      ]

      for (const service of serviceTypes) {
        const requestData = {
          serviceType: service.type,
          features
        }

        const request = new NextRequest('http://localhost:3000/api/pricing/calculate', {
          method: 'POST',
          body: JSON.stringify(requestData),
          headers: { 'Content-Type': 'application/json' }
        })

        const response = await POST(request)
        const data = await response.json()

        expect(response.status).toBe(200)
        
        const seoFeature = data.data.additionalFeatures.find(f => f.name === 'Optimización SEO')
        expect(seoFeature?.cost).toBe(service.expected)
      }
    })
  })
})