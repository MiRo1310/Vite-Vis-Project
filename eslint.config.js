import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "**/.idea/",
      "**/.vscode/",
      "**/build/",
      "**/dist/",
      "**/node_modules/",
      "**/src/api/gql/",
      "**/src/components/ui/",
      "**/*.d.ts",
      "tailwind.config.js",
      "vite.config.*",
      "codegen.ts",
      "eslint.config.mjs ",
      "CLAUDE.md",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: globals.browser,
    },
  },
  tseslint.configs.strict,
  pluginVue.configs["flat/essential"],
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx,vue}"],
    rules: {
      // Basis
      eqeqeq: "error",
      "no-console": "warn",
      curly: "error",
      "no-debugger": "error",
      "no-var": "error",
      "prefer-const": "error",
      semi: ["error", "always"],
      quotes: ["error", "double"],

      // Variablen-Shadowing verhindern
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": "error",

      // TypeScript
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      "@typescript-eslint/consistent-type-imports": ["error", { prefer: "type-imports", fixStyle: "inline-type-imports" }],
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/array-type": ["warn", { default: "array-simple" }],

      // Vue
      "vue/multi-word-component-names": "off",
      "vue/no-unused-components": "error",
      "vue/no-mutating-props": "error",
      "vue/no-unused-properties": [
        "error",
        {
          groups: ["props"],
          deepData: false,
          ignorePublicMembers: false,
        },
      ],
      // "vue/no-v-html": "warn",

      complexity: ["error", 10],
    },
    languageOptions: {
      parserOptions: { parser: tseslint.parser },
    },
  },
  {
    // Typ-aware Regeln — brauchen TypeScript-Projektinformationen
    files: ["**/*.{ts,tsx,vue}"],
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
        extraFileExtensions: [".vue"],
      },
    },
    rules: {
      // Unnötige Optional-Chains / Conditions
      "@typescript-eslint/no-unnecessary-condition": "error",
      "@typescript-eslint/no-unnecessary-type-assertion": "error",

      // Async-Fehler abfangen
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-misused-promises": ["error", { checksVoidReturn: { attributes: false } }],

      // Nullish-Coalescing bevorzugen (kein || für null-Checks)
      "@typescript-eslint/prefer-nullish-coalescing": ["error", { ignorePrimitives: { boolean: true } }],

      // Switch muss exhaustiv sein
      "@typescript-eslint/switch-exhaustiveness-check": "error",
    },
  },
]);
