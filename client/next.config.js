/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.imgflip.com',
      },
    ],
  },
  env: {
    WS_SERVER_URL: process.env.WS_SERVER_URL
  }
}

module.exports = nextConfig
