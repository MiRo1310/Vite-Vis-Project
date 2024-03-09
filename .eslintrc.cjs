module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true, // Node.js Umgebung
  },
  extends: ["eslint:recommended", "plugin:vue/vue3-recommended", "plugin:@typescript-eslint/recommended"],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: "@typescript-eslint/parser",
    ecmaVersion: 2021,
    sourceType: "module",
    project: "./tsconfig.json",
    extraFileExtensions: [".vue", ".d.ts"],
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    "@typescript-eslint/dot-notation": "error",
    "vue/multi-word-component-names": "off",
    "@typescript-eslint/no-explicit-any": "off",
    // "no-undef": "off",
  },
  overrides: [
    {
      files: ["src/components/ui/**/*.vue"], // Pfade zu den Dateien, für die die Konfiguration angewendet werden soll
      rules: {
        "@typescript-eslint/no-unused-vars": "off", // Deaktiviert die Regel
      },
    },
  ],
};
