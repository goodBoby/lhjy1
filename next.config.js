/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  i18n: {
    locales: ['en', 'zh', 'ja', 'ko'],
    defaultLocale: 'en',
  },
}

module.exports = nextConfig
