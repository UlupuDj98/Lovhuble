import type { NextConfig } from 'next'

const medusaUrl = process.env.NEXT_PUBLIC_MEDUSA_URL ?? 'http://localhost:9000'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/api/medusa/:path*',
        destination: `${medusaUrl}/:path*`,
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9000',
        pathname: '/static/**',
      },
      {
        protocol: 'https',
        hostname: 'lovehuble-backend-production.up.railway.app',
        pathname: '/static/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
}

export default nextConfig
