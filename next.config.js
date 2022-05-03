/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_WS_SERVER: process.env.NEXT_PUBLIC_WS_SERVER,
  }
}

module.exports = nextConfig
