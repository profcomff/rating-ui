import { createApp } from 'vue';
import App from './App.vue';
import { router } from './router';
import { pinia } from './pinia';
import { vuetify } from './vuetify';
import 'vuetify/styles';

createApp(App).use(router).use(pinia).use(vuetify).mount('#app');
