import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

const isVercel = Boolean(process.env.VERCEL);
const isGitHubActions = Boolean(process.env.GITHUB_ACTIONS);

// https://vite.dev/config/
export default defineConfig({
  base: process.env.VITE_BASE_PATH || (isVercel ? '/' : (isGitHubActions ? '/Bwise/' : '/')),
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          'vendor-motion': ['gsap', 'framer-motion'],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
})
