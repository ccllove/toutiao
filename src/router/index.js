import Vue from 'vue'
import VueRouter from 'vue-router'

// 导入需要的组件
import Home from '@/views/Home/Home.vue'
import User from '@/views/User/User.vue'

// 把VueRouter安装为vue的插件
Vue.use(VueRouter)

// 路由规则的数组
const router = new VueRouter({
// const routes = [
  routes: [
  // 定义首页的路由规则
  // 源信息meta，记录top值
    { path: '/', component: Home, meta: { isRecord: true, top: 0 } },
    { path: '/user', component: User }
    // 定义我的路由规则
  ],
  scrollBehavior(to, from, savedPosition) {
  // return期望滚动到哪个位置
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: to.meta.top || 0 }
    }
  }
})

// 创建路由实例对象
// const router = new VueRouter({
//   routes
// })

export default router
