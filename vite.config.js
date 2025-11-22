import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  plugins: [
    react(),
    sitemap({
      hostname: 'https://calculatorcom-eight.vercel.app',
      dynamicRoutes: [
        '/',
        '/finance',
        '/health',
        '/converters',
        '/math',
        '/calculator/age',
        '/calculator/bmi',
        '/calculator/emi',
        '/calculator/sip',
        '/calculator/percentage',
        '/calculator/profit-loss',
        '/calculator/discount',
        '/calculator/temperature',
        '/calculator/length',
        '/calculator/weight',
        '/calculator/time',
        '/calculator/loan-interest',
        '/calculator/currency',
        '/calculator/gst',
        '/calculator/tip'
      ],
      changefreq: 'weekly',
      priority: 0.8,
      lastmod: new Date()
    })
  ],
  server: {
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true
      }
    }
  }
})
