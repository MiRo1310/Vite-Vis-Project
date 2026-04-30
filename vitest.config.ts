import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      globals: true,
      environment: "jsdom",
      coverage: {
        provider: "v8",
        reporter: ["text", "json", "html"],
        include: ["src/**/*.ts"],
        exclude: [
          "**/*.png",
          "src/components/ui/**/*.ts",
          "src/**/*.{variants,iobroker,form}.ts",
          "src/{enum,api,assets,constants,config,router}/**/*.ts",
        ],
      },
      include: ["./**/*.{test,spec}.{js,ts,vue}"],
      exclude: ["node_modules", "dist", ".idea", ".git", ".cache"],
    },
  }),
);
