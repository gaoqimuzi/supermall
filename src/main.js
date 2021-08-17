import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index.js'
import toast from './components/common/toast/index.js'
Vue.config.productionTip = false
Vue.use(toast);
new Vue({
  render: h => h(App),
  router,
  store,
}).$mount('#app')
