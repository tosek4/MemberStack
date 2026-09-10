import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Optimized output for Docker / production deployments
  output: 'standalone',

  // Proxy frontend API requests to the LoopBack backend
  async rewrites() {
    return [
      {
        source: '/server/:path*',
        destination: `${process.env.BACKEND_URL ?? 'http://localhost:8080'}/api/:path*`,
      },
    ]
  },

  // Configure this later if you use images from external
  // domains such as Cloudinary, S3, etc.
  images: {
    remotePatterns: [],
  },
}

export default nextConfig
