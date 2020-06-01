import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Publish from '../components/publish.vue'
import Mine from '../components/Mine.vue'
import Edit from '../components/Edit.vue'
import Myform from '../components/Myform.vue'
import Stat from '../components/Stat.vue'
import Navigation from '../components/Navigation.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/myform/:userName/:id', component: Myform },
  {
    path: '/home',
    component: Home,
    redirect: '/mine',
    children: [
      { path: '/welcome', component: Welcome },
      { path: '/mine', component: Mine },
      {
        path: '/navigation/:id',
        component: Navigation,
        redirect: '/edit/:id',
        children: [
          { path: '/edit/:id', component: Edit },
          { path: '/publish/:id', component: Publish },
          { path: '/stat/:id', component: Stat }
        ]
      }
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
  if (to.path.substr(0, 7) === '/myform') return next()
  if (to.path === '/login') return next()
  // 获取token
  const tokenStr = window.sessionStorage.getItem('token')
  if (!tokenStr) return next('/login')
  next()
})

export default router
