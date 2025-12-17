const sharedConfig = require('@blog/config/tailwind.config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [sharedConfig],
  content: [
    './stories/**/*.{ts,tsx}',
    '../../packages/ui/src/**/*.{ts,tsx}',
    // Blog app components (Note, Marginnote, EssayLayout, etc.)
    '../../apps/blog/components/**/*.{ts,tsx}',
  ],
};
