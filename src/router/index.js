import { createRouter, createWebHashHistory } from 'vue-router'

const Layout = () => import('../layout/index.vue')
const Home = () => import('../views/home/index.vue')
const WorkHours = () => import('../views/work-hours/index.vue')

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
        path: '/work-hours',
        component: WorkHours
      }
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes, // short for `routes: routes`
})

export default router