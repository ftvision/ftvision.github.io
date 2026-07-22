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

    // Keep SVGs as inspectable source assets while allowing MDX/TSX to import
    // them as React components. Add `?url` when a URL is needed instead.
    const svgComponentLoader = path.resolve(
      __dirname,
      'lib/webpack/svg-component-loader.cjs'
    );
    const assetRule = config.module.rules.find(
      (rule) => rule.test instanceof RegExp && rule.test.test('.svg')
    );

    if (assetRule) {
      config.module.rules.push(
        {
          ...assetRule,
          test: /\.svg$/i,
          resourceQuery: /url/,
        },
        {
          test: /\.svg$/i,
          issuer: assetRule.issuer,
          resourceQuery: { not: [...(assetRule.resourceQuery?.not || []), /url/] },
          use: [svgComponentLoader],
        }
      );
      assetRule.exclude = /\.svg$/i;
    } else {
      config.module.rules.push({
        test: /\.svg$/i,
        issuer: /\.(?:[jt]sx?|mdx)$/,
        use: [svgComponentLoader],
      });
    }

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
