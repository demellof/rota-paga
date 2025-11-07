import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    return {
      plugins: [
        VitePWA({
          registerType: 'autoUpdate',
          workbox: {
            skipWaiting: true,
          },
          manifest: {
            name: 'Rota Pagã',
            short_name: 'RotaPagã',
            description: 'Seu guia holístico pessoal para a Rota Pagã.',
            theme_color: '#1a1a1a',
            icons: [
              {
                src: 'https://images.unsplash.com/vector-1744298297666-b907a458eb53?fm=jpg&q=60&w=192',
                sizes: '192x192',
                type: 'image/jpeg',
              },
              {
                src: 'https://images.unsplash.com/vector-1744298297666-b907a458eb53?fm=jpg&q=60&w=512',
                sizes: '512x512',
                type: 'image/jpeg',
              },
            ],
          },
        })
      ],
      define: {
        'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
        'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
      },
      resolve: {
        alias: {
          '@': new URL('.', import.meta.url).pathname,
        }
      }
    };
});
