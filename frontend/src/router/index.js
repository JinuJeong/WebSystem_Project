import Vue from 'vue'
import Router from 'vue-router'
import Users from '@/components/AllUsersPage'
import User from '@/components/UsersPage'
import Index from '@/components/IndexPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'index',
      component: Index
    },
    {
      path: '/user',
      naem: 'user',
      component: Users
    },
    {
      path: '/usr/:id',
      name: 'detail',
      component: User
    }
  ]
})
