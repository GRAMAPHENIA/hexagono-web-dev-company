import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Descomenta y ajusta las rutas que no quieras indexar
      // disallow: ['/admin/', '/api/'],
    },
    sitemap: 'https://hexagono-web.com/sitemap.xml',
  }
}
