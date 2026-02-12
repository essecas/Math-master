import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/',  // <-- penting untuk root path di Vercel
  build: {
    outDir: 'dist',  // output folder
  },
})
