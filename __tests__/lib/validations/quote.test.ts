import {
  validateQuoteFormData,
  validateClientInfo,
  validateProjectDetails,
  validatePriceEstimate,
  validateFile,
  validateQuote,
  clientInfoSchema,
  projectDetailsSchema,
  quoteFormDataSchema,
  priceEstimateSchema,
  fileValidationSchema,
  quoteSchema
} from '@/lib/validations/quote'

describe('Quote Validation Schemas', () => {
  describe('clientInfoSchema', () => {
    const validClientInfo = {
      name: 'Juan Pérez',
      email: 'juan@example.com',
      phone: '+54 11 1234-5678',
      company: 'Mi Empresa'
    }

    it('should validate correct client info', () => {
      const result = clientInfoSchema.safeParse(validClientInfo)
      expect(result.success).toBe(true)
    })

    it('should validate client info without optional fields', () => {
      const minimalInfo = {
        name: 'Juan Pérez',
        email: 'juan@example.com'
      }
      const result = clientInfoSchema.safeParse(minimalInfo)
      expect(result.success).toBe(true)
    })

    it('should reject invalid email', () => {
      const invalidInfo = { ...validClientInfo, email: 'invalid-email' }
      const result = clientInfoSchema.safeParse(invalidInfo)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('email válido')
      }
    })

    it('should reject name that is too short', () => {
      const invalidInfo = { ...validClientInfo, name: 'A' }
      const result = clientInfoSchema.safeParse(invalidInfo)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('al menos 2 caracteres')
      }
    })

    it('should reject name that is too long', () => {
      const invalidInfo = { ...validClientInfo, name: 'A'.repeat(101) }
      const result = clientInfoSchema.safeParse(invalidInfo)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('no puede exceder 100 caracteres')
      }
    })

    it('should reject invalid phone format', () => {
      const invalidInfo = { ...validClientInfo, phone: 'invalid-phone' }
      const result = clientInfoSchema.safeParse(invalidInfo)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('teléfono válido')
      }
    })

    it('should accept various valid phone formats', () => {
      const validPhones = [
        '+54 11 1234-5678',
        '011 1234-5678',
        '(011) 1234-5678',
        '+5491123456789',
        '11 1234 5678'
      ]

      validPhones.forEach(phone => {
        const info = { ...validClientInfo, phone }
        const result = clientInfoSchema.safeParse(info)
        expect(result.success).toBe(true)
      })
    })
  })

  describe('projectDetailsSchema', () => {
    const validProjectDetails = {
      serviceType: 'LANDING_PAGE' as const,
      timeline: '4-6 weeks',
      budgetRange: '$100.000 - $200.000',
      description: 'Necesito una landing page para mi negocio',
      features: ['contact-form', 'seo-optimization'],
      additionalRequirements: 'Integración con redes sociales'
    }

    it('should validate correct project details', () => {
      const result = projectDetailsSchema.safeParse(validProjectDetails)
      expect(result.success).toBe(true)
    })

    it('should validate minimal project details', () => {
      const minimalDetails = {
        serviceType: 'CORPORATE_WEB' as const,
        features: []
      }
      const result = projectDetailsSchema.safeParse(minimalDetails)
      expect(result.success).toBe(true)
    })

    it('should reject invalid service type', () => {
      const invalidDetails = { ...validProjectDetails, serviceType: 'INVALID' }
      const result = projectDetailsSchema.safeParse(invalidDetails)
      expect(result.success).toBe(false)
    })

    it('should reject too many features', () => {
      const tooManyFeatures = Array(21).fill('feature')
      const invalidDetails = { ...validProjectDetails, features: tooManyFeatures }
      const result = projectDetailsSchema.safeParse(invalidDetails)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('más de 20 características')
      }
    })

    it('should reject description that is too long', () => {
      const longDescription = 'A'.repeat(2001)
      const invalidDetails = { ...validProjectDetails, description: longDescription }
      const result = projectDetailsSchema.safeParse(invalidDetails)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('no puede exceder 2000 caracteres')
      }
    })

    it('should accept all valid service types', () => {
      const serviceTypes = ['LANDING_PAGE', 'CORPORATE_WEB', 'ECOMMERCE', 'SOCIAL_MEDIA'] as const
      
      serviceTypes.forEach(serviceType => {
        const details = { ...validProjectDetails, serviceType }
        const result = projectDetailsSchema.safeParse(details)
        expect(result.success).toBe(true)
      })
    })
  })

  describe('quoteFormDataSchema', () => {
    const validFormData = {
      clientInfo: {
        name: 'Juan Pérez',
        email: 'juan@example.com'
      },
      projectDetails: {
        serviceType: 'LANDING_PAGE' as const,
        features: ['contact-form']
      }
    }

    it('should validate correct form data', () => {
      const result = quoteFormDataSchema.safeParse(validFormData)
      expect(result.success).toBe(true)
    })

    it('should validate form data with attachments', () => {
      const mockFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
      const formDataWithAttachments = {
        ...validFormData,
        attachments: [mockFile]
      }
      const result = quoteFormDataSchema.safeParse(formDataWithAttachments)
      expect(result.success).toBe(true)
    })

    it('should reject too many attachments', () => {
      const mockFiles = Array(6).fill(null).map((_, i) => 
        new File(['content'], `test${i}.jpg`, { type: 'image/jpeg' })
      )
      const invalidFormData = {
        ...validFormData,
        attachments: mockFiles
      }
      const result = quoteFormDataSchema.safeParse(invalidFormData)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('más de 5 archivos')
      }
    })
  })

  describe('priceEstimateSchema', () => {
    const validPriceEstimate = {
      basePrice: 170000,
      additionalFeatures: [
        { name: 'contact-form', cost: 15000 },
        { name: 'seo-optimization', cost: 25000 }
      ],
      totalEstimate: 210000,
      currency: 'ARS' as const,
      disclaimer: 'Este es un precio estimado'
    }

    it('should validate correct price estimate', () => {
      const result = priceEstimateSchema.safeParse(validPriceEstimate)
      expect(result.success).toBe(true)
    })

    it('should reject negative base price', () => {
      const invalidEstimate = { ...validPriceEstimate, basePrice: -1000 }
      const result = priceEstimateSchema.safeParse(invalidEstimate)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('no puede ser negativo')
      }
    })

    it('should reject invalid currency', () => {
      const invalidEstimate = { ...validPriceEstimate, currency: 'USD' }
      const result = priceEstimateSchema.safeParse(invalidEstimate)
      expect(result.success).toBe(false)
    })

    it('should validate empty additional features', () => {
      const estimateWithoutFeatures = {
        ...validPriceEstimate,
        additionalFeatures: []
      }
      const result = priceEstimateSchema.safeParse(estimateWithoutFeatures)
      expect(result.success).toBe(true)
    })
  })

  describe('fileValidationSchema', () => {
    it('should validate correct file types and sizes', () => {
      const validFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
      Object.defineProperty(validFile, 'size', { value: 5 * 1024 * 1024 }) // 5MB
      
      const result = fileValidationSchema.safeParse({ file: validFile })
      expect(result.success).toBe(true)
    })

    it('should reject files that are too large', () => {
      const largeFile = new File(['content'], 'large.jpg', { type: 'image/jpeg' })
      Object.defineProperty(largeFile, 'size', { value: 15 * 1024 * 1024 }) // 15MB
      
      const result = fileValidationSchema.safeParse({ file: largeFile })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('no debe superar los 10MB')
      }
    })

    it('should reject invalid file types', () => {
      const invalidFile = new File(['content'], 'test.exe', { type: 'application/x-executable' })
      Object.defineProperty(invalidFile, 'size', { value: 1024 })
      
      const result = fileValidationSchema.safeParse({ file: invalidFile })
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Tipo de archivo no permitido')
      }
    })

    it('should accept all valid file types', () => {
      const validTypes = [
        'image/jpeg',
        'image/png', 
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      ]

      validTypes.forEach(type => {
        const file = new File(['content'], 'test.file', { type })
        Object.defineProperty(file, 'size', { value: 1024 })
        
        const result = fileValidationSchema.safeParse({ file })
        expect(result.success).toBe(true)
      })
    })
  })

  describe('quoteSchema', () => {
    const validQuote = {
      id: '123e4567-e89b-12d3-a456-426614174000',
      quoteNumber: 'COT-20241221-0001',
      clientInfo: {
        name: 'Juan Pérez',
        email: 'juan@example.com'
      },
      projectDetails: {
        serviceType: 'LANDING_PAGE' as const,
        features: ['contact-form']
      },
      estimatedPrice: 170000,
      status: 'PENDING' as const,
      priority: 'MEDIUM' as const,
      assignedTo: 'admin@hexagono.xyz',
      accessToken: 'abcdefghijklmnopqrstuvwxyz123456',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    it('should validate correct quote', () => {
      const result = quoteSchema.safeParse(validQuote)
      expect(result.success).toBe(true)
    })

    it('should reject invalid UUID', () => {
      const invalidQuote = { ...validQuote, id: 'invalid-uuid' }
      const result = quoteSchema.safeParse(invalidQuote)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('ID inválido')
      }
    })

    it('should reject invalid quote number format', () => {
      const invalidQuote = { ...validQuote, quoteNumber: 'INVALID-FORMAT' }
      const result = quoteSchema.safeParse(invalidQuote)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Formato de número de cotización inválido')
      }
    })

    it('should reject invalid access token', () => {
      const invalidQuote = { ...validQuote, accessToken: 'short' }
      const result = quoteSchema.safeParse(invalidQuote)
      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error.issues[0].message).toContain('Token de acceso inválido')
      }
    })
  })

  describe('validation helper functions', () => {
    it('should validate quote form data correctly', () => {
      const validData = {
        clientInfo: { name: 'Juan', email: 'juan@test.com' },
        projectDetails: { serviceType: 'LANDING_PAGE' as const, features: [] }
      }
      
      const result = validateQuoteFormData(validData)
      expect(result.success).toBe(true)
    })

    it('should validate client info correctly', () => {
      const validData = { name: 'Juan', email: 'juan@test.com' }
      const result = validateClientInfo(validData)
      expect(result.success).toBe(true)
    })

    it('should validate project details correctly', () => {
      const validData = { serviceType: 'LANDING_PAGE' as const, features: [] }
      const result = validateProjectDetails(validData)
      expect(result.success).toBe(true)
    })

    it('should validate price estimate correctly', () => {
      const validData = {
        basePrice: 170000,
        additionalFeatures: [],
        totalEstimate: 170000,
        currency: 'ARS' as const,
        disclaimer: 'Test'
      }
      const result = validatePriceEstimate(validData)
      expect(result.success).toBe(true)
    })

    it('should validate file correctly', () => {
      const validFile = new File(['content'], 'test.jpg', { type: 'image/jpeg' })
      Object.defineProperty(validFile, 'size', { value: 1024 })
      
      const result = validateFile(validFile)
      expect(result.success).toBe(true)
    })
  })
})