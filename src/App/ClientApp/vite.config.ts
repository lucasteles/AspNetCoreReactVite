import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'
import path from 'path'

const apiUrl = 'http://localhost:4200'

export default defineConfig({
  plugins: [svgr(), react()],
  build: {
    outDir: 'build',
    chunkSizeWarningLimit: 1000,
  },
  server: {
    port: 44000,
    https: false,
    strictPort: true,
    proxy: {
      '/api': {
        target: apiUrl,
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/api/, '/api'),
      },
      '/swagger': {
        target: apiUrl,
        changeOrigin: true,
        secure: false,
        rewrite: path => path.replace(/^\/swagger/, '/swagger'),
      }
    }
  },
  preview: {
    port: 45000,
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src'),
      '@': path.resolve(__dirname, './src/components')
    }
  },
})
