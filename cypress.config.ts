import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
    specPattern: "src/**/*.cy.ts",
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    specPattern: "cypress/**/*.cy.ts",
  },
});
