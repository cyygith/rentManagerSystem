// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router/index.js'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import {dictApi} from './service/dict-api'
//import '@/utils/svgConfig'

Vue.config.productionTip = false

Vue.use(ElementUI)
// eslint-disable-next-line no-new
//挂载全局参数
Vue.prototype.dictApi = dictApi
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
