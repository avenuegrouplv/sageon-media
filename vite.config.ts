import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import fs from 'fs';
import {defineConfig} from 'vite';

function syncRootImagesPlugin() {
  const sync = () => {
    try {
      const rootDir = process.cwd();
      const publicDir = path.join(rootDir, 'public');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }
      const files = fs.readdirSync(rootDir);
      for (const file of files) {
        if (/\.(webp|png|jpg|jpeg|svg)$/i.test(file)) {
          const srcPath = path.join(rootDir, file);
          const destPath = path.join(publicDir, file);
          if (fs.statSync(srcPath).isFile()) {
            fs.copyFileSync(srcPath, destPath);
          }
        }
      }
    } catch (e) {
      console.error('Error syncing root images:', e);
    }
  };

  return {
    name: 'sync-root-images',
    buildStart() {
      sync();
    },
    configureServer(server: any) {
      sync();
      server.middlewares.use((req: any, res: any, next: any) => {
        sync();
        next();
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [syncRootImagesPlugin(), react(), tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    esbuild: {
      drop: ['console', 'debugger'] as ('console' | 'debugger')[],
    },
    build: {
      sourcemap: false,
      minify: 'esbuild' as const,
      cssCodeSplit: true,
      target: 'es2020',
      modulePreload: {
        polyfill: false,
      },
      rollupOptions: {
        output: {
          manualChunks: {
            'vendor-react': ['react', 'react-dom', 'react-router-dom'],
            'vendor-motion': ['motion'],
            'vendor-icons': ['lucide-react'],
          },
        },
      },
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
