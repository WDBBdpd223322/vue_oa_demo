import Vue from 'vue'
import Router from 'vue-router'
import Auth from '@/assets/js/auth.js'
import Login from '@/components/login/login.vue'
import Home from '@/components/home/home.vue'
import UserList from '@/components/userList/userList.vue'
import RoleList from '@/components/roleList/roleList.vue'
import RightsList from '@/components/rightsList/rightsList.vue'
import GoodsList from '@/components/goodsList/goodsList.vue'
import GoodsAdd from '@/components/goodsAdd/goodsAdd.vue'
import CategoryParams from '@/components/categoryParams/categoryParams.vue'
import GoodsCategory from '@/components/goodsCategory/goodsCategory.vue'
import Reports from '@/components/reports/reports.vue'
import Orders from '@/components/orders/orders.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/',
      name: '',
      component: Home,
      children: [
        {
          path: '',
          name: '',
          component: {
            template: '<div>欢迎光临</div>'
          }
        },
        {
          path: '/users',
          name: 'users',
          component: UserList
        },
        {
          path: '/roles',
          name: 'roles',
          component: RoleList
        },
        {
          path: '/rights',
          name: 'rights',
          component: RightsList
        },
        {
          path: '/goods',
          name: 'goods',
          component: GoodsList
        },
        {
          path: '/goodsAdd/:id',
          name: 'goodsAdd',
          component: GoodsAdd
        },
        {
          path: '/params',
          name: 'params',
          component: CategoryParams
        },
        {
          path: '/categories',
          name: 'categories',
          component: GoodsCategory
        },
        {
          path: '/reports',
          name: 'reports',
          component: Reports
        },
        {
          path: '/orders',
          name: 'orders',
          component: Orders
        }
      ]
    }

  ]
})

router.beforeEach((to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    const token = Auth.getToken()
    if (token) {
      next()
    } else {
      next({
        path: '/login'
      })
    }
  }
})

export default router
