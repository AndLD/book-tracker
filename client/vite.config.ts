import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

const env = loadEnv(process.env.NODE_ENV, process.cwd())

export default defineConfig({
    plugins: [react()],
    define:
        process.env.NODE_ENV === 'development'
            ? {
                  global: {}
              }
            : {},
    server: {
        proxy: {
            '/api': {
                target: env.VITE_API_URL,
                changeOrigin: true
            },
            '/images': {
                target: env.VITE_API_URL,
                changeOrigin: true
            }
        }
    },
    preview: {
        port: 3000,
        strictPort: true
    }
})
