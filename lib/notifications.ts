import { sendEmailWithRetry, emailConfig, QuoteEmailData } from './email'
import {
  createClientQuoteConfirmationTemplate,
  createAdminQuoteNotificationTemplate,
  createQuoteStatusUpdateTemplate,
  createReminderTemplate,
} from './email-templates'
import { quoteOperations } from './database'

/**
 * Notification service for quote system
 */
export class NotificationService {
  private baseUrl: string

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'
  }

  /**
   * Send notification when a new quote is created
   */
  async sendNewQuoteNotifications(quoteId: string): Promise<{
    clientNotified: boolean
    adminNotified: boolean
  }> {
    try {
      const quote = await quoteOperations.findById(quoteId)
      if (!quote) {
        throw new Error('Quote not found')
      }

      const emailData: QuoteEmailData = {
        quoteNumber: quote.quoteNumber,
        clientName: quote.clientName,
        clientEmail: quote.clientEmail,
        serviceType: quote.serviceType,
        estimatedPrice: quote.estimatedPrice ? Number(quote.estimatedPrice) : undefined,
        trackingUrl: `${this.baseUrl}/cotizacion/seguimiento/${quote.accessToken}`,
        adminUrl: `${this.baseUrl}/admin/cotizaciones/${quote.id}`,
      }

      // Send confirmation email to client
      const clientTemplate = createClientQuoteConfirmationTemplate(emailData)
      const clientNotified = await sendEmailWithRetry({
        to: quote.clientEmail,
        subject: clientTemplate.subject,
        html: clientTemplate.html,
        text: clientTemplate.text,
      })

      // Send notification email to admin
      const adminTemplate = createAdminQuoteNotificationTemplate(emailData)
      const adminNotified = await sendEmailWithRetry({
        to: emailConfig.adminEmail,
        subject: adminTemplate.subject,
        html: adminTemplate.html,
        text: adminTemplate.text,
      })

      // Log notification results
      console.log('New quote notifications sent:', {
        quoteId,
        quoteNumber: quote.quoteNumber,
        clientNotified,
        adminNotified,
      })

      return { clientNotified, adminNotified }
    } catch (error) {
      console.error('Error sending new quote notifications:', error)
      return { clientNotified: false, adminNotified: false }
    }
  }

  /**
   * Send notification when quote status is updated
   */
  async sendStatusUpdateNotification(
    quoteId: string,
    newStatus: string,
    previousStatus?: string,
    statusMessage?: string
  ): Promise<boolean> {
    try {
      const quote = await quoteOperations.findById(quoteId)
      if (!quote) {
        throw new Error('Quote not found')
      }

      const emailData: QuoteEmailData & {
        newStatus: string
        previousStatus?: string
        statusMessage?: string
      } = {
        quoteNumber: quote.quoteNumber,
        clientName: quote.clientName,
        clientEmail: quote.clientEmail,
        serviceType: quote.serviceType,
        estimatedPrice: quote.estimatedPrice ? Number(quote.estimatedPrice) : undefined,
        trackingUrl: `${this.baseUrl}/cotizacion/seguimiento/${quote.accessToken}`,
        newStatus,
        previousStatus,
        statusMessage,
      }

      const template = createQuoteStatusUpdateTemplate(emailData)
      const success = await sendEmailWithRetry({
        to: quote.clientEmail,
        subject: template.subject,
        html: template.html,
        text: template.text,
      })

      console.log('Status update notification sent:', {
        quoteId,
        quoteNumber: quote.quoteNumber,
        newStatus,
        success,
      })

      return success
    } catch (error) {
      console.error('Error sending status update notification:', error)
      return false
    }
  }

  /**
   * Send reminder notification for quotes pending for more than 48 hours
   */
  async sendReminderNotification(quoteId: string): Promise<boolean> {
    try {
      const quote = await quoteOperations.findById(quoteId)
      if (!quote) {
        throw new Error('Quote not found')
      }

      // Check if quote is still pending and older than 48 hours
      const hoursSinceCreated = (Date.now() - quote.createdAt.getTime()) / (1000 * 60 * 60)
      if (hoursSinceCreated < 48 || quote.status !== 'PENDING') {
        console.log('Reminder not needed:', {
          quoteId,
          hoursSinceCreated,
          status: quote.status,
        })
        return false
      }

      const emailData: QuoteEmailData = {
        quoteNumber: quote.quoteNumber,
        clientName: quote.clientName,
        clientEmail: quote.clientEmail,
        serviceType: quote.serviceType,
        estimatedPrice: quote.estimatedPrice ? Number(quote.estimatedPrice) : undefined,
        trackingUrl: `${this.baseUrl}/cotizacion/seguimiento/${quote.accessToken}`,
      }

      const template = createReminderTemplate(emailData)
      const success = await sendEmailWithRetry({
        to: quote.clientEmail,
        subject: template.subject,
        html: template.html,
        text: template.text,
      })

      console.log('Reminder notification sent:', {
        quoteId,
        quoteNumber: quote.quoteNumber,
        success,
      })

      return success
    } catch (error) {
      console.error('Error sending reminder notification:', error)
      return false
    }
  }

  /**
   * Send bulk reminder notifications for all pending quotes older than 48 hours
   */
  async sendBulkReminderNotifications(): Promise<{
    processed: number
    successful: number
    failed: number
  }> {
    try {
      // Get all pending quotes older than 48 hours
      const twoDaysAgo = new Date(Date.now() - 48 * 60 * 60 * 1000)
      
      const result = await quoteOperations.findMany({
        status: 'PENDING',
        dateTo: twoDaysAgo,
        limit: 100, // Process in batches
      })

      const quotes = result.quotes
      let successful = 0
      let failed = 0

      console.log(`Processing ${quotes.length} quotes for reminder notifications`)

      // Process reminders in parallel with limited concurrency
      const batchSize = 5
      for (let i = 0; i < quotes.length; i += batchSize) {
        const batch = quotes.slice(i, i + batchSize)
        const promises = batch.map(async (quote) => {
          try {
            const success = await this.sendReminderNotification(quote.id)
            return success
          } catch (error) {
            console.error(`Failed to send reminder for quote ${quote.id}:`, error)
            return false
          }
        })

        const results = await Promise.all(promises)
        successful += results.filter(Boolean).length
        failed += results.filter(r => !r).length

        // Add small delay between batches to avoid rate limiting
        if (i + batchSize < quotes.length) {
          await new Promise(resolve => setTimeout(resolve, 1000))
        }
      }

      console.log('Bulk reminder notifications completed:', {
        processed: quotes.length,
        successful,
        failed,
      })

      return {
        processed: quotes.length,
        successful,
        failed,
      }
    } catch (error) {
      console.error('Error sending bulk reminder notifications:', error)
      return { processed: 0, successful: 0, failed: 0 }
    }
  }

  /**
   * Send admin notification for high priority quotes
   */
  async sendHighPriorityNotification(quoteId: string): Promise<boolean> {
    try {
      const quote = await quoteOperations.findById(quoteId)
      if (!quote) {
        throw new Error('Quote not found')
      }

      const estimatedPrice = quote.estimatedPrice ? Number(quote.estimatedPrice) : 0
      if (estimatedPrice <= 300000) {
        return false // Not high priority
      }

      const emailData: QuoteEmailData = {
        quoteNumber: quote.quoteNumber,
        clientName: quote.clientName,
        clientEmail: quote.clientEmail,
        serviceType: quote.serviceType,
        estimatedPrice,
        trackingUrl: `${this.baseUrl}/cotizacion/seguimiento/${quote.accessToken}`,
        adminUrl: `${this.baseUrl}/admin/cotizaciones/${quote.id}`,
      }

      const template = createAdminQuoteNotificationTemplate(emailData)
      const success = await sendEmailWithRetry({
        to: emailConfig.adminEmail,
        subject: template.subject,
        html: template.html,
        text: template.text,
      })

      console.log('High priority notification sent:', {
        quoteId,
        quoteNumber: quote.quoteNumber,
        estimatedPrice,
        success,
      })

      return success
    } catch (error) {
      console.error('Error sending high priority notification:', error)
      return false
    }
  }
}

// Export singleton instance
export const notificationService = new NotificationService()

/**
 * Helper function to send new quote notifications
 */
export async function sendNewQuoteNotifications(quoteId: string) {
  return notificationService.sendNewQuoteNotifications(quoteId)
}

/**
 * Helper function to send status update notification
 */
export async function sendStatusUpdateNotification(
  quoteId: string,
  newStatus: string,
  previousStatus?: string,
  statusMessage?: string
) {
  return notificationService.sendStatusUpdateNotification(
    quoteId,
    newStatus,
    previousStatus,
    statusMessage
  )
}

/**
 * Helper function to send reminder notification
 */
export async function sendReminderNotification(quoteId: string) {
  return notificationService.sendReminderNotification(quoteId)
}

/**
 * Helper function to send bulk reminder notifications
 */
export async function sendBulkReminderNotifications() {
  return notificationService.sendBulkReminderNotifications()
}