import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig((configEnv) => ({
  plugins: [react()],
  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#big-list-of-options
      input: "src/index.ts",
      output: [
        {
          format: "cjs",
          entryFileNames: "index.js",
        },
        {
          format: "esm",
          entryFileNames: "index.mjs",
        },
      ],
    },
  },
}));
