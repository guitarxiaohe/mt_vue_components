import { createApp } from 'vue';
import App from './App.vue';

import 'element-plus/dist/index.css';
import ElementPlus from 'element-plus';
import './styles/global.css';
import { createI18n } from 'vue-i18n';
// 1. 创建 i18n 实例
const i18n = createI18n({
  locale: 'zh-CN', // 默认语言
  fallbackLocale: 'en', // 回退语言
  messages: {
    'zh-CN': {
      hello: '你好',
      // 其他翻译...
    },
    en: {
      hello: 'Hello',
      // 其他翻译...
    },
  },
  legacy: false, // 使用 Composition API 模式（推荐）
});

const app = createApp(App);
app.use(ElementPlus);
app.use(i18n);
app.mount('#app');
