import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SelectTablePage from '../components/select-table-page/SelectTablePage.vue'
import AllMenuPage from '../components/all-menu-page/AllMenuPage.vue'
import CheckBillPage from '../components/check-bill-page/CheckBillPage.vue'



Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/selectTable',
    name: 'selectTable',
    component: SelectTablePage
  },
  {
    path: '/allMenuPage',
    name: 'allMenuPage',
    component: AllMenuPage
  },
  {
    path: '/checkBillPage',
    name: 'checkBillPage',
    component: CheckBillPage
  },
]

const router = new VueRouter({
  routes
})

export default router
