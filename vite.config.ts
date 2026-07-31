import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// Organization GitHub Pages repo (IRL-Crossing-CNRS.github.io) serves from
// the domain root, not a /repo-name/ subpath, so base stays '/'.
export default defineConfig({
  base: '/',
  plugins: [react(), tailwindcss()],
});
