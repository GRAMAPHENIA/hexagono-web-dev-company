import { NextRequest, NextResponse } from 'next/server'
import { sendBulkReminderNotifications } from '@/lib/notifications'

/**
 * Cron job endpoint for sending reminder notifications
 * This endpoint should be called by a cron service (like Vercel Cron or external service)
 * to send reminder emails for quotes pending for more than 48 hours
 */
export async function POST(request: NextRequest) {
  try {
    // Verify the request is from an authorized source
    const authHeader = request.headers.get('authorization')
    const cronSecret = process.env.CRON_SECRET || 'default-secret'
    
    if (authHeader !== `Bearer ${cronSecret}`) {
      console.warn('Unauthorized cron request attempt')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    console.log('Starting reminder notifications cron job...')
    
    const result = await sendBulkReminderNotifications()
    
    console.log('Reminder notifications cron job completed:', result)
    
    return NextResponse.json({
      success: true,
      message: 'Reminder notifications processed successfully',
      data: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error in reminder notifications cron job:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to process reminder notifications',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}

/**
 * GET endpoint for manual testing of reminder notifications
 * Only available in development environment
 */
export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV !== 'development') {
    return NextResponse.json(
      { error: 'This endpoint is only available in development' },
      { status: 403 }
    )
  }

  try {
    console.log('Manual reminder notifications test...')
    
    const result = await sendBulkReminderNotifications()
    
    return NextResponse.json({
      success: true,
      message: 'Reminder notifications test completed',
      data: result,
      timestamp: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error in manual reminder test:', error)
    
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to test reminder notifications',
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}