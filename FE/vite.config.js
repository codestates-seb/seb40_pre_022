import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  resolve: {
    alias: [
      { find: "@src", replacement: resolve(__dirname, "src") },
      {
        find: "@components",
        replacement: resolve(__dirname, "src/components"),
      },
      { find: "@style", replacement: resolve(__dirname, "src/style") },
    ],
  },
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1600,
  },
});
