import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const devUrl = "http://localhost:8000"

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss() 
  ],
    resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: `${devUrl}/api`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),  
        secure: false,
      },
      "/auth": {
        target: `${devUrl}/auth`,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/auth/, ''),
        secure: false,
      }
    },
  },
})
