import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    // Split heavy, rarely-co-loaded vendor code into its own cacheable
    // chunks instead of one big vendor blob. gsap + framer-motion in
    // particular are only needed by animation-heavy landing/dashboard
    // components — keeping them out of the main chunk means the
    // browser can parse/execute the app shell before those download.
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes("node_modules")) return;
          if (id.includes("react-dom") || id.includes("/react/") || id.includes("react-router")) {
            return "vendor-react";
          }
          if (id.includes("react-icons") || id.includes("lucide-react")) {
            return "vendor-icons";
          }
        },
      },
    },
    // Drop noisy dev-only output from the production bundle.
    reportCompressedSize: false,
  },
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "./src/tests/setup.js",
  },
});