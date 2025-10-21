import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [react()],
      build: {
        rollupOptions: {
          // FIX: Replaced `path.resolve(__dirname, ...)` with relative paths to resolve "Cannot find name '__dirname'" error.
          // Vite correctly resolves these paths relative to the project root.
          input: {
            main: 'index.html',
            about: 'about.html',
            careers: 'careers.html',
            contact: 'contact.html',
            'architectural-design': 'architectural-design.html',
            'engineering-consultancy': 'engineering-consultancy.html',
            'project-management': 'project-management.html',
            'sustainability-energy': 'sustainability-energy.html',
          },
        },
      },
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': path.resolve('.'),
        }
      }
    };
});
