import { defineConfig } from "vite";
// Node
import { resolve } from "path";
// Plugins
import dts from "vite-plugin-dts";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import react from "@vitejs/plugin-react-swc";

const ReactCompilerConfig = {
  target: "19" // '17' | '18' | '19'
};

export default defineConfig({
  plugins: [
    dts({
      rollupTypes: true
    }),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]]
      }
    })
  ],
  test: {
    globals: true,
    environment: "jsdom"
  },
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"]
    },
    rollupOptions: {
      plugins: [peerDepsExternal()],
      output: {
        assetFileNames: "assets/[name][extname]",
        entryFileNames: "[name].js"
      }
    }
  }
});
