import { defineConfig } from "vite";
// Node
import { resolve } from "path";
// Plugins
import dts from "vite-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import react from "@vitejs/plugin-react";
import { libInjectCss } from "vite-plugin-lib-inject-css";

export default defineConfig({
  plugins: [
    react(),
    libInjectCss(),
    dts({
      copyDtsFiles: true
    }),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"],
    },
    rollupOptions: {
      plugins: [peerDepsExternal()],
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js",
      },
    },
  },
});
