import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  base: '/Meow/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@components': fileURLToPath(new URL('./src/shared/components', import.meta.url)),
      '@helpers': fileURLToPath(new URL('./src/shared/helpers', import.meta.url)),
      '@services': fileURLToPath(new URL('./src/shared/services', import.meta.url)),
      '@stores': fileURLToPath(new URL('./src/shared/stores', import.meta.url))
    },
  },
  build: {
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name][extname]', // Mantém o nome original do arquivo
      },
    },
  },
})
