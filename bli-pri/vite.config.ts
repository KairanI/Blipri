import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/gpt': {
        target: 'http://localhost:5001/api',
        changeOrigin: true,
      },
    },
  },
  base: '/Blipri/'
});