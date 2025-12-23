const path = require('path');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable static export for GitHub Pages
  output: 'export',

  // Output directory for static files
  distDir: 'out',

  // Add trailing slashes for GitHub Pages compatibility
  trailingSlash: true,

  // Transpile workspace packages
  transpilePackages: ['@blog/ui', '@blog/tokens'],

  // Enable React Strict Mode for better development experience
  reactStrictMode: true,

  // Disable x-powered-by header for security
  poweredByHeader: false,

  // Image optimization configuration
  images: {
    // Static export requires unoptimized images
    unoptimized: true,
  },

  // Webpack configuration to resolve @ui/* path alias from @blog/ui package
  webpack: (config, { isServer }) => {
    config.resolve.alias['@ui'] = path.resolve(__dirname, '../../packages/ui/src');

    // Externalize problematic modules during SSR
    if (isServer) {
      // react-syntax-highlighter has issues with SSR, mark as external
      config.externals = [...(config.externals || []), {
        'react-syntax-highlighter': 'react-syntax-highlighter',
      }];
    }

    return config;
  },
};

module.exports = nextConfig;
