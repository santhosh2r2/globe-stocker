import { defineConfig, splitVendorChunkPlugin } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  base: "globe-stocker",
  plugins: [svelte(), splitVendorChunkPlugin()],
})
