import { NextRequest, NextResponse } from 'next/server'
import { quoteOperations, utils } from '@/lib/database'
import { validateQuoteSubmission } from '@/lib/validations/quote'
import { QuoteFormData } from '@/lib/types/quote'
import { handleApiError, createSuccessResponse, validateApiInput, logError } from '@/lib/utils/api-errors'
import { sendNewQuoteNotifications } from '@/lib/notifications'

/**
 * GET /api/quotes - Get all quotes
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '50')
    const status = searchParams.get('status')
    const search = searchParams.get('search')

    // Build filters for findMany
    const filters: any = {
      page,
      limit,
    }

    if (status && status !== 'ALL') {
      filters.status = status
    }

    // Get quotes with optional filtering
    const result = await quoteOperations.findMany(filters)

    return createSuccessResponse({
      data: result.quotes,
      pagination: result.pagination
    }, 'Cotizaciones obtenidas exitosamente')

  } catch (error) {
    logError(error, 'quotes_fetch_failed')
    return handleApiError(error)
  }
}

/**
 * POST /api/quotes - Create a new quote
 */
export async function POST(request: NextRequest) {
  let body: any
  try {
    body = await request.json()
    
    // Validate the request data
    const validation = validateQuoteSubmission(body)
    if (!validation.success) {
      throw validation.error
    }
    const quoteData = validation.data

    // Generate unique quote number and access token
    const quoteNumber = await utils.generateQuoteNumber()
    const accessToken = utils.generateAccessToken()

    // Calculate estimated price
    const estimatedPrice = utils.calculateEstimatedPrice(
      quoteData.projectDetails.serviceType,
      quoteData.projectDetails.features
    )

    // Prepare quote data for database
    const quoteCreateData = {
      quoteNumber,
      clientName: quoteData.clientInfo.name,
      clientEmail: quoteData.clientInfo.email,
      clientPhone: quoteData.clientInfo.phone,
      clientCompany: quoteData.clientInfo.company,
      serviceType: quoteData.projectDetails.serviceType,
      description: quoteData.projectDetails.description,
      timeline: quoteData.projectDetails.timeline,
      budgetRange: quoteData.projectDetails.budgetRange,
      estimatedPrice,
      accessToken,
      features: {
        create: quoteData.projectDetails.features.map(feature => ({
          featureName: feature,
          featureCost: getFeatureCost(feature)
        }))
      },
      ...(quoteData.attachments && quoteData.attachments.length > 0 ? {
        attachments: {
          create: quoteData.attachments.map(attachment => ({
            filename: attachment.filename,
            originalName: attachment.originalName,
            storageUrl: attachment.url,
            fileSize: attachment.size,
            mimeType: attachment.mimeType
          }))
        }
      } : {}),
      statusHistory: {
        create: {
          newStatus: 'PENDING',
          changedBy: 'system',
          notes: 'Cotización creada automáticamente'
        }
      }
    }

    // Create the quote
    const quote = await quoteOperations.create(quoteCreateData)

    // Send email notifications asynchronously (don't wait for completion)
    sendNewQuoteNotifications(quote.id).then((result) => {
      console.log('Quote notifications sent:', {
        quoteId: quote.id,
        quoteNumber: quote.quoteNumber,
        clientNotified: result.clientNotified,
        adminNotified: result.adminNotified,
      })
    }).catch((error) => {
      console.error('Failed to send quote notifications:', error)
    })

    // Log successful quote creation
    logError(null, 'quote_created', {
      quoteId: quote.id,
      quoteNumber: quote.quoteNumber,
      serviceType: quote.serviceType,
      estimatedPrice: quote.estimatedPrice
    })

    // Return success response using centralized helper
    return createSuccessResponse({
      id: quote.id,
      quoteNumber: quote.quoteNumber,
      accessToken: quote.accessToken,
      estimatedPrice: quote.estimatedPrice,
      status: quote.status,
      createdAt: quote.createdAt
    }, 'Cotización creada exitosamente', 201)

  } catch (error) {
    logError(error, 'quote_creation_failed', { body })
    return handleApiError(error)
  }
}

/**
 * Helper function to get feature cost
 */
function getFeatureCost(feature: string): number {
  const featurePrices: Record<string, number> = {
    'seo-optimization': 50000,
    'responsive-design': 30000,
    'cms-integration': 80000,
    'payment-gateway': 100000,
    'multilingual': 60000,
    'analytics': 25000,
    'social-integration': 35000,
    'custom-forms': 40000,
    'e-commerce': 120000,
    'blog': 45000,
    'gallery': 35000,
    'contact-forms': 25000,
    'newsletter': 30000,
    'live-chat': 40000,
    'booking-system': 90000,
    'inventory-management': 150000,
    'user-accounts': 70000,
    'admin-panel': 100000
  }

  return featurePrices[feature] || 0
}