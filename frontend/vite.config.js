import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill';
import crypto from 'crypto-browserify'; // Add this line

globalThis.crypto = crypto; // Ensure crypto is polyfilled globally

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      crypto: 'crypto-browserify',
      '@': path.resolve(__dirname, './src'),
    },
  },
  optimizeDeps: {
    include: ['crypto-browserify'],
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true,
          buffer: true,
        }),
        NodeModulesPolyfillPlugin(),
      ],
    },
  },
});
