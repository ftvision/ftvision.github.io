/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpile workspace packages
  transpilePackages: ['@blog/ui', '@blog/tokens'],

  // Enable React Strict Mode for better development experience
  reactStrictMode: true,

  // Disable x-powered-by header for security
  poweredByHeader: false,

  // Image optimization configuration
  images: {
    // For static export, images need to be unoptimized
    unoptimized: process.env.NODE_ENV === 'production',
  },
};

module.exports = nextConfig;
