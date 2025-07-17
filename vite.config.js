import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { hash } from './src/utils/functions.js'
import { readFileSync } from 'fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf-8'))

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    __APP_VERSION__: JSON.stringify(pkg.version),
  },
  plugins: [react()],
  base: "https://glitchmeme.wtf/",
  build: {
    sourcemap: false,  // Disable sourcemaps
    rollupOptions: {
      output: {
        entryFileNames: `[name]` + hash + `.js`,
        chunkFileNames: `[name]` + hash + `.js`,
        assetFileNames: `[name]` + hash + `.[ext]`
      }
    }
  }
})

// vite.config.js
