import { NextRequest, NextResponse } from 'next/server'
import { quoteOperations } from '@/lib/database'
import { handleApiError, createSuccessResponse, QuoteNotFoundError, logError } from '@/lib/utils/api-errors'

/**
 * GET /api/quotes/[id] - Get a specific quote by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  try {

    // Validate ID format
    if (!id || typeof id !== 'string') {
      throw new Error('ID de cotización inválido')
    }

    // Find the quote
    const quote = await quoteOperations.findById(id)

    if (!quote) {
      throw new QuoteNotFoundError(id)
    }

    // Transform the data for response
    const responseData = {
      id: quote.id,
      quoteNumber: quote.quoteNumber,
      clientInfo: {
        name: quote.clientName,
        email: quote.clientEmail,
        phone: quote.clientPhone,
        company: quote.clientCompany
      },
      projectDetails: {
        serviceType: quote.serviceType,
        description: quote.description,
        timeline: quote.timeline,
        budgetRange: quote.budgetRange,
        features: quote.features.map(f => f.featureName)
      },
      estimatedPrice: quote.estimatedPrice,
      status: quote.status,
      priority: quote.priority,
      assignedTo: quote.assignedTo,
      features: quote.features.map(feature => ({
        id: feature.id,
        name: feature.featureName,
        cost: feature.featureCost
      })),
      attachments: quote.attachments.map(attachment => ({
        id: attachment.id,
        filename: attachment.filename,
        originalName: attachment.originalName,
        fileSize: attachment.fileSize,
        mimeType: attachment.mimeType,
        storageUrl: attachment.storageUrl,
        createdAt: attachment.createdAt
      })),
      notes: quote.notes.map(note => ({
        id: note.id,
        author: note.author,
        note: note.note,
        isInternal: note.isInternal,
        createdAt: note.createdAt
      })),
      statusHistory: quote.statusHistory.map(history => ({
        id: history.id,
        previousStatus: history.previousStatus,
        newStatus: history.newStatus,
        changedBy: history.changedBy,
        notes: history.notes,
        createdAt: history.createdAt
      })),
      createdAt: quote.createdAt,
      updatedAt: quote.updatedAt
    }

    return createSuccessResponse(responseData, 'Cotización obtenida exitosamente')

  } catch (error) {
    logError(error, 'quote_fetch_failed', { quoteId: id })
    return handleApiError(error)
  }
}

/**
 * PATCH /api/quotes/[id] - Update quote status or other fields
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params
  let body: any
  try {
    body = await request.json()

    // Validate ID format
    if (!id || typeof id !== 'string') {
      throw new Error('ID de cotización inválido')
    }

    // Check if quote exists
    const existingQuote = await quoteOperations.findById(id)
    if (!existingQuote) {
      throw new QuoteNotFoundError(id)
    }

    // Handle status update
    if (body.status && body.changedBy) {
      const validStatuses = ['PENDING', 'IN_REVIEW', 'QUOTED', 'COMPLETED', 'CANCELLED']
      
      if (!validStatuses.includes(body.status)) {
        throw new Error('Estado de cotización inválido')
      }

      await quoteOperations.updateStatus(
        id,
        body.status,
        body.changedBy,
        body.notes
      )

      return createSuccessResponse(
        { id, status: body.status },
        'Estado de cotización actualizado exitosamente'
      )
    }

    // Handle other updates (priority, assignedTo, etc.)
    const updateData: any = {}
    
    if (body.priority && ['LOW', 'MEDIUM', 'HIGH'].includes(body.priority)) {
      updateData.priority = body.priority
    }
    
    if (body.assignedTo !== undefined) {
      updateData.assignedTo = body.assignedTo
    }

    if (body.estimatedPrice !== undefined && typeof body.estimatedPrice === 'number') {
      updateData.estimatedPrice = body.estimatedPrice
    }

    if (Object.keys(updateData).length === 0) {
      throw new Error('No hay campos válidos para actualizar')
    }

    // Update the quote
    const updatedQuote = await quoteOperations.findById(id)
    
    return createSuccessResponse({
      id: updatedQuote?.id,
      status: updatedQuote?.status,
      priority: updatedQuote?.priority,
      assignedTo: updatedQuote?.assignedTo,
      estimatedPrice: updatedQuote?.estimatedPrice,
      updatedAt: updatedQuote?.updatedAt
    }, 'Cotización actualizada exitosamente')

  } catch (error) {
    logError(error, 'quote_update_failed', { quoteId: id, updateData: body })
    return handleApiError(error)
  }
}