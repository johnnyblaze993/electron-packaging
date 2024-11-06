import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import cesium from 'vite-plugin-cesium'; // Import vite-plugin-cesium
import { resolve } from 'path';

export default defineConfig({
  base: './',  // Ensures relative paths in built files
  plugins: [
    react(),
    cesium() // Adds Cesium plugin to handle Cesium assets
  ],
  define: {
    CESIUM_BASE_URL: JSON.stringify('./cesium') // Sets base URL for Cesium assets
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
      },
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name && assetInfo.name.includes('Cesium')) {
            return 'cesium/[name][extname]'; // Places Cesium assets in the `cesium` folder
          }
          return 'assets/[name][extname]';
        }
      },
    },
    outDir: 'dist',
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
