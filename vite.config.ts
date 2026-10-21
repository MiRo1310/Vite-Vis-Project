import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
import path from "node:path";
import { ElementTypes, NodeTypes, type NodeTransform } from "@vue/compiler-core";

// Dev only: marks the root element(s) of every component with data-component="<FileName>" for the browser's Elements panel
// Only plain HTML roots — on a component root the attribute would fall through and warn if that component renders a fragment/teleport
const addComponentName: NodeTransform = (node, context) => {
  if (
    node.type !== NodeTypes.ELEMENT ||
    node.tagType !== ElementTypes.ELEMENT ||
    context.parent?.type !== NodeTypes.ROOT ||
    !context.filename.endsWith(".vue")
  ) {
    return;
  }
  node.props.push({
    type: NodeTypes.ATTRIBUTE,
    name: "data-component",
    value: { type: NodeTypes.TEXT, content: path.basename(context.filename, ".vue"), loc: node.loc },
    nameLoc: node.loc,
    loc: node.loc,
  });
};

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    tailwindcss(),
    vue({
      template: {
        compilerOptions: {
          // serve wird bei yarn run dev gesetzt, hier wäre build bei yarn run build
          nodeTransforms: command === "serve" && !process.env.VITEST ? [addComponentName] : [],
        },
      },
    }),
    svgLoader(),
    !process.env.VITEST &&
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
  publicDir: "src/public",
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
}));
