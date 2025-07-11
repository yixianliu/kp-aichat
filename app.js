import './bootstrap';

import {
    createApp
} from 'vue';
import router from '@/router/index.js';

// 引入 Element Plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import App from './App.vue';

import {
    createPinia
} from 'pinia';

// 全局注册
createApp(App)
    .use(router)
    .use(createPinia())
    .use(ElementPlus)
    .mount('#app');