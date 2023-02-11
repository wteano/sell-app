import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import '@/assets/css/reset.css'

// 手动按需引入
import {
  Icon, Button, Toast, Field, NoticeBar, Overlay, Tag, Tab, Tabs, Rate, Divider,
  Tabbar, TabbarItem, Sidebar, SidebarItem, Card, Sku, Stepper, ActionSheet, Checkbox, CheckboxGroup
} from 'vant'
import 'vant/lib/index.css'

Vue.use(Icon).use(Button).use(Toast).use(Field).use(NoticeBar).use(Overlay).use(Tabbar).use(TabbarItem).use(Rate).use(Checkbox).use(CheckboxGroup)
  .use(Tag).use(Tab).use(Tabs).use(Sidebar).use(SidebarItem).use(Card).use(Sku).use(Stepper).use(ActionSheet).use(Divider)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
