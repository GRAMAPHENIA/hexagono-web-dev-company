import { SERVICE_TYPES } from '@/lib/types/quote'
import type { ServiceType, PriceCalculationResult } from '@/lib/types/quote'

// Características adicionales y sus precios
export const ADDITIONAL_FEATURES = {
  // Características comunes
  'seo-avanzado': {
    name: 'SEO Avanzado',
    price: 45000,
    description: 'Optimización avanzada para motores de búsqueda'
  },
  'analytics': {
    name: 'Google Analytics',
    price: 15000,
    description: 'Configuración e integración de Google Analytics'
  },
  'chat-online': {
    name: 'Chat Online',
    price: 25000,
    description: 'Widget de chat en vivo integrado'
  },
  'formularios-avanzados': {
    name: 'Formularios Avanzados',
    price: 20000,
    description: 'Formularios personalizados con validaciones'
  },
  'multiidioma': {
    name: 'Sitio Multiidioma',
    price: 80000,
    description: 'Soporte para múltiples idiomas'
  },
  'certificado-ssl': {
    name: 'Certificado SSL',
    price: 12000,
    description: 'Certificado de seguridad SSL'
  },
  
  // Características específicas para Landing Page
  'popup-promocional': {
    name: 'Popup Promocional',
    price: 18000,
    description: 'Popup personalizado para promociones'
  },
  'contador-regresivo': {
    name: 'Contador Regresivo',
    price: 15000,
    description: 'Contador regresivo para ofertas limitadas'
  },
  
  // Características específicas para Web Corporativa
  'blog': {
    name: 'Blog Integrado',
    price: 35000,
    description: 'Sistema de blog con panel de administración'
  },
  'galeria-imagenes': {
    name: 'Galería de Imágenes',
    price: 22000,
    description: 'Galería de imágenes responsive'
  },
  'testimonios': {
    name: 'Sección de Testimonios',
    price: 18000,
    description: 'Sección para mostrar testimonios de clientes'
  },
  'equipo': {
    name: 'Página de Equipo',
    price: 25000,
    description: 'Página dedicada al equipo de trabajo'
  },
  
  // Características específicas para E-commerce
  'pasarela-pagos': {
    name: 'Pasarela de Pagos',
    price: 60000,
    description: 'Integración con MercadoPago y otros medios de pago'
  },
  'inventario-avanzado': {
    name: 'Gestión de Inventario',
    price: 45000,
    description: 'Sistema avanzado de gestión de inventario'
  },
  'cupones-descuentos': {
    name: 'Sistema de Cupones',
    price: 35000,
    description: 'Sistema de cupones y descuentos'
  },
  'wishlist': {
    name: 'Lista de Deseos',
    price: 28000,
    description: 'Funcionalidad de lista de deseos para usuarios'
  },
  'comparador-productos': {
    name: 'Comparador de Productos',
    price: 40000,
    description: 'Herramienta para comparar productos'
  },
  'reviews-productos': {
    name: 'Reseñas de Productos',
    price: 30000,
    description: 'Sistema de reseñas y calificaciones'
  },
  
  // Características específicas para Redes Sociales
  'contenido-premium': {
    name: 'Contenido Premium',
    price: 25000,
    description: 'Creación de contenido premium mensual adicional'
  },
  'stories-destacadas': {
    name: 'Stories Destacadas',
    price: 15000,
    description: 'Creación y gestión de stories destacadas'
  },
  'campanas-publicitarias': {
    name: 'Campañas Publicitarias',
    price: 50000,
    description: 'Gestión de campañas publicitarias en redes sociales'
  },
  'influencer-marketing': {
    name: 'Marketing de Influencers',
    price: 40000,
    description: 'Gestión de colaboraciones con influencers'
  }
} as const

// Multiplicadores por urgencia del proyecto
export const URGENCY_MULTIPLIERS = {
  'normal': 1.0,      // Más de 30 días
  'urgente': 1.25,    // 15-30 días
  'muy-urgente': 1.5  // Menos de 15 días
} as const

// Descuentos por volumen o tipo de cliente
export const DISCOUNTS = {
  'cliente-recurrente': 0.1,    // 10% descuento
  'referido': 0.05,             // 5% descuento
  'estudiante': 0.15,           // 15% descuento
  'ong': 0.2                    // 20% descuento
} as const

// Función principal para calcular el precio de una cotización
export function calculateQuotePrice(
  serviceType: ServiceType,
  features: string[] = [],
  urgency: keyof typeof URGENCY_MULTIPLIERS = 'normal',
  discount?: keyof typeof DISCOUNTS
): PriceCalculationResult {
  // Precio base del servicio
  const serviceInfo = SERVICE_TYPES[serviceType]
  const basePrice = serviceInfo.basePrice

  // Calcular precio de características adicionales
  const featuresPrice = features.reduce((total, featureKey) => {
    const feature = ADDITIONAL_FEATURES[featureKey as keyof typeof ADDITIONAL_FEATURES]
    return total + (feature?.price || 0)
  }, 0)

  // Precio subtotal antes de modificadores
  const subtotal = basePrice + featuresPrice

  // Aplicar multiplicador de urgencia
  const urgencyMultiplier = URGENCY_MULTIPLIERS[urgency]
  const priceWithUrgency = subtotal * urgencyMultiplier

  // Aplicar descuento si corresponde
  const discountRate = discount ? DISCOUNTS[discount] : 0
  const finalPrice = priceWithUrgency * (1 - discountRate)

  // Crear breakdown detallado
  const breakdown = {
    service: {
      name: serviceInfo.name,
      price: basePrice
    },
    features: features.map(featureKey => {
      const feature = ADDITIONAL_FEATURES[featureKey as keyof typeof ADDITIONAL_FEATURES]
      return {
        name: feature?.name || featureKey,
        price: feature?.price || 0
      }
    }).filter(f => f.price > 0)
  }

  return {
    basePrice,
    featuresPrice,
    totalPrice: Math.round(finalPrice),
    breakdown
  }
}

// Función para obtener características recomendadas por tipo de servicio
export function getRecommendedFeatures(serviceType: ServiceType): string[] {
  const recommendations: Record<ServiceType, string[]> = {
    LANDING_PAGE: [
      'seo-avanzado',
      'analytics',
      'popup-promocional',
      'certificado-ssl'
    ],
    CORPORATE_WEB: [
      'seo-avanzado',
      'analytics',
      'blog',
      'testimonios',
      'certificado-ssl'
    ],
    ECOMMERCE: [
      'pasarela-pagos',
      'inventario-avanzado',
      'reviews-productos',
      'certificado-ssl',
      'analytics'
    ],
    SOCIAL_MEDIA: [
      'contenido-premium',
      'stories-destacadas',
      'analytics'
    ]
  }

  return recommendations[serviceType] || []
}

// Función para obtener el rango de precios de un servicio
export function getPriceRange(serviceType: ServiceType): { min: number; max: number } {
  const basePrice = SERVICE_TYPES[serviceType].basePrice
  const recommendedFeatures = getRecommendedFeatures(serviceType)
  
  const minFeaturesPrice = recommendedFeatures
    .slice(0, 2)
    .reduce((total, feature) => {
      const featureInfo = ADDITIONAL_FEATURES[feature as keyof typeof ADDITIONAL_FEATURES]
      return total + (featureInfo?.price || 0)
    }, 0)

  const maxFeaturesPrice = Object.values(ADDITIONAL_FEATURES)
    .filter(feature => {
      // Filtrar características relevantes para el tipo de servicio
      if (serviceType === 'LANDING_PAGE') {
        return !feature.name.includes('E-commerce') && !feature.name.includes('Blog')
      }
      if (serviceType === 'ECOMMERCE') {
        return !feature.name.includes('Redes Sociales')
      }
      return true
    })
    .slice(0, 8) // Máximo 8 características adicionales
    .reduce((total, feature) => total + feature.price, 0)

  return {
    min: Math.round(basePrice + minFeaturesPrice),
    max: Math.round((basePrice + maxFeaturesPrice) * URGENCY_MULTIPLIERS['muy-urgente'])
  }
}

// Función para validar si una característica es compatible con un tipo de servicio
export function isFeatureCompatible(serviceType: ServiceType, featureKey: string): boolean {
  const incompatibleFeatures: Record<ServiceType, string[]> = {
    LANDING_PAGE: ['pasarela-pagos', 'inventario-avanzado', 'wishlist', 'comparador-productos'],
    CORPORATE_WEB: ['pasarela-pagos', 'inventario-avanzado', 'wishlist'],
    ECOMMERCE: ['campanas-publicitarias', 'influencer-marketing'],
    SOCIAL_MEDIA: ['pasarela-pagos', 'inventario-avanzado', 'blog']
  }

  return !incompatibleFeatures[serviceType]?.includes(featureKey)
}

// Función para calcular el tiempo estimado de desarrollo
export function calculateDevelopmentTime(
  serviceType: ServiceType,
  features: string[] = []
): { min: number; max: number } {
  // Tiempo base en días laborales
  const baseTimes: Record<ServiceType, { min: number; max: number }> = {
    LANDING_PAGE: { min: 7, max: 14 },
    CORPORATE_WEB: { min: 14, max: 21 },
    ECOMMERCE: { min: 21, max: 35 },
    SOCIAL_MEDIA: { min: 3, max: 7 }
  }

  // Tiempo adicional por característica (en días)
  const featureTimes: Record<string, number> = {
    'seo-avanzado': 2,
    'analytics': 1,
    'chat-online': 1,
    'multiidioma': 7,
    'blog': 5,
    'pasarela-pagos': 5,
    'inventario-avanzado': 3,
    'cupones-descuentos': 3
  }

  const baseTime = baseTimes[serviceType]
  const additionalTime = features.reduce((total, feature) => {
    return total + (featureTimes[feature] || 1)
  }, 0)

  return {
    min: baseTime.min + Math.floor(additionalTime * 0.7),
    max: baseTime.max + additionalTime
  }
}

// Función para generar presupuesto detallado en formato texto
export function generateQuoteBreakdown(calculation: PriceCalculationResult): string {
  let breakdown = `Servicio Base: ${calculation.breakdown.service.name} - ${formatPrice(calculation.breakdown.service.price)}\n`

  if (calculation.breakdown.features.length > 0) {
    breakdown += '\nCaracterísticas Adicionales:\n'
    calculation.breakdown.features.forEach(feature => {
      breakdown += `• ${feature.name} - ${formatPrice(feature.price)}\n`
    })
  }

  breakdown += `\nTotal: ${formatPrice(calculation.totalPrice)}`
  
  return breakdown
}

// Función auxiliar para formatear precios (reutilizada de format.ts)
function formatPrice(amount: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(amount)
}