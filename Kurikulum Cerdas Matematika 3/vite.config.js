import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Konfigurasi utama Vite
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // opsional, bisa diubah sesuai kebutuhan
  },
  build: {
    outDir: 'dist', // hasil build akan keluar di folder dist
  },
})
