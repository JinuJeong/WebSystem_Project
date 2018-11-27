import Vue from 'vue'

import Router from 'vue-router'
import Login from '../components/login'
import Home from '../components/home'
import NotFound from '../components/404'
import SignUp from '../components/signup'
import Notice from '../components/notice'
import Circles from '../components/circles'
import Board from '../components/board'
<<<<<<< HEAD
import CircleSignup from '../components/circlesignup'

=======
import TimeLine from '../components/timeline'
>>>>>>> 44447c1db9ba21807504d57946a6c1601b56dc86

Vue.use(Router);

export default new Router({
    // '#' tag를 없애줌.
  //  mode : "history",
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
            path: '*',
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
        },
        {
<<<<<<< HEAD
            path: '/circlesignup',
            component: CircleSignup
        }
=======
            path: '/circle/:name',
            component: Circle,
        },
        {
            path: '/timeline',
            component: TimeLine
        },
>>>>>>> 44447c1db9ba21807504d57946a6c1601b56dc86
    ]
})
