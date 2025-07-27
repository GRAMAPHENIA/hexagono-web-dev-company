/**
 * Utilities for generating unique quote numbers
 * Format: COT-YYYYMMDD-NNNN
 * Example: COT-20241221-0001
 */

/**
 * Generates a unique quote number based on current date and sequence
 * @param sequence - Optional sequence number, if not provided will use timestamp-based approach
 * @returns Formatted quote number string
 */
export function generateQuoteNumber(sequence?: number): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  
  const dateStr = `${year}${month}${day}`
  
  // If sequence is provided, use it; otherwise generate based on timestamp
  const sequenceNumber = sequence 
    ? String(sequence).padStart(4, '0')
    : generateSequenceFromTimestamp(now)
  
  return `COT-${dateStr}-${sequenceNumber}`
}

/**
 * Generates a sequence number based on timestamp to ensure uniqueness
 * Uses microseconds and random component for better uniqueness
 * @param date - Date object to generate sequence from
 * @returns 4-digit sequence string
 */
function generateSequenceFromTimestamp(date: Date): string {
  const milliseconds = date.getMilliseconds()
  const microseconds = Math.floor(performance.now() * 1000) % 1000
  const random = Math.floor(Math.random() * 100)
  
  // Create a unique 4-digit number from time components and randomness
  const sequence = (milliseconds * 10) + microseconds + random
  
  return String(sequence % 10000).padStart(4, '0')
}

/**
 * Validates if a quote number has the correct format
 * @param quoteNumber - Quote number string to validate
 * @returns True if format is valid
 */
export function isValidQuoteNumber(quoteNumber: string): boolean {
  const quoteNumberRegex = /^COT-\d{8}-\d{4}$/
  return quoteNumberRegex.test(quoteNumber)
}

/**
 * Extracts the date from a quote number
 * @param quoteNumber - Valid quote number string
 * @returns Date object or null if invalid
 */
export function extractDateFromQuoteNumber(quoteNumber: string): Date | null {
  if (!isValidQuoteNumber(quoteNumber)) {
    return null
  }
  
  const datePart = quoteNumber.split('-')[1]
  const year = parseInt(datePart.substring(0, 4))
  const month = parseInt(datePart.substring(4, 6)) - 1 // Month is 0-indexed
  const day = parseInt(datePart.substring(6, 8))
  
  return new Date(year, month, day)
}

/**
 * Extracts the sequence number from a quote number
 * @param quoteNumber - Valid quote number string
 * @returns Sequence number or null if invalid
 */
export function extractSequenceFromQuoteNumber(quoteNumber: string): number | null {
  if (!isValidQuoteNumber(quoteNumber)) {
    return null
  }
  
  const sequencePart = quoteNumber.split('-')[2]
  return parseInt(sequencePart)
}

/**
 * Generates a secure access token for quote tracking
 * @returns 32-character random string
 */
export function generateAccessToken(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  
  for (let i = 0; i < 32; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  
  return result
}

/**
 * Validates if an access token has the correct format
 * @param token - Access token string to validate
 * @returns True if format is valid
 */
export function isValidAccessToken(token: string): boolean {
  return typeof token === 'string' && token.length === 32 && /^[A-Za-z0-9]+$/.test(token)
}