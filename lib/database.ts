import { db } from './db'
import { Prisma } from '@prisma/client'

/**
 * Database utility functions for the quote system
 */

// Quote operations
export const quoteOperations = {
  /**
   * Create a new quote with all related data
   */
  async create(data: Prisma.QuoteCreateInput) {
    try {
      return await db.quote.create({
        data,
        include: {
          features: true,
          attachments: true,
          notes: true,
          statusHistory: true,
        },
      })
    } catch (error) {
      console.error('Error creating quote:', error)
      throw new Error('Failed to create quote')
    }
  },

  /**
   * Find quote by ID with all relations
   */
  async findById(id: string) {
    try {
      return await db.quote.findUnique({
        where: { id },
        include: {
          features: true,
          attachments: true,
          notes: {
            orderBy: { createdAt: 'desc' }
          },
          statusHistory: {
            orderBy: { createdAt: 'desc' }
          },
        },
      })
    } catch (error) {
      console.error('Error finding quote by ID:', error)
      throw new Error('Failed to find quote')
    }
  },

  /**
   * Find quote by access token for client tracking
   */
  async findByToken(accessToken: string) {
    try {
      return await db.quote.findUnique({
        where: { accessToken },
        include: {
          features: true,
          attachments: true,
          notes: {
            where: { isInternal: false },
            orderBy: { createdAt: 'desc' }
          },
          statusHistory: {
            orderBy: { createdAt: 'desc' }
          },
        },
      })
    } catch (error) {
      console.error('Error finding quote by token:', error)
      throw new Error('Failed to find quote')
    }
  },

  /**
   * Update quote status and create history entry
   */
  async updateStatus(
    id: string, 
    newStatus: string, 
    changedBy: string, 
    notes?: string
  ) {
    try {
      const quote = await db.quote.findUnique({ where: { id } })
      if (!quote) throw new Error('Quote not found')

      return await db.$transaction([
        db.quote.update({
          where: { id },
          data: { status: newStatus as any },
        }),
        db.quoteStatusHistory.create({
          data: {
            quoteId: id,
            previousStatus: quote.status,
            newStatus,
            changedBy,
            notes,
          },
        }),
      ])
    } catch (error) {
      console.error('Error updating quote status:', error)
      throw new Error('Failed to update quote status')
    }
  },

  /**
   * Get quotes with pagination and filters
   */
  async findMany(filters: {
    status?: string
    priority?: string
    serviceType?: string
    assignedTo?: string
    dateFrom?: Date
    dateTo?: Date
    page?: number
    limit?: number
  }) {
    try {
      const {
        status,
        priority,
        serviceType,
        assignedTo,
        dateFrom,
        dateTo,
        page = 1,
        limit = 10,
      } = filters

      const where: Prisma.QuoteWhereInput = {}

      if (status) where.status = status as any
      if (priority) where.priority = priority as any
      if (serviceType) where.serviceType = serviceType as any
      if (assignedTo) where.assignedTo = assignedTo
      if (dateFrom || dateTo) {
        where.createdAt = {}
        if (dateFrom) where.createdAt.gte = dateFrom
        if (dateTo) where.createdAt.lte = dateTo
      }

      const [quotes, total] = await Promise.all([
        db.quote.findMany({
          where,
          include: {
            features: true,
            _count: {
              select: {
                notes: true,
                attachments: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
          skip: (page - 1) * limit,
          take: limit,
        }),
        db.quote.count({ where }),
      ])

      return {
        quotes,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      }
    } catch (error) {
      console.error('Error finding quotes:', error)
      throw new Error('Failed to find quotes')
    }
  },
}

// Quote feature operations
export const quoteFeatureOperations = {
  /**
   * Add feature to quote
   */
  async create(data: Prisma.QuoteFeatureCreateInput) {
    try {
      return await db.quoteFeature.create({ data })
    } catch (error) {
      console.error('Error creating quote feature:', error)
      throw new Error('Failed to create quote feature')
    }
  },

  /**
   * Update feature cost
   */
  async updateCost(id: string, featureCost: number) {
    try {
      return await db.quoteFeature.update({
        where: { id },
        data: { featureCost },
      })
    } catch (error) {
      console.error('Error updating feature cost:', error)
      throw new Error('Failed to update feature cost')
    }
  },

  /**
   * Remove feature from quote
   */
  async delete(id: string) {
    try {
      return await db.quoteFeature.delete({ where: { id } })
    } catch (error) {
      console.error('Error deleting quote feature:', error)
      throw new Error('Failed to delete quote feature')
    }
  },
}

// Quote note operations
export const quoteNoteOperations = {
  /**
   * Add note to quote
   */
  async create(data: Prisma.QuoteNoteCreateInput) {
    try {
      return await db.quoteNote.create({ data })
    } catch (error) {
      console.error('Error creating quote note:', error)
      throw new Error('Failed to create quote note')
    }
  },

  /**
   * Get notes for quote
   */
  async findByQuoteId(quoteId: string, includeInternal = true) {
    try {
      const where: Prisma.QuoteNoteWhereInput = { quoteId }
      if (!includeInternal) {
        where.isInternal = false
      }

      return await db.quoteNote.findMany({
        where,
        orderBy: { createdAt: 'desc' },
      })
    } catch (error) {
      console.error('Error finding quote notes:', error)
      throw new Error('Failed to find quote notes')
    }
  },
}

// Quote attachment operations
export const quoteAttachmentOperations = {
  /**
   * Add attachment to quote
   */
  async create(data: Prisma.QuoteAttachmentCreateInput) {
    try {
      return await db.quoteAttachment.create({ data })
    } catch (error) {
      console.error('Error creating quote attachment:', error)
      throw new Error('Failed to create quote attachment')
    }
  },

  /**
   * Remove attachment from quote
   */
  async delete(id: string) {
    try {
      return await db.quoteAttachment.delete({ where: { id } })
    } catch (error) {
      console.error('Error deleting quote attachment:', error)
      throw new Error('Failed to delete quote attachment')
    }
  },

  /**
   * Get attachments for quote
   */
  async findByQuoteId(quoteId: string) {
    try {
      return await db.quoteAttachment.findMany({
        where: { quoteId },
        orderBy: { createdAt: 'desc' },
      })
    } catch (error) {
      console.error('Error finding quote attachments:', error)
      throw new Error('Failed to find quote attachments')
    }
  },
}

// Database health check
export const healthCheck = {
  /**
   * Check database connection
   */
  async checkConnection() {
    try {
      await db.$queryRaw`SELECT 1`
      return { status: 'healthy', timestamp: new Date() }
    } catch (error) {
      console.error('Database health check failed:', error)
      return { status: 'unhealthy', error: error.message, timestamp: new Date() }
    }
  },

  /**
   * Get database statistics
   */
  async getStats() {
    try {
      const [
        totalQuotes,
        pendingQuotes,
        completedQuotes,
        totalFeatures,
        totalAttachments,
      ] = await Promise.all([
        db.quote.count(),
        db.quote.count({ where: { status: 'PENDING' } }),
        db.quote.count({ where: { status: 'COMPLETED' } }),
        db.quoteFeature.count(),
        db.quoteAttachment.count(),
      ])

      return {
        quotes: {
          total: totalQuotes,
          pending: pendingQuotes,
          completed: completedQuotes,
        },
        features: totalFeatures,
        attachments: totalAttachments,
        timestamp: new Date(),
      }
    } catch (error) {
      console.error('Error getting database stats:', error)
      throw new Error('Failed to get database statistics')
    }
  },
}

// Utility functions
export const utils = {
  /**
   * Generate unique quote number
   */
  async generateQuoteNumber(): Promise<string> {
    const year = new Date().getFullYear()
    const month = String(new Date().getMonth() + 1).padStart(2, '0')
    
    // Get the count of quotes for this month
    const startOfMonth = new Date(year, new Date().getMonth(), 1)
    const endOfMonth = new Date(year, new Date().getMonth() + 1, 0)
    
    const count = await db.quote.count({
      where: {
        createdAt: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    })
    
    const sequence = String(count + 1).padStart(4, '0')
    return `HEX-${year}${month}-${sequence}`
  },

  /**
   * Generate secure access token
   */
  generateAccessToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    let result = ''
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return result
  },

  /**
   * Calculate estimated price based on service type and features
   */
  calculateEstimatedPrice(serviceType: string, features: string[] = []): number {
    const basePrices = {
      LANDING_PAGE: 170000,
      CORPORATE_WEB: 250000,
      ECOMMERCE: 370000,
      SOCIAL_MEDIA: 180000,
    }

    const featurePrices = {
      'seo-optimization': 50000,
      'responsive-design': 30000,
      'cms-integration': 80000,
      'payment-gateway': 100000,
      'multilingual': 60000,
      'analytics': 25000,
      'social-integration': 35000,
      'custom-forms': 40000,
    }

    const basePrice = basePrices[serviceType as keyof typeof basePrices] || 0
    const featuresPrice = features.reduce((total, feature) => {
      return total + (featurePrices[feature as keyof typeof featurePrices] || 0)
    }, 0)

    return basePrice + featuresPrice
  },
}