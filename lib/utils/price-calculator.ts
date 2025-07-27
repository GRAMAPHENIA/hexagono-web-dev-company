import type { ServiceType, PriceEstimate, FeatureCost } from '@/lib/types/quote'

// Base prices for each service type (in ARS)
const BASE_PRICES: Record<ServiceType, number> = {
  LANDING_PAGE: 170000,
  CORPORATE_WEB: 250000,
  ECOMMERCE: 370000,
  SOCIAL_MEDIA: 85000 // Plan Inicial as base
}

// Additional features and their costs
const FEATURE_COSTS: Record<string, number> = {
  // Landing Page features
  'contact-form': 15000,
  'newsletter-signup': 10000,
  'social-media-integration': 12000,
  'analytics-setup': 8000,
  'seo-optimization': 25000,
  'custom-animations': 20000,
  'multilingual': 30000,
  
  // Corporate Web features
  'blog-system': 45000,
  'team-section': 15000,
  'portfolio-gallery': 25000,
  'testimonials-section': 12000,
  'services-catalog': 35000,
  'appointment-booking': 50000,
  'live-chat': 30000,
  'custom-cms': 80000,
  'advanced-seo': 40000,
  
  // E-commerce features
  'payment-gateway': 60000,
  'inventory-management': 70000,
  'order-tracking': 40000,
  'customer-accounts': 35000,
  'wishlist': 20000,
  'product-reviews': 25000,
  'discount-coupons': 30000,
  'shipping-calculator': 35000,
  'multi-currency': 45000,
  'advanced-analytics': 50000,
  
  // Social Media features (upgrades from base plan)
  'premium-plan-upgrade': 95000, // Difference to Plan Premium (310000 - 180000 - 85000)
  'active-plan-upgrade': 95000,  // Difference to Plan Activo (180000 - 85000)
  'content-calendar': 25000,
  'advanced-reporting': 30000,
  'competitor-analysis': 40000,
  'influencer-outreach': 50000,
  
  // General features
  'maintenance-plan': 15000,
  'hosting-setup': 10000,
  'domain-registration': 5000,
  'ssl-certificate': 8000,
  'backup-system': 12000,
  'performance-optimization': 35000,
  'security-hardening': 40000,
  'custom-integrations': 60000
}

/**
 * Gets the base price for a service type
 * @param serviceType - The type of service
 * @returns Base price in ARS
 */
export function getBasePrice(serviceType: ServiceType): number {
  return BASE_PRICES[serviceType] || 0
}

/**
 * Gets the cost of a specific feature
 * @param featureName - Name of the feature
 * @returns Feature cost in ARS, 0 if not found
 */
export function getFeatureCost(featureName: string): number {
  return FEATURE_COSTS[featureName] || 0
}

/**
 * Calculates the total price estimate for a quote
 * @param serviceType - The type of service requested
 * @param features - Array of selected feature names
 * @returns Complete price estimate object
 */
export function calculatePriceEstimate(
  serviceType: ServiceType, 
  features: string[] = []
): PriceEstimate {
  const basePrice = getBasePrice(serviceType)
  
  const additionalFeatures: FeatureCost[] = features
    .map(featureName => ({
      name: featureName,
      cost: getFeatureCost(featureName)
    }))
    .filter(feature => feature.cost > 0) // Only include features with valid costs
  
  const totalAdditionalCost = additionalFeatures.reduce(
    (total, feature) => total + feature.cost, 
    0
  )
  
  const totalEstimate = basePrice + totalAdditionalCost
  
  return {
    basePrice,
    additionalFeatures,
    totalEstimate,
    currency: 'ARS',
    disclaimer: 'Este es un precio estimado. El costo final puede variar según los requerimientos específicos del proyecto.'
  }
}/**
 
* Formats a price in Argentine pesos
 * @param amount - Amount to format
 * @returns Formatted price string
 */
export function formatPrice(amount: number): string {
  const formatted = new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
  
  // Remove space after currency symbol for consistency
  return formatted.replace(/^\$\s/, '$').replace(/^-\$\s/, '-$')
}

/**
 * Calculates priority based on estimated price
 * @param estimatedPrice - The estimated price of the quote
 * @returns Priority level
 */
export function calculatePriority(estimatedPrice: number): 'LOW' | 'MEDIUM' | 'HIGH' {
  if (estimatedPrice >= 300000) {
    return 'HIGH'
  } else if (estimatedPrice >= 150000) {
    return 'MEDIUM'
  } else {
    return 'LOW'
  }
}

/**
 * Gets available features for a specific service type
 * @param serviceType - The service type
 * @returns Array of available feature names
 */
export function getAvailableFeatures(serviceType: ServiceType): string[] {
  const commonFeatures = [
    'seo-optimization',
    'analytics-setup',
    'maintenance-plan',
    'hosting-setup',
    'domain-registration',
    'ssl-certificate',
    'backup-system',
    'performance-optimization',
    'security-hardening'
  ]
  
  switch (serviceType) {
    case 'LANDING_PAGE':
      return [
        ...commonFeatures,
        'contact-form',
        'newsletter-signup',
        'social-media-integration',
        'custom-animations',
        'multilingual'
      ]
      
    case 'CORPORATE_WEB':
      return [
        ...commonFeatures,
        'blog-system',
        'team-section',
        'portfolio-gallery',
        'testimonials-section',
        'services-catalog',
        'appointment-booking',
        'live-chat',
        'custom-cms',
        'advanced-seo',
        'custom-integrations'
      ]
      
    case 'ECOMMERCE':
      return [
        ...commonFeatures,
        'payment-gateway',
        'inventory-management',
        'order-tracking',
        'customer-accounts',
        'wishlist',
        'product-reviews',
        'discount-coupons',
        'shipping-calculator',
        'multi-currency',
        'advanced-analytics',
        'custom-integrations'
      ]
      
    case 'SOCIAL_MEDIA':
      return [
        'active-plan-upgrade',
        'premium-plan-upgrade',
        'content-calendar',
        'advanced-reporting',
        'competitor-analysis',
        'influencer-outreach'
      ]
      
    default:
      return commonFeatures
  }
}

/**
 * Validates if features are available for a service type
 * @param serviceType - The service type
 * @param features - Array of feature names to validate
 * @returns Object with valid and invalid features
 */
export function validateFeatures(serviceType: ServiceType, features: string[]) {
  const availableFeatures = getAvailableFeatures(serviceType)
  
  const validFeatures = features.filter(feature => 
    availableFeatures.includes(feature)
  )
  
  const invalidFeatures = features.filter(feature => 
    !availableFeatures.includes(feature)
  )
  
  return {
    validFeatures,
    invalidFeatures,
    isValid: invalidFeatures.length === 0
  }
}