import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'
export default defineConfig({
  plugins: [react(),tailwindcss(),
     VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: "SkillDex",
        short_name: "SkillDex",
        start_url: ".",
        display: "standalone",
        background_color: "#000000",
        theme_color: "#000000",
        icons: [
          {
            src: "/favicon.ico",
            type: "image/x-icon",
            sizes: "192x192"
          },
          {
            src: "`/favicon.ico",
            type: "image/x-icon",
            sizes: "512x512"
          }
        ]
      }
    })
  ],
})
