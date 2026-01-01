import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), vue(), svgLoader()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },

  base: "/",
});
