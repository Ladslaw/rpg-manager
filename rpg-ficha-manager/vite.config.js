import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // ⚠️ IMPORTANTE: Substitua 'nome-do-seu-repositorio' pelo nome real do seu repositório GitHub
  // Exemplo: se seu repo é 'meu-rpg-manager', use: base: '/meu-rpg-manager/'
  base: 
'/rpg-manager/',  
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  
  // Otimizações para produção
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['@radix-ui/react-dialog', '@radix-ui/react-select', '@radix-ui/react-tabs']
        }
      }
    }
  },
  
  // Configurações do servidor de desenvolvimento
  server: {
    port: 5173,
    host: true,
    open: true
  },
  
  // Preview (para testar build localmente)
  preview: {
    port: 4173,
    host: true
  }
})

