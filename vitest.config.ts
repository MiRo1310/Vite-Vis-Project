import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default defineConfig({
  ...viteConfig,
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      reporter: ["text", "json", "html"],
    },
    include: ["src/**/*.{test,spec}.{js,ts,vue}"],
    exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
  },
});
