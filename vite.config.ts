import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3001,
    open: true,
    proxy: {
      // 代理配置
      "/dev": "https://xxx.com/",
    },
  },
  resolve: {
    alias: {
      "@": path.join(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
        @use "@/styles/element/index.scss" as *;
        @import "@/styles/base.scss";
        @import "@/styles/_variables.scss";
        `,
      },
    },
  },
  plugins: [vue(), vueJsx()],
});
