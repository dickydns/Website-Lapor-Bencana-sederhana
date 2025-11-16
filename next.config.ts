import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // ✅ PENTING untuk Netlify
  output: 'export', // Static export untuk Netlify
  
  // ✅ Image optimization (disable untuk static export)
  images: {
    unoptimized: true,
  },

  // ✅ Disable server-side features
  // Karena Netlify static hosting
  
  // Optional: Base path (jika deploy di subdirectory)
  // basePath: '/my-app',

  // Optional: Trailing slash
  trailingSlash: true,

  // Optional: ESLint


  // Optional: TypeScript
  typescript: {
    ignoreBuildErrors: false,
  },
};

export default nextConfig;