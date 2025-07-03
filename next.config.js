/** @type {import('next').NextConfig} */
const nextConfig = {
  // No experimental config needed for Next.js 14 - App Router is stable
  images: {
    unoptimized: true
  },
  trailingSlash: true
}

module.exports = nextConfig
