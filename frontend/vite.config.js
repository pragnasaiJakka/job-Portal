import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',  // Resolves `crypto` to `crypto-browserify`
      '@': path.resolve(__dirname, './src'), // Allows shorthand import for src
    },
  },
  optimizeDeps: {
    include: ['crypto-browserify'],  // Ensures polyfill is included in dependencies
  },
});
