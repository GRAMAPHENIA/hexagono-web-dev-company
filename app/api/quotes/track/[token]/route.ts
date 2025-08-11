import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/database'
import { z } from 'zod'

const trackingParamsSchema = z.object({
  token: z.string().min(1, 'Token is required'),
})

export async function GET(
  request: NextRequest,
  { params }: { params: { token: string } }
) {
  try {
    // Validate token parameter
    const { token } = trackingParamsSchema.parse(params)

    // Find quote by access token
    const quote = await prisma.quote.findUnique({
      where: {
        accessToken: token,
      },
      include: {
        features: true,
        statusHistory: {
          orderBy: {
            createdAt: 'asc',
          },
        },
        notes: {
          where: {
            isInternal: false, // Only public notes
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    })

    if (!quote) {
      return NextResponse.json(
        { error: 'Cotización no encontrada' },
        { status: 404 }
      )
    }

    // Calculate estimated response time
    const estimatedResponseHours = 48
    const estimatedResponseDate = new Date(quote.createdAt)
    estimatedResponseDate.setHours(estimatedResponseDate.getHours() + estimatedResponseHours)

    // Format response data
    const trackingData = {
      id: quote.id,
      quoteNumber: quote.quoteNumber,
      status: quote.status,
      priority: quote.priority,
      createdAt: quote.createdAt,
      updatedAt: quote.updatedAt,
      estimatedResponseDate,
      clientName: quote.clientName,
      serviceType: quote.serviceType,
      estimatedPrice: quote.estimatedPrice,
      timeline: quote.timeline,
      statusHistory: quote.statusHistory.map(history => ({
        status: history.newStatus,
        createdAt: history.createdAt,
        notes: history.notes,
      })),
      publicNotes: quote.notes.map(note => ({
        content: note.note,
        createdAt: note.createdAt,
      })),
    }

    return NextResponse.json(trackingData)
  } catch (error) {
    console.error('Error fetching quote tracking data:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Token inválido' },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}