import { defineConfig as defineViteConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
// Node
import { resolve } from "path";
// Plugins
import dts from "vite-plugin-dts";
import react from "@vitejs/plugin-react-swc";
import peerDepsExternal from "rollup-plugin-peer-deps-external";
import { libInjectCss } from "vite-plugin-lib-inject-css";

const ReactCompilerConfig = {
  target: "19" // '17' | '18' | '19'
};

const viteConfig = defineViteConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler" // or "modern", "legacy"
      }
    }
  },
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler", ReactCompilerConfig]]
      }
    }),
    libInjectCss(),
    dts()
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "index.ts"),
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

const vitestConfig = defineVitestConfig({
  test: {
    globals: true,
    environment: "jsdom"
  }
});

export default mergeConfig(viteConfig, vitestConfig);
