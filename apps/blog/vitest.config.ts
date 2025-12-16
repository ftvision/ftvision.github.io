import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['**/__tests__/**/*.test.{ts,tsx}'],
    setupFiles: ['./__tests__/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['lib/**/*.ts', 'types/**/*.ts', 'app/**/*.tsx', 'components/**/*.tsx'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
      // Mock CSS imports from @blog/tokens
      '@blog/tokens/css': path.resolve(__dirname, './__tests__/mocks/tokens-css.ts'),
      // Resolve @ui alias for @blog/ui package
      '@ui': path.resolve(__dirname, '../../packages/ui/src'),
    },
  },
});
