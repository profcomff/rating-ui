import { defineConfig } from 'vite';
import postcssPresetEnv from 'postcss-preset-env';
import stylelint from 'vite-plugin-stylelint';
import svgLoader from 'vite-svg-loader';
import vue from '@vitejs/plugin-vue';
import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify';
import { fileURLToPath } from 'url';
import ViteFonts from 'unplugin-fonts/vite';

export default defineConfig({
	plugins: [
		vue({
			template: { transformAssetUrls },
		}),
		vuetify({ autoImport: true }),
		svgLoader({
			svgoConfig: {
				floatPrecision: 2,
				multipass: true,
			},
		}),
		stylelint({
			files: ['src/**/*.{vue,css}'],
		}),
		ViteFonts({
			fontsource: {
				families: [
					{
						name: 'Roboto',
						weights: [100, 300, 400, 500, 700, 900],
						styles: ['normal', 'italic'],
					},
				],
			},
		}),
	],
	css: {
		postcss: {
			plugins: [
				postcssPresetEnv({
					features: {
						'nesting-rules': true,
					},
				}),
			],
		},
	},
	resolve: {
		alias: [{ find: '@', replacement: fileURLToPath(new URL('./src', import.meta.url)) }],
	},
});
