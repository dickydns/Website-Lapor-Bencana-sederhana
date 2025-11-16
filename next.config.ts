import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  experimental: {
    serverComponentsExternalPackages: ['@prisma/client', 'prisma']
  },
  // Tambahkan ini untuk Netlify
  output: 'export', // Kalau pure static
  // ATAU kalau pakai API routes:
  // Jangan pakai output: 'export'
}

export default nextConfig