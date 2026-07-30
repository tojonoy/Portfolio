import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'node:path'

// BASE is '/' for Vercel, Netlify and a user site (tojonoy.github.io).
// For a GitHub Pages *project* site set BASE=/repo-name/ when building.
export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: process.env.BASE || '/',
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') },
  },
})
