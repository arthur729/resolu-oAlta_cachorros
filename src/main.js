import { createApp } from 'vue';
import App from './App.vue';
import VueLazyload from 'vue-lazyload';

const app = createApp(App);

// Configura o VueLazyload
app.use(VueLazyload);

// Monta a aplicação
app.mount('#app');
