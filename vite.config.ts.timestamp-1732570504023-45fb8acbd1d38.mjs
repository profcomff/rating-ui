// vite.config.ts
import { defineConfig } from "file:///home/filipenkovda/rating-ui/node_modules/.pnpm/vite@4.5.5_@types+node@22.9.0/node_modules/vite/dist/node/index.js";
import postcssPresetEnv from "file:///home/filipenkovda/rating-ui/node_modules/.pnpm/postcss-preset-env@9.6.0_postcss@8.4.47/node_modules/postcss-preset-env/dist/index.mjs";
import stylelint from "file:///home/filipenkovda/rating-ui/node_modules/.pnpm/vite-plugin-stylelint@5.3.1_postcss@8.4.47_rollup@3.29.5_stylelint@15.11.0_typescript@5.6.3___z6uzuetynkfmdqosjfz4hucaeq/node_modules/vite-plugin-stylelint/dist/index.mjs";
import svgLoader from "file:///home/filipenkovda/rating-ui/node_modules/.pnpm/vite-svg-loader@5.1.0_vue@3.5.12_typescript@5.6.3_/node_modules/vite-svg-loader/index.js";
import vue from "file:///home/filipenkovda/rating-ui/node_modules/.pnpm/@vitejs+plugin-vue@4.6.2_vite@4.5.5_@types+node@22.9.0__vue@3.5.12_typescript@5.6.3_/node_modules/@vitejs/plugin-vue/dist/index.mjs";
import vuetify, { transformAssetUrls } from "file:///home/filipenkovda/rating-ui/node_modules/.pnpm/vite-plugin-vuetify@2.0.4_vite@4.5.5_@types+node@22.9.0__vue@3.5.12_typescript@5.6.3__vuetify@3.7.4/node_modules/vite-plugin-vuetify/dist/index.mjs";
import { fileURLToPath } from "url";
var __vite_injected_original_import_meta_url = "file:///home/filipenkovda/rating-ui/vite.config.ts";
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
  },
  resolve: {
    alias: [{ find: "@", replacement: fileURLToPath(new URL("./src", __vite_injected_original_import_meta_url)) }]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS9maWxpcGVua292ZGEvcmF0aW5nLXVpXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvaG9tZS9maWxpcGVua292ZGEvcmF0aW5nLXVpL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL2ZpbGlwZW5rb3ZkYS9yYXRpbmctdWkvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCBwb3N0Y3NzUHJlc2V0RW52IGZyb20gJ3Bvc3Rjc3MtcHJlc2V0LWVudic7XG5pbXBvcnQgc3R5bGVsaW50IGZyb20gJ3ZpdGUtcGx1Z2luLXN0eWxlbGludCc7XG5pbXBvcnQgc3ZnTG9hZGVyIGZyb20gJ3ZpdGUtc3ZnLWxvYWRlcic7XG5pbXBvcnQgdnVlIGZyb20gJ0B2aXRlanMvcGx1Z2luLXZ1ZSc7XG5pbXBvcnQgdnVldGlmeSwgeyB0cmFuc2Zvcm1Bc3NldFVybHMgfSBmcm9tICd2aXRlLXBsdWdpbi12dWV0aWZ5JztcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnO1xuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuXHRwbHVnaW5zOiBbXG5cdFx0dnVlKHtcblx0XHRcdHRlbXBsYXRlOiB7IHRyYW5zZm9ybUFzc2V0VXJscyB9LFxuXHRcdH0pLFxuXHRcdHZ1ZXRpZnkoeyBhdXRvSW1wb3J0OiB0cnVlIH0pLFxuXHRcdHN2Z0xvYWRlcih7XG5cdFx0XHRzdmdvQ29uZmlnOiB7XG5cdFx0XHRcdGZsb2F0UHJlY2lzaW9uOiAyLFxuXHRcdFx0XHRtdWx0aXBhc3M6IHRydWUsXG5cdFx0XHR9LFxuXHRcdH0pLFxuXHRcdHN0eWxlbGludCh7XG5cdFx0XHRmaWxlczogWydzcmMvKiovKi57dnVlLGNzc30nXSxcblx0XHR9KSxcblx0XSxcblx0Y3NzOiB7XG5cdFx0cG9zdGNzczoge1xuXHRcdFx0cGx1Z2luczogW1xuXHRcdFx0XHRwb3N0Y3NzUHJlc2V0RW52KHtcblx0XHRcdFx0XHRmZWF0dXJlczoge1xuXHRcdFx0XHRcdFx0J25lc3RpbmctcnVsZXMnOiB0cnVlLFxuXHRcdFx0XHRcdH0sXG5cdFx0XHRcdH0pLFxuXHRcdFx0XSxcblx0XHR9LFxuXHR9LFxuXHRyZXNvbHZlOiB7XG5cdFx0YWxpYXM6IFt7IGZpbmQ6ICdAJywgcmVwbGFjZW1lbnQ6IGZpbGVVUkxUb1BhdGgobmV3IFVSTCgnLi9zcmMnLCBpbXBvcnQubWV0YS51cmwpKSB9XSxcblx0fSxcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFzUSxTQUFTLG9CQUFvQjtBQUNuUyxPQUFPLHNCQUFzQjtBQUM3QixPQUFPLGVBQWU7QUFDdEIsT0FBTyxlQUFlO0FBQ3RCLE9BQU8sU0FBUztBQUNoQixPQUFPLFdBQVcsMEJBQTBCO0FBQzVDLFNBQVMscUJBQXFCO0FBTmtJLElBQU0sMkNBQTJDO0FBUWpOLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFNBQVM7QUFBQSxJQUNSLElBQUk7QUFBQSxNQUNILFVBQVUsRUFBRSxtQkFBbUI7QUFBQSxJQUNoQyxDQUFDO0FBQUEsSUFDRCxRQUFRLEVBQUUsWUFBWSxLQUFLLENBQUM7QUFBQSxJQUM1QixVQUFVO0FBQUEsTUFDVCxZQUFZO0FBQUEsUUFDWCxnQkFBZ0I7QUFBQSxRQUNoQixXQUFXO0FBQUEsTUFDWjtBQUFBLElBQ0QsQ0FBQztBQUFBLElBQ0QsVUFBVTtBQUFBLE1BQ1QsT0FBTyxDQUFDLG9CQUFvQjtBQUFBLElBQzdCLENBQUM7QUFBQSxFQUNGO0FBQUEsRUFDQSxLQUFLO0FBQUEsSUFDSixTQUFTO0FBQUEsTUFDUixTQUFTO0FBQUEsUUFDUixpQkFBaUI7QUFBQSxVQUNoQixVQUFVO0FBQUEsWUFDVCxpQkFBaUI7QUFBQSxVQUNsQjtBQUFBLFFBQ0QsQ0FBQztBQUFBLE1BQ0Y7QUFBQSxJQUNEO0FBQUEsRUFDRDtBQUFBLEVBQ0EsU0FBUztBQUFBLElBQ1IsT0FBTyxDQUFDLEVBQUUsTUFBTSxLQUFLLGFBQWEsY0FBYyxJQUFJLElBQUksU0FBUyx3Q0FBZSxDQUFDLEVBQUUsQ0FBQztBQUFBLEVBQ3JGO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
