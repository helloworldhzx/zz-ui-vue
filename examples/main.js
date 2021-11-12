import Vue from 'vue'
import App from './App.vue'
// import router from './router'

// 导入组件库
import zzui from './../packages/index'
import './../packages/theme-default/src/index.scss'
import "./normalize.scss"

// 注册组件库
Vue.use(zzui);

Vue.config.productionTip = false;

new Vue({
    // router,
    render: h => h(App)
}).$mount('#app');
