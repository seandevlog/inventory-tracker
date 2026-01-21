import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": path.resolve(__dirname, "src/components"),
      "@my-org/shared/validators": path.resolve(__dirname, "../shared/src/validators/index.js"),
      "@features": path.resolve(__dirname, "src/features")
    }
  },
  optimizeDeps: {
    include: ["@my-org/shared"]
  }
})
