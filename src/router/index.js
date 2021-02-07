import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('../layout/index.vue')
const Home = () => import('../views/home/index.vue')
const Document = () => import('../views/document/index.vue')

const routes = [
  {
    path: '/',
    redirect: '/home',
    component: Layout,
    children: [
      {
        path: '/home',
        component: Home
      },
      {
        path: '/document',
        component: Document
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

export default router