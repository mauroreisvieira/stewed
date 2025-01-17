import { defineConfig as defineViteConfig, mergeConfig } from "vite";
import { defineConfig as defineVitestConfig } from "vitest/config";
// Node
import { resolve } from "path";
// Plugins
import dts from "vite-plugin-dts";

const viteConfig = defineViteConfig({
  plugins: [
    dts({
      rollupTypes: true
    })
  ],
  build: {
    copyPublicDir: false,
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["es"]
    },
    rollupOptions: {
      output: {
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
