import { format, formatDistanceToNow, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

// Formatear precios en pesos argentinos
export function formatPrice(amount: number, showCurrency: boolean = true): string {
  const formatter = new Intl.NumberFormat('es-AR', {
    style: showCurrency ? 'currency' : 'decimal',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

  return formatter.format(amount)
}

// Formatear números con separadores de miles
export function formatNumber(value: number): string {
  return new Intl.NumberFormat('es-AR').format(value)
}

// Formatear fechas en español
export function formatDate(date: Date | string, pattern: string = 'dd/MM/yyyy'): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return format(dateObj, pattern, { locale: es })
}

// Formatear fecha y hora
export function formatDateTime(date: Date | string): string {
  return formatDate(date, 'dd/MM/yyyy HH:mm')
}

// Formatear fecha relativa (hace X tiempo)
export function formatRelativeDate(date: Date | string): string {
  const dateObj = typeof date === 'string' ? parseISO(date) : date
  return formatDistanceToNow(dateObj, { 
    addSuffix: true, 
    locale: es 
  })
}

// Formatear tamaño de archivo
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes'

  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Formatear número de teléfono argentino
export function formatPhoneNumber(phone: string): string {
  // Remover caracteres no numéricos excepto el +
  const cleaned = phone.replace(/[^\d+]/g, '')
  
  // Si empieza con +54, formatear como teléfono argentino
  if (cleaned.startsWith('+54')) {
    const number = cleaned.substring(3)
    if (number.length === 10) {
      return `+54 ${number.substring(0, 2)} ${number.substring(2, 6)}-${number.substring(6)}`
    }
  }
  
  return phone
}

// Formatear texto para URLs (slug)
export function formatSlug(text: string): string {
  return text
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // Remover acentos
    .replace(/[^a-z0-9\s-]/g, '') // Remover caracteres especiales
    .replace(/\s+/g, '-') // Reemplazar espacios con guiones
    .replace(/-+/g, '-') // Remover guiones duplicados
    .trim()
}

// Formatear nombre de archivo
export function formatFileName(fileName: string, maxLength: number = 30): string {
  if (fileName.length <= maxLength) return fileName
  
  const extension = fileName.split('.').pop()
  const nameWithoutExt = fileName.substring(0, fileName.lastIndexOf('.'))
  const truncatedName = nameWithoutExt.substring(0, maxLength - extension!.length - 4)
  
  return `${truncatedName}...${extension}`
}

// Formatear texto para mostrar en cards (truncar)
export function truncateText(text: string, maxLength: number = 100): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength).trim() + '...'
}

// Formatear estado de cotización para mostrar
export function formatQuoteStatus(status: string): string {
  const statusMap: Record<string, string> = {
    'PENDING': 'Pendiente',
    'IN_REVIEW': 'En Revisión',
    'QUOTED': 'Cotizada',
    'COMPLETED': 'Completada',
    'CANCELLED': 'Cancelada'
  }
  
  return statusMap[status] || status
}

// Formatear prioridad para mostrar
export function formatPriority(priority: string): string {
  const priorityMap: Record<string, string> = {
    'LOW': 'Baja',
    'MEDIUM': 'Media',
    'HIGH': 'Alta'
  }
  
  return priorityMap[priority] || priority
}

// Formatear tipo de servicio para mostrar
export function formatServiceType(serviceType: string): string {
  const serviceMap: Record<string, string> = {
    'LANDING_PAGE': 'Landing Page',
    'CORPORATE_WEB': 'Web Corporativa',
    'ECOMMERCE': 'Tienda Online',
    'SOCIAL_MEDIA': 'Gestión de Redes Sociales'
  }
  
  return serviceMap[serviceType] || serviceType
}

// Formatear porcentaje
export function formatPercentage(value: number, decimals: number = 1): string {
  return `${value.toFixed(decimals)}%`
}

// Formatear duración en minutos a texto legible
export function formatDuration(minutes: number): string {
  if (minutes < 60) {
    return `${minutes} minuto${minutes !== 1 ? 's' : ''}`
  }
  
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60
  
  if (remainingMinutes === 0) {
    return `${hours} hora${hours !== 1 ? 's' : ''}`
  }
  
  return `${hours}h ${remainingMinutes}m`
}

// Formatear lista de elementos con "y" al final
export function formatList(items: string[]): string {
  if (items.length === 0) return ''
  if (items.length === 1) return items[0]
  if (items.length === 2) return `${items[0]} y ${items[1]}`
  
  const lastItem = items.pop()
  return `${items.join(', ')} y ${lastItem}`
}

// Capitalizar primera letra
export function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase()
}

// Formatear texto en título (Title Case)
export function toTitleCase(text: string): string {
  return text
    .toLowerCase()
    .split(' ')
    .map(word => capitalize(word))
    .join(' ')
}

// Formatear número de cotización
export function formatQuoteNumber(number: string): string {
  // Formato: COT-2024-0001
  return number.toUpperCase()
}

// Formatear email para mostrar (ocultar parte del dominio)
export function formatEmailForDisplay(email: string): string {
  const [localPart, domain] = email.split('@')
  if (localPart.length <= 3) return email
  
  const visiblePart = localPart.substring(0, 3)
  const hiddenPart = '*'.repeat(localPart.length - 3)
  
  return `${visiblePart}${hiddenPart}@${domain}`
}