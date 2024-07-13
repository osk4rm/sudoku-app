import { createApp } from 'vue'
import App from './App.vue'
import axios from './axios';
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapVueNext from 'bootstrap-vue-next';

const app = createApp(App);

app.config.globalProperties.$axios = axios;

app.use(BootstrapVueNext);

app.mount('#app');
