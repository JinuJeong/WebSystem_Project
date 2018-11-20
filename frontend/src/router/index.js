import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/login'
import Home from '../components/home'
import NotFound from '../components/404'
import SignUp from '../components/signup'
<<<<<<< HEAD
import Search from '../components/search'
=======
import Notice from '../components/notice'
import Circles from '../components/circles'
import Board from '../components/board'
>>>>>>> c3854110605ad385dd6c6952cb78712e1c3d1578


Vue.use(Router);

export default new Router({
    // '#' tag를 없애줌.
    mode : "history",

<<<<<<< HEAD
  // router's list
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/404',
      component: NotFound
    },
    {
      path: '/signup',
      component: SignUp
    },
    {
      path: '/search',
      component: Search
    }
  ]
})
=======
    //router's list
    routes : [
        {
            path: '/',
            component: Home
        },
        {
            path: '/login',
            component: Login
        },
        {
            path: '/404',
            component: NotFound
        },
        {
            path: '/signup',
            component: SignUp
        },
        {
            path: '/notice',
            component: Notice
        },
        {
            path: '/circles',
            component: Circles
        },
        {
            path: '/board',
            component: Board
        }
    ]
})
>>>>>>> c3854110605ad385dd6c6952cb78712e1c3d1578
