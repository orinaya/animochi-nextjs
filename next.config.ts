import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites () {
    return [
      {
        source: '/documentation/:path*',
        destination: '/documentation/:path*',
      }
    ]
  }
}

export default nextConfig
