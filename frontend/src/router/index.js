import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Users from '@/components/AllUsersPage'
import User from '@/components/UsersPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/user',
      naem: 'user',
      component: Users,
    },
    {
      path: '/usr/:id',
      name: 'detail',
      component: User
    }
  ]
})
