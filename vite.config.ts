import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig, Plugin} from 'vite';

function githubPagesSpaPlugin(): Plugin {
  return {
    name: 'github-pages-spa-fallback',
    closeBundle() {
      const dist = path.resolve(process.cwd(), 'dist');
      const indexPath = path.join(dist, 'index.html');
      const notFoundPath = path.join(dist, '404.html');
      try {
        if (fs.existsSync(indexPath)) {
          fs.copyFileSync(indexPath, notFoundPath);
        }
      } catch (err) {
        console.warn('Could not copy index.html to 404.html:', err);
      }
    },
  };
}

export default defineConfig(() => {
  // On Vercel, root base '/' provides clean canonical paths;
  // on GitHub Pages or custom subpaths, VITE_BASE_PATH or relative './' ensures zero asset 404s
  const base = process.env.VITE_BASE_PATH
    ? (process.env.VITE_BASE_PATH.endsWith('/') ? process.env.VITE_BASE_PATH : `${process.env.VITE_BASE_PATH}/`)
    : (process.env.VERCEL ? '/' : './');

  return {
    base,
    plugins: [react(), tailwindcss(), githubPagesSpaPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (id.includes('@vis.gl') || id.includes('google')) {
                return 'maps-vendor';
              }
              if (id.includes('lucide-react')) {
                return 'icons-vendor';
              }
              if (id.includes('react') || id.includes('react-dom')) {
                return 'react-vendor';
              }
              return 'vendor';
            }
          },
        },
      },
      chunkSizeWarningLimit: 600,
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      hmr: process.env.DISABLE_HMR !== 'true',
      // Disable file watching when DISABLE_HMR is true to save CPU during agent edits.
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
