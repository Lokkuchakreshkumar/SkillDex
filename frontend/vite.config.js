import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { VitePWA } from 'vite-plugin-pwa'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss(),
      VitePWA({
      registerType: 'autoUpdate',
manifest: {
  name: "SkillDex to define you",
  short_name: "SkillDex",
  start_url: "/",
  scope: "/",
  display: "standalone",
  background_color: "#000000",
  theme_color: "#000000",
  icons: [
    {
      src: "/Adobe Express - file (1).png",
      type: "image/png",
      sizes: "192x192"
    },
    {
      src: "/Adobe Express - file (1).png",
      type: "image/png",
      sizes: "512x512"
    },
    {
      src: "/Adobe Express - file (1).png",
      type: "image/png",
      sizes: "512x512",
      purpose: "maskable"
    }
  ]
}

    })
  ],
})