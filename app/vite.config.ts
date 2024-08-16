import path from "node:path";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import Unfonts from "unplugin-fonts/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [
    TanStackRouterVite(),
    Unfonts({
      custom: {
        families: [
          {
            name: "Geist",
            src: "../node_modules/geist/dist/fonts/geist-*/*.woff2",
          },
        ],
      },
    }),
    react(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
