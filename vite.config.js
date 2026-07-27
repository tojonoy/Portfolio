import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// BASE is '/' for Vercel, Netlify and a user site (tojonoy.github.io).
// For a GitHub Pages *project* site set BASE=/repo-name/ when building.
export default defineConfig({
  plugins: [react()],
  base: process.env.BASE || '/',
})
