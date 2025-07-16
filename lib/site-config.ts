export const siteConfig = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || "Hexágono Web",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://hexagono-web.com",
  description: "Creamos sitios web profesionales y gestionamos tus redes sociales. Diseño profesional, precios accesibles, soporte real. Transforma tu presencia digital con nosotros.",
  keywords: [
    'desarrollo web',
    'sitios web',
    'redes sociales',
    'landing pages',
    'tiendas online',
    'diseño web',
    'marketing digital',
    'SEO',
    'desarrollo a medida',
  ],
  author: "Hexágono Web",
  creator: "Hexágono Web",
  publisher: "Hexágono Web",
  
  // Contact Information
  contact: {
    email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "contacto@hexagono-web.com",
    phone: process.env.NEXT_PUBLIC_CONTACT_PHONE || "+54 9 11 1234-5678",
    whatsapp: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "5491112345678",
  },

  // Social Media
  social: {
    twitter: process.env.NEXT_PUBLIC_TWITTER_HANDLE || "@hexagonoweb",
    facebook: process.env.NEXT_PUBLIC_FACEBOOK_PAGE || "hexagonoweb",
    instagram: process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || "hexagonoweb",
  },

  // SEO
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
  },

  // Open Graph Images
  ogImage: "/og-image.jpg",
  
  // Navigation
  mainNav: [
    {
      title: "Inicio",
      href: "/",
    },
    {
      title: "Servicios",
      href: "/services",
    },
    {
      title: "Testimonios",
      href: "/testimonials",
    },
    {
      title: "FAQ",
      href: "/faq",
    },
    {
      title: "Acerca de",
      href: "/about",
    },
    {
      title: "Contacto",
      href: "/contact",
    },
  ],

  // Footer Links
  footerLinks: [
    {
      title: "Servicios",
      items: [
        {
          title: "Desarrollo Web",
          href: "/services#web",
        },
        {
          title: "Redes Sociales",
          href: "/services#social",
        },
        {
          title: "Landing Pages",
          href: "/services#landing",
        },
        {
          title: "Tiendas Online",
          href: "/services#ecommerce",
        },
      ],
    },
    {
      title: "Empresa",
      items: [
        {
          title: "Acerca de",
          href: "/about",
        },
        {
          title: "Testimonios",
          href: "/testimonials",
        },
        {
          title: "FAQ",
          href: "/faq",
        },
        {
          title: "Contacto",
          href: "/contact",
        },
      ],
    },
    {
      title: "Legal",
      items: [
        {
          title: "Términos de Servicio",
          href: "/terms",
        },
        {
          title: "Política de Privacidad",
          href: "/privacy",
        },
        {
          title: "Política de Cookies",
          href: "/cookies",
        },
      ],
    },
  ],
};