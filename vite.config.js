import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import ViteRequireContext from '@originjs/vite-plugin-require-context'

const path = require("path");

export default defineConfig({
  plugins: [
    vue(),
    ViteRequireContext()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    cors: false,
    port: 42069,
    proxy: {
      '/img': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/img': ''
        }
      },
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }

})
