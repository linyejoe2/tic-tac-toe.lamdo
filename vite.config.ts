// import { defineConfig } from 'vite'
import { defineConfig } from 'vitest/config'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    chunkSizeWarningLimit: 1000
  },
  // vitest 全局變量
  test: {
    globals: true,
    environment: "jsdom",
    threads: false
  },
})
