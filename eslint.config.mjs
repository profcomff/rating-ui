import pluginVue from 'eslint-plugin-vue';
import { defineConfigWithVueTs, vueTsConfigs, configureVueProject } from '@vue/eslint-config-typescript';

configureVueProject({
	scriptLangs: ['ts'],
	rootDir: import.meta.dirname,
});

export default defineConfigWithVueTs(pluginVue.configs['flat/essential'], vueTsConfigs.recommended);