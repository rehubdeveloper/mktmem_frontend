import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // For development server
    historyApiFallback: true,
  },
  preview: {
    // For preview server (vite preview)
    historyApiFallback: true,
  },
  build: {
    // Ensure proper build output for SPA
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});