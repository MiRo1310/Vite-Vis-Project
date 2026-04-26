import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      coverage: {
        reporter: ["text", "json", "html"],
      },
      include: ["./**/*.{test,spec}.{js,ts,vue}"],
      exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
    },
  }),
);
