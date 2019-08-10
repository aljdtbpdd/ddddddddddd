import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import '@/styles/index.less'
import VeeValidate, {
  Validator
} from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN'
// 默认是input事件触发，可以改成 blur 事件触发
Vue.use(VeeValidate, {
  events: 'input'
})
Validator.localize('zh-cn', zhCN)

Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
