import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/fonts/iconfont.css'
// 导入全局样式表
import './assets/css/global.css'
import axios from 'axios'
import Vuex from 'vuex'
import store from './vuex/store'
import VCharts from 'v-charts'
Vue.use(Vuex)
Vue.use(VCharts)
axios.defaults.baseURL = 'https://afeiog.toutiao15.com/'
axios.interceptors.request.use(config => {
  // 为请求头对象，添加token验证的Authorization字段
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})
// 添加响应拦截器
axios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    console.log(error)
    if (error.response.status === 401) {
      window.sessionStorage.removeItem('token')
      this.$router.push('/login')
    }
    return Promise.reject(error)
  })
Vue.prototype.$http = axios

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
