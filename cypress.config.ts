import { defineConfig } from "cypress";

export default defineConfig({
  allowCypressEnv: false,
  component: {
    devServer: {
      framework: "vue",
      bundler: "vite",
    },
    specPattern: "cypress/components/**/*.cy.ts",
  },

  e2e: {
    baseUrl: "http://localhost:5173",
    // setupNodeEvents(on, config) {
    //   // implement node event listeners here
    // },
    specPattern: "cypress/e2e/**/*.cy.ts",
  },
});
