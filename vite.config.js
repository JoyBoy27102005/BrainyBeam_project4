import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Configure proxy so frontend dev server can call backend /api/* routes
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
