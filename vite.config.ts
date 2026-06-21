import path from "path";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [
    react(),
  ],

  server: {
    host: true,
    port: 5176,        // ✅ DEV PORT
    strictPort: true,
    allowedHosts: true,
  },

  preview: {
    host: true,
    port: 5173,        // ✅ PREVIEW PORT (important)
    strictPort: true,
    allowedHosts: true,
  },

  build: {
    chunkSizeWarningLimit: 5000,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});