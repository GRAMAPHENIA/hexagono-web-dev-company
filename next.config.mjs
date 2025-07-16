/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['hexagono.xyz'],
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'hexagono.xyz',
      },
    ],
  },
  // Habilitar compresión
  compress: true,
  // Optimizar para producción
  swcMinify: true,
  // Headers de seguridad
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },
}

export default nextConfig
