import { createRouter, createWebHistory } from 'vue-router'
import SideMenu from '../layouts/side-menu/Main.vue'
import TopMenu from '../layouts/top-menu/Main.vue'
import SimpleMenu from '../layouts/simple-menu/Main.vue'

import TopMenuRoutes from './TopMenu'
import SideMenuRoutes from './SideMenu'
import SimpleMenuRoutes from './SimpleMenu'

import ErrorPage from '../views/error-page/Main.vue'

const signin = () => import('@/views/member/signin')
const signup = () => import('@/views/member/signup')
const forgotpassword = () => import('@/views/member/forgotpassword')
const resetpassword = () => import('@/views/member/forgotpassword')

const routes = [
  {
    path: '/',
    component: SideMenu,
    children: SideMenuRoutes
  },
  {
    path: '/top-menu',
    component: TopMenu,
    children: TopMenuRoutes
  },
  {
    path: '/simple-menu',
    component: SimpleMenu,
    children: SimpleMenuRoutes
  },
  {
    path: '/signin',
    name: 'signin',
    component: signin
  },
  {
    path: '/signup',
    name: 'signup',
    component: signup
  },
  {
    path: '/forgotpassword',
    name: 'forgotpassword',
    component: forgotpassword
  },
  {
    path: '/resetpassword',
    name: 'resetpassword',
    component: resetpassword
  },
  {
    path: '/error-page',
    name: 'error-page',
    component: ErrorPage
  },
  {
    path: '/:pathMatch(.*)*',
    component: ErrorPage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    return savedPosition || { left: 0, top: 0 }
  }
})

export default router
