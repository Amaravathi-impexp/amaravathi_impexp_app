import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/ (v2.1.3 - File reorganization complete)
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [react()],
    
    // Path resolution
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },

    // Optimize dependencies
    optimizeDeps: {
      include: ['react', 'react-dom', '@mui/material', '@reduxjs/toolkit', 'react-redux'],
      force: true, // Force dependency pre-bundling
    },

    // Build configuration
    build: {
      outDir: 'dist',
      sourcemap: mode === 'development', // Only in development
      minify: 'esbuild',
      target: 'es2015',
      
      // Optimize chunk splitting (v2.1.3)
      rollupOptions: {
        output: {
          manualChunks: {
            // Vendor chunks for better caching
            'react-vendor': ['react', 'react-dom', 'react-router-dom'],
            'mui-vendor': ['@mui/material', '@mui/icons-material', '@mui/x-data-grid'],
            'redux-vendor': ['@reduxjs/toolkit', 'react-redux'],
          },
        },
      },

      // Chunk size warnings
      chunkSizeWarningLimit: 1000,
    },

    // Server configuration (development)
    server: {
      port: 5173,
      strictPort: false,
      host: true, // Listen on all addresses
      open: true, // Open browser on server start
    },

    // Preview configuration (production preview)
    preview: {
      port: 4173,
      strictPort: false,
      host: true,
      open: true,
    },

    // Define global constants
    define: {
      // Ensure environment variables are available
      'import.meta.env.VITE_API_TRADE_IDENTITY_URL': JSON.stringify(
        env.VITE_API_TRADE_IDENTITY_URL
      ),
      'import.meta.env.VITE_API_TRADE_OPERATION_URL': JSON.stringify(
        env.VITE_API_TRADE_OPERATION_URL
      ),
    },
  };
});