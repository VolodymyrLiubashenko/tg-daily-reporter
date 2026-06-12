import path from "node:path";
import { fileURLToPath } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import svgLoader from "vite-svg-loader";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
   plugins: [vue(), svgLoader()],
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "src"),
         "@pages": path.resolve(__dirname, "src/pages"),
         "@router": path.resolve(__dirname, "src/router"),
         "@components": path.resolve(__dirname, "src/components"),
         "@styles": path.resolve(__dirname, "src/styles"),
      },
   },
   server: {
      port: 5173,
      proxy: {
         "/api": {
            target: "http://127.0.0.1:3000",
            changeOrigin: true,
         },
      },
   },
});
