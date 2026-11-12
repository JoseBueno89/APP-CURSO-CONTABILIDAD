import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import pkg from './package.json' with { type: 'json' }

export default defineConfig({
  // Rutas relativas: la web funciona en cualquier subcarpeta (GitHub Pages, servidor propio…)
  base: './',
  plugins: [react(), tailwindcss()],
  // Versión visible en la app (campo "appVersion" de package.json)
  define: { __APP_VERSION__: JSON.stringify(pkg.appVersion) },
  build: { chunkSizeWarningLimit: 800 },
})
