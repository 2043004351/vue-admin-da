/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@zougt/vite-plugin-theme-preprocessor/dist/browser-utils.js';
declare module 'path-browserify'
