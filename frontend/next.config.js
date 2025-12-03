/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'via.placeholder.com'],
    unoptimized: true,
  },
  reactStrictMode: true,
};

module.exports = nextConfig;
