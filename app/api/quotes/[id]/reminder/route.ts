import { NextRequest, NextResponse } from 'next/server'
import { sendReminderNotification } from '@/lib/notifications'
import { handleApiError, createSuccessResponse, logError } from '@/lib/utils/api-errors'

/**
 * POST /api/quotes/[id]/reminder - Send manual reminder notification
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params

    // Send reminder notification
    const success = await sendReminderNotification(id)

    if (!success) {
      return NextResponse.json(
        {
          success: false,
          error: 'No se pudo enviar el recordatorio. La cotización puede no existir o no cumplir los criterios.',
        },
        { status: 400 }
      )
    }

    logError(null, 'manual_reminder_sent', { quoteId: id })

    return createSuccessResponse(
      { reminderSent: true },
      'Recordatorio enviado exitosamente'
    )

  } catch (error) {
    logError(error, 'manual_reminder_failed', { quoteId: params.id })
    return handleApiError(error)
  }
}