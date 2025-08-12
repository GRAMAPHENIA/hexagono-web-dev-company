import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { serviceTypeSchema } from '@/lib/validations/quote'
import { PriceEstimate, FeatureCost } from '@/lib/types/quote'
import { handleApiError, createSuccessResponse, validateApiInput, logError, PricingCalculationError } from '@/lib/utils/api-errors'

// Validation schema for pricing calculation request
const pricingRequestSchema = z.object({
  serviceType: serviceTypeSchema,
  features: z.array(z.string()).default([]),
  customRequirements: z.string().optional()
})

/**
 * POST /api/pricing/calculate - Calculate price estimate in real-time
 */
export async function POST(request: NextRequest) {
  let body: any
  try {
    body = await request.json()
    
    // Validate the request data
    const validation = pricingRequestSchema.safeParse(body)
    if (!validation.success) {
      throw validation.error
    }
    const { serviceType, features, customRequirements } = validation.data

    // Calculate price estimate
    const priceEstimate = calculatePriceEstimate(serviceType, features, customRequirements)

    // Log pricing calculation for analytics
    console.log('Price calculated:', {
      serviceType,
      featuresCount: features.length,
      features,
      hasCustomRequirements: !!customRequirements,
      totalEstimate: priceEstimate.totalEstimate,
      timestamp: new Date().toISOString()
    })

    return createSuccessResponse(priceEstimate, 'Precio calculado exitosamente')

  } catch (error) {
    logError(error, 'price_calculation_failed', { body })
    return handleApiError(error)
  }
}

/**
 * Calculate comprehensive price estimate
 */
function calculatePriceEstimate(
  serviceType: string, 
  features: string[] = [], 
  customRequirements?: string
): PriceEstimate {
  // Base prices for each service type
  const basePrices: Record<string, number> = {
    LANDING_PAGE: 170000,
    CORPORATE_WEB: 250000,
    ECOMMERCE: 370000,
    SOCIAL_MEDIA: 180000
  }

  // Feature costs with detailed pricing
  const featurePrices: Record<string, number> = {
    // SEO and Marketing
    'seo-optimization': 50000,
    'google-analytics': 25000,
    'social-media-integration': 35000,
    'newsletter-integration': 30000,
    'blog-functionality': 45000,
    
    // Design and UX
    'responsive-design': 30000,
    'custom-animations': 60000,
    'interactive-elements': 40000,
    'image-gallery': 35000,
    'video-integration': 45000,
    
    // Functionality
    'contact-forms': 25000,
    'live-chat': 40000,
    'booking-system': 90000,
    'user-accounts': 70000,
    'admin-panel': 100000,
    'cms-integration': 80000,
    
    // E-commerce specific
    'payment-gateway': 100000,
    'inventory-management': 150000,
    'shopping-cart': 80000,
    'product-catalog': 60000,
    'order-management': 120000,
    'shipping-integration': 90000,
    
    // Advanced features
    'multilingual': 60000,
    'api-integration': 80000,
    'custom-database': 120000,
    'third-party-integrations': 70000,
    'advanced-security': 90000,
    'performance-optimization': 50000
  }

  // Service type specific feature multipliers
  const serviceMultipliers: Record<string, number> = {
    LANDING_PAGE: 0.8,  // Simpler implementation
    CORPORATE_WEB: 1.0, // Standard implementation
    ECOMMERCE: 1.3,     // More complex implementation
    SOCIAL_MEDIA: 0.9   // Specialized but focused
  }

  const basePrice = basePrices[serviceType] || 0
  const multiplier = serviceMultipliers[serviceType] || 1.0

  // Calculate feature costs
  const additionalFeatures: FeatureCost[] = features.map(feature => {
    const baseCost = featurePrices[feature] || 0
    const adjustedCost = Math.round(baseCost * multiplier)
    
    return {
      name: getFeatureDisplayName(feature),
      cost: adjustedCost
    }
  })

  // Calculate total additional features cost
  const additionalCost = additionalFeatures.reduce((total, feature) => total + feature.cost, 0)

  // Add complexity bonus for custom requirements
  let complexityBonus = 0
  if (customRequirements && customRequirements.length > 100) {
    complexityBonus = Math.round(basePrice * 0.15) // 15% bonus for complex requirements
  }

  // Calculate total estimate
  const totalEstimate = basePrice + additionalCost + complexityBonus

  // Generate appropriate disclaimer
  const disclaimer = generateDisclaimer(serviceType, features.length, !!customRequirements)

  return {
    basePrice,
    additionalFeatures,
    totalEstimate,
    currency: 'ARS',
    disclaimer
  }
}

/**
 * Get user-friendly feature display names
 */
function getFeatureDisplayName(feature: string): string {
  const displayNames: Record<string, string> = {
    'seo-optimization': 'Optimización SEO',
    'google-analytics': 'Google Analytics',
    'social-media-integration': 'Integración Redes Sociales',
    'newsletter-integration': 'Newsletter',
    'blog-functionality': 'Blog',
    'responsive-design': 'Diseño Responsive',
    'custom-animations': 'Animaciones Personalizadas',
    'interactive-elements': 'Elementos Interactivos',
    'image-gallery': 'Galería de Imágenes',
    'video-integration': 'Integración de Videos',
    'contact-forms': 'Formularios de Contacto',
    'live-chat': 'Chat en Vivo',
    'booking-system': 'Sistema de Reservas',
    'user-accounts': 'Cuentas de Usuario',
    'admin-panel': 'Panel Administrativo',
    'cms-integration': 'Sistema de Gestión de Contenido',
    'payment-gateway': 'Pasarela de Pagos',
    'inventory-management': 'Gestión de Inventario',
    'shopping-cart': 'Carrito de Compras',
    'product-catalog': 'Catálogo de Productos',
    'order-management': 'Gestión de Pedidos',
    'shipping-integration': 'Integración de Envíos',
    'multilingual': 'Sitio Multiidioma',
    'api-integration': 'Integración con APIs',
    'custom-database': 'Base de Datos Personalizada',
    'third-party-integrations': 'Integraciones Terceros',
    'advanced-security': 'Seguridad Avanzada',
    'performance-optimization': 'Optimización de Performance'
  }

  return displayNames[feature] || feature
}

/**
 * Generate contextual disclaimer based on project complexity
 */
function generateDisclaimer(serviceType: string, featureCount: number, hasCustomRequirements: boolean): string {
  const baseDisclaimer = 'Este es un precio estimado. El costo final puede variar según los requerimientos específicos del proyecto.'
  
  if (featureCount > 8 || hasCustomRequirements) {
    return `${baseDisclaimer} Debido a la complejidad del proyecto, recomendamos una consulta personalizada para obtener una cotización más precisa.`
  }
  
  if (serviceType === 'ECOMMERCE' && featureCount > 5) {
    return `${baseDisclaimer} Los proyectos de e-commerce requieren análisis detallado de integraciones y funcionalidades específicas.`
  }
  
  return baseDisclaimer
}