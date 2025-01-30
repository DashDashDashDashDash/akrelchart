import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
//  base: "/v2/"
  build: {
    rollupOptions: {
      input: {
        main: "indexv2.html"
      }
    }
  }
})
