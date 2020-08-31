import Vue from 'vue'
import App from './App'
// 引入vuex 状态库
import store from "./store";
Vue.config.productionTip = false

// 状态数据
Vue.prototype.$store = store;
App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
