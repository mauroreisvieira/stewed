import { defineConfig } from "vite";
// Node
import { resolve } from "path";
// Plugins
import dts from "vite-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
    dts(),
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "index.ts"),
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
