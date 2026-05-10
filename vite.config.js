import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/da-ga/',
  preview: {
    allowedHosts: ['da-ga-test.loca.lt', 'btl-dw-9119.loca.lt', 'localhost'],
    host: '0.0.0.0',
    port: 8080,
  },
  server: {
    allowedHosts: ['da-ga-test.loca.lt', 'btl-dw-9119.loca.lt', 'localhost', 'host.docker.internal'],
    host: '0.0.0.0',
    port: 5173,
  },
})