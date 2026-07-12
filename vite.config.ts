import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    svgLoader(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: false,

      pwaAssets: {
        disabled: false,
        config: true,
      },

      manifest: {
        name: "Smarthome",
        short_name: "Smarthome",
        description: "Visualization for smarthome",
        theme_color: "#ffffff",
      },

      workbox: {
        globPatterns: ["**/*.{js,css,html,svg,png,ico}"],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
      },

      devOptions: {
        enabled: false,
        navigateFallback: "index.html",
        suppressWarnings: true,
        type: "module",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  base: "/",
  build: {
    rolldownOptions: {
      output: {
        manualChunks: (moduleId) => {
          if (moduleId.includes("leaflet")) {
            return "leaflet";
          }
          if (moduleId.includes("apollo-client")) {
            return "apollo-client";
          }
          return null;
        },
      },
    },
  },
});
