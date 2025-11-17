
import { fileURLToPath, URL } from 'url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { componentTagger } from "lovable-tagger";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      server: {
        port: 8080,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        mode === 'development' && componentTagger(),
      ].filter(Boolean),
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
// FIX: `__dirname` is not available in ES modules. Use `import.meta.url` to define the alias for the project root.
          '@': fileURLToPath(new URL('.', import.meta.url)),
        }
      }
    };
});