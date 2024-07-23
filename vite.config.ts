import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  define: {
    'process.env': {
      VITE_APP_TMDB_V3_API_KEY: process.env.VITE_APP_TMDB_V3_API_KEY,
      VITE_APP_API_ENDPOINT_URL: process.env.VITE_APP_API_ENDPOINT_URL,
    },
  },

})
