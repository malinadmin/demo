// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './router/index'
import Viewer from 'v-viewer'   //图片查看器
import store from './store/' //状态管理
import '@/css/flexible.debug.css'
import {} from '../static/flexible.debug.js';
import {} from '../static/jquery-1.9.1.min';
import '@/css/style.css'
import Vant from 'vant';
import 'vant/lib/index.css';
import 'viewerjs/dist/viewer.css'
/*表单验证*/
import VeeValidate from 'vee-validate';
import zh_CN from 'vee-validate/dist/locale/zh_CN'
import {Validator} from 'vee-validate';

Validator.addLocale(zh_CN);
const config = {
  errorBagName: 'errors',
  fieldsBagName: 'fields',
  delay: 100,
  locale: 'zh_CN',
  strict: true,
  enableAutoClasses: true,
  events: 'blur',
  inject: true
};

Vue.use(VeeValidate, config);
Vue.use(Vant);
Vue.use(VueRouter)
Vue.use(Viewer);
Vue.use(Viewer, {
  defaultOptions: {
    zIndex: 9999999
  }
})
const router = new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {x: 0, y: to.meta.savedPosition || 0}
    }
  }
})
/*router.beforeEach((to, from, next) => {
  if (to.matched.some(m => m.meta.auth)) {  // 判断该路由是否需要登录权限
    if (localStorage.getItem('AppSecret') === null || localStorage.getItem('AppSecret') === undefined || localStorage.getItem('AppSecret') === "") {
      next({path: '/login', query: {home: 'home'}})
    } else {
      next()
    }
  } else {
    next()
  }
})*/

new Vue({
  router,
  store
}).$mount('#app')
