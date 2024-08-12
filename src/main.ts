import { createApp } from 'vue';
import './styles/style.css';
import App from './App.vue';
import { router } from './router';
import { pinia } from './pinia';
import { vuetify } from './vuetify.ts';
import 'vuetify/styles';

createApp(App).use(router).use(pinia).use(vuetify).mount('#app');