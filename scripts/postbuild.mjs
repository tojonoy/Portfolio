// Copies index.html -> 404.html so client-side routes work on GitHub Pages.
import { copyFileSync, existsSync } from 'node:fs'
const src = 'dist/index.html'
const dest = 'dist/404.html'
if (existsSync(src)) { copyFileSync(src, dest); console.log('postbuild: wrote dist/404.html') }
