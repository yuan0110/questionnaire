import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Create from '../components/Create.vue'
import Mine from '../components/Mine.vue'
import Edit from '../components/Edit.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },

  {
    path: '/home',
    component: Home,
    redirect: 'create',

    children: [
      { path: '/welcome', component: Welcome },
      { path: '/create', component: Create },
      { path: '/mine', component: Mine },
      { path: '/edit', component: Edit }
    ]
  }

]

const router = new VueRouter({
  routes
})

// 挂载路由导航守卫
router.beforeEach((to, from, next) => {
  // to 将要访问的路径
  // from 代表从哪个路径跳转来
  // next 函数，表示放行
  // next()  放行  next('/login)  强制跳转

  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
