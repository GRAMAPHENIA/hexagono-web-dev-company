import { NextRequest, NextResponse } from 'next/server'
import { quoteOperations } from '@/lib/database'
import { handleApiError, createSuccessResponse, logError } from '@/lib/utils/api-errors'
import { sendStatusUpdateNotification } from '@/lib/notifications'
import { z } from 'zod'

// Validation schema for status update
const statusUpdateSchema = z.object({
  status: z.enum(['PENDING', 'IN_REVIEW', 'QUOTED', 'COMPLETED', 'CANCELLED']),
  notes: z.string().optional(),
  changedBy: z.string().min(1, 'changedBy is required'),
})

/**
 * PATCH /api/quotes/[id]/status - Update quote status
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params
    const body = await request.json()

    // Validate request data
    const validation = statusUpdateSchema.safeParse(body)
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Datos de entrada inválidos',
          details: validation.error.errors,
        },
        { status: 400 }
      )
    }

    const { status: newStatus, notes, changedBy } = validation.data

    // Get current quote to check previous status
    const currentQuote = await quoteOperations.findById(id)
    if (!currentQuote) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cotización no encontrada',
        },
        { status: 404 }
      )
    }

    const previousStatus = currentQuote.status

    // Update quote status
    const [updatedQuote] = await quoteOperations.updateStatus(
      id,
      newStatus,
      changedBy,
      notes
    )

    // Send status update notification asynchronously
    if (previousStatus !== newStatus) {
      sendStatusUpdateNotification(
        id,
        newStatus,
        previousStatus,
        notes
      ).then((success) => {
        console.log('Status update notification sent:', {
          quoteId: id,
          quoteNumber: currentQuote.quoteNumber,
          previousStatus,
          newStatus,
          notificationSent: success,
        })
      }).catch((error) => {
        console.error('Failed to send status update notification:', error)
      })
    }

    // Log status update
    logError(null, 'quote_status_updated', {
      quoteId: id,
      quoteNumber: currentQuote.quoteNumber,
      previousStatus,
      newStatus,
      changedBy,
    })

    return createSuccessResponse({
      id: updatedQuote.id,
      status: updatedQuote.status,
      updatedAt: updatedQuote.updatedAt,
      previousStatus,
    }, 'Estado de cotización actualizado exitosamente')

  } catch (error) {
    logError(error, 'quote_status_update_failed', { quoteId: params.id })
    return handleApiError(error)
  }
}

/**
 * GET /api/quotes/[id]/status - Get quote status history
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    const quote = await quoteOperations.findById(id)
    if (!quote) {
      return NextResponse.json(
        {
          success: false,
          error: 'Cotización no encontrada',
        },
        { status: 404 }
      )
    }

    return createSuccessResponse({
      currentStatus: quote.status,
      statusHistory: quote.statusHistory,
    }, 'Historial de estado obtenido exitosamente')

  } catch (error) {
    logError(error, 'quote_status_history_failed', { quoteId: params.id })
    return handleApiError(error)
  }
}