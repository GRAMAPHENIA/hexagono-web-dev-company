export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface Plan {
  id: string;
  title: string;
  price: number;
  currency: string;
  popular?: boolean;
  features: string[];
  category: 'web' | 'social';
  description?: string;
}

export const webPlans: Plan[] = [
  {
    id: 'landing-page',
    title: 'Landing Page',
    price: 170000,
    currency: 'ARS',
    category: 'web',
    description: 'Página única optimizada para conversión',
    features: [
      'Enfocada en conversión',
      'Página única optimizada',
      'Adaptación a dispositivos',
      'Formularios integrados',
      'Conexión redes sociales',
      'Galería de imágenes',
    ],
  },
  {
    id: 'web-corporativa',
    title: 'Web Corporativa',
    price: 250000,
    currency: 'ARS',
    category: 'web',
    popular: true,
    description: 'Sitio web completo para tu empresa',
    features: [
      'Hasta 5 secciones',
      'Identidad de marca',
      'Hosting externo',
      'Diseño responsivo',
      'Formulario de contacto',
      'Optimización SEO básica',
    ],
  },
  {
    id: 'tienda-online',
    title: 'Tienda Online',
    price: 370000,
    currency: 'ARS',
    category: 'web',
    description: 'E-commerce completo con gestión de productos',
    features: [
      'Carrito de compras',
      'Medios de pago integrados',
      'Carga de productos',
      'Hosting incluido',
      'Panel administrativo',
      'Gestión de inventario',
    ],
  },
];

export const socialPlans: Plan[] = [
  {
    id: 'plan-inicial',
    title: 'Plan Inicial',
    price: 85000,
    currency: 'ARS',
    category: 'social',
    description: 'Perfecto para empezar en redes sociales',
    features: [
      '2 posts al mes',
      'Historias semanales',
      'Reducción de copias',
      'Diseño básico',
      '1 red social',
      'Reporte mensual',
    ],
  },
  {
    id: 'plan-activo',
    title: 'Plan Activo',
    price: 180000,
    currency: 'ARS',
    category: 'social',
    popular: true,
    description: 'Para empresas que buscan crecimiento activo',
    features: [
      '10 posts al mes',
      'Diseño profesional',
      'Email marketing mensual',
      '2 redes sociales',
      'Historias diarias',
      'Análisis de métricas',
    ],
  },
  {
    id: 'plan-premium',
    title: 'Plan Premium',
    price: 310000,
    currency: 'ARS',
    category: 'social',
    description: 'Estrategia completa de marketing digital',
    features: [
      'Estrategia de crecimiento',
      'Posts ilimitados',
      'Todas las redes sociales',
      'Campañas publicitarias',
      'Atención personalizada',
      'Reportes detallados',
    ],
  },
];

export const formatPrice = (price: number, currency: string = 'ARS'): string => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: currency === 'ARS' ? 'ARS' : 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const getAllPlans = (): Plan[] => [...webPlans, ...socialPlans];

export const getPlansByCategory = (category: 'web' | 'social'): Plan[] => {
  return category === 'web' ? webPlans : socialPlans;
};

export const getPlanById = (id: string): Plan | undefined => {
  return getAllPlans().find(plan => plan.id === id);
};