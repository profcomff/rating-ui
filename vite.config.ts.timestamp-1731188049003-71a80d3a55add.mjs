// vite.config.ts
import { defineConfig } from "file:///home/batuevio/rating-ui/node_modules/.pnpm/vite@4.5.5/node_modules/vite/dist/node/index.js";
import postcssPresetEnv from "file:///home/batuevio/rating-ui/node_modules/.pnpm/postcss-preset-env@9.6.0_postcss@8.4.47/node_modules/postcss-preset-env/dist/index.mjs";
import stylelint from "file:///home/batuevio/rating-ui/node_modules/.pnpm/vite-plugin-stylelint@5.3.1_postcss@8.4.47_rollup@3.29.5_stylelint@15.11.0_typescript@5.6.3__vite@4.5.5/node_modules/vite-plugin-stylelint/dist/index.mjs";
import svgLoader from "file:///home/batuevio/rating-ui/node_modules/.pnpm/vite-svg-loader@5.1.0_vue@3.5.12_typescript@5.6.3_/node_modules/vite-svg-loader/index.js";
import vue from "file:///home/batuevio/rating-ui/node_modules/.pnpm/@vitejs+plugin-vue@4.6.2_vite@4.5.5_vue@3.5.12_typescript@5.6.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vuetify, { transformAssetUrls } from "file:///home/batuevio/rating-ui/node_modules/.pnpm/vite-plugin-vuetify@2.0.4_vite@4.5.5_vue@3.5.12_typescript@5.6.3__vuetify@3.7.4/node_modules/vite-plugin-vuetify/dist/index.mjs";
var vite_config_default = defineConfig({
  plugins: [
    vue({
      template: { transformAssetUrls }
    }),
    vuetify({ autoImport: true }),
    svgLoader({
      svgoConfig: {
        floatPrecision: 2,
        multipass: true
      }
    }),
    stylelint({
      files: ["src/**/*.{vue,css}"]
    })
  ],
  css: {
    postcss: {
      plugins: [
        postcssPresetEnv({
          features: {
            "nesting-rules": true
          }
        })
      ]
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9iYXR1ZXZpby9yYXRpbmctdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL2JhdHVldmlvL3JhdGluZy11aS92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vaG9tZS9iYXR1ZXZpby9yYXRpbmctdWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBwb3N0Y3NzUHJlc2V0RW52IGZyb20gJ3Bvc3Rjc3MtcHJlc2V0LWVudic7XG5pbXBvcnQgc3R5bGVsaW50IGZyb20gJ3ZpdGUtcGx1Z2luLXN0eWxlbGludCc7XG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gJ3ZpdGUtc3ZnLWxvYWRlcic7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgdnVldGlmeSwgeyB0cmFuc2Zvcm1Bc3NldFVybHMgfSBmcm9tICd2aXRlLXBsdWdpbi12dWV0aWZ5JztcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcblx0cGx1Z2luczogW1xuXHRcdHZ1ZSh7XG5cdFx0XHR0ZW1wbGF0ZTogeyB0cmFuc2Zvcm1Bc3NldFVybHMgfSxcblx0XHR9KSxcblx0XHR2dWV0aWZ5KHsgYXV0b0ltcG9ydDogdHJ1ZSB9KSxcblx0XHRzdmdMb2FkZXIoe1xuXHRcdFx0c3Znb0NvbmZpZzoge1xuXHRcdFx0XHRmbG9hdFByZWNpc2lvbjogMixcblx0XHRcdFx0bXVsdGlwYXNzOiB0cnVlLFxuXHRcdFx0fSxcblx0XHR9KSxcblx0XHRzdHlsZWxpbnQoe1xuXHRcdFx0ZmlsZXM6IFsnc3JjLyoqLyoue3Z1ZSxjc3N9J10sXG5cdFx0fSksXG5cdF0sXG5cdGNzczoge1xuXHRcdHBvc3Rjc3M6IHtcblx0XHRcdHBsdWdpbnM6IFtcblx0XHRcdFx0cG9zdGNzc1ByZXNldEVudih7XG5cdFx0XHRcdFx0ZmVhdHVyZXM6IHtcblx0XHRcdFx0XHRcdCduZXN0aW5nLXJ1bGVzJzogdHJ1ZSxcblx0XHRcdFx0XHR9LFxuXHRcdFx0XHR9KSxcblx0XHRcdF0sXG5cdFx0fSxcblx0fSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEwUCxTQUFTLG9CQUFvQjtBQUN2UixPQUFPLHNCQUFzQjtBQUM3QixPQUFPLGVBQWU7QUFDdEIsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sU0FBUztBQUNoQixPQUFPLFdBQVcsMEJBQTBCO0FBRTVDLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFNBQVM7QUFBQSxJQUNSLElBQUk7QUFBQSxNQUNILFVBQVUsRUFBRSxtQkFBbUI7QUFBQSxJQUNoQyxDQUFDO0FBQUEsSUFDRCxRQUFRLEVBQUUsWUFBWSxLQUFLLENBQUM7QUFBQSxJQUM1QixVQUFVO0FBQUEsTUFDVCxZQUFZO0FBQUEsUUFDWCxnQkFBZ0I7QUFBQSxRQUNoQixXQUFXO0FBQUEsTUFDWjtBQUFBLElBQ0QsQ0FBQztBQUFBLElBQ0QsVUFBVTtBQUFBLE1BQ1QsT0FBTyxDQUFDLG9CQUFvQjtBQUFBLElBQzdCLENBQUM7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSixTQUFTO0FBQUEsTUFDUixTQUFTO0FBQUEsUUFDUixpQkFBaUI7QUFBQSxVQUNoQixVQUFVO0FBQUEsWUFDVCxpQkFBaUI7QUFBQSxVQUNsQjtBQUFBLFFBQ0QsQ0FBQztBQUFBLE1BQ0Y7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUNELENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
