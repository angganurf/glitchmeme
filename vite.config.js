import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "https://glitchmeme.wtf/",
  build: {
    sourcemap: false,  // Disable sourcemaps
  }
})
