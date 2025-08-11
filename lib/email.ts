import { Resend } from 'resend'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY environment variable is required')
}

export const resend = new Resend(process.env.RESEND_API_KEY)

// Email configuration
export const emailConfig = {
  from: process.env.COMPANY_EMAIL || 'contacto@hexagono.xyz',
  adminEmail: process.env.ADMIN_EMAIL || 'admin@hexagono.xyz',
  replyTo: process.env.COMPANY_EMAIL || 'contacto@hexagono.xyz',
}

// Email types
export interface EmailTemplate {
  to: string | string[]
  subject: string
  html: string
  text?: string
}

export interface QuoteEmailData {
  quoteNumber: string
  clientName: string
  clientEmail: string
  serviceType: string
  estimatedPrice?: number
  trackingUrl: string
  adminUrl?: string
}

/**
 * Send email using Resend
 */
export async function sendEmail(template: EmailTemplate): Promise<boolean> {
  try {
    const result = await resend.emails.send({
      from: emailConfig.from,
      to: template.to,
      subject: template.subject,
      html: template.html,
      text: template.text,
      replyTo: emailConfig.replyTo,
    })

    if (result.error) {
      console.error('Error sending email:', result.error)
      return false
    }

    console.log('Email sent successfully:', result.data?.id)
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

/**
 * Send email with retry logic
 */
export async function sendEmailWithRetry(
  template: EmailTemplate,
  maxRetries = 3,
  delay = 1000
): Promise<boolean> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const success = await sendEmail(template)
      if (success) return true
      
      if (attempt < maxRetries) {
        console.log(`Email send attempt ${attempt} failed, retrying in ${delay}ms...`)
        await new Promise(resolve => setTimeout(resolve, delay))
        delay *= 2 // Exponential backoff
      }
    } catch (error) {
      console.error(`Email send attempt ${attempt} failed:`, error)
      if (attempt === maxRetries) {
        return false
      }
    }
  }
  
  return false
}

/**
 * Validate email address
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Format price for display in emails
 */
export function formatPriceForEmail(price: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price).replace('$ ', '$')
}

/**
 * Get service type display name in Spanish
 */
export function getServiceTypeDisplayName(serviceType: string): string {
  const serviceNames = {
    LANDING_PAGE: 'Landing Page',
    CORPORATE_WEB: 'Web Corporativa',
    ECOMMERCE: 'Tienda Online',
    SOCIAL_MEDIA: 'Gestión de Redes Sociales',
  }
  
  return serviceNames[serviceType as keyof typeof serviceNames] || serviceType
}