import { defineConfig } from "vite";
import VueMacros from 'unplugin-vue-macros/vite'
import vue from "@vitejs/plugin-vue";
import Unocss from "unocss/vite";
import { themePreprocessorPlugin } from "@zougt/vite-plugin-theme-preprocessor";
import { presetAttributify, presetIcons, presetUno } from "unocss";
import { resolve } from "path";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Unocss({ presets: [presetUno(), presetAttributify(), presetIcons()] }),
    themePreprocessorPlugin({
      less: {
        arbitraryMode: false,
        multipleScopeVars: [
          {
            scopeName: "theme-default",
            // 变量文件内容不应该夹带样式代码，设定上只需存在变量
            path: resolve(__dirname, "src/styles/themes/default.less"),
          },
          {
            scopeName: "theme-dark",
            path: resolve(__dirname, "src/styles/themes/dark.less"),
          },
        ],
        extract: false,
        // themeLinkTagId: "theme-link-tag",
      },
    }),
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src/"),
    },
  },
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      },
    },
  },
});
