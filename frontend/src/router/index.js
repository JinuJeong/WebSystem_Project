import Vue from 'vue'

import Router from 'vue-router'
import Login from '../components/login'
import Home from '../components/home'
import NotFound from '../components/404'
import SignUp from '../components/signup'
import Search from '../components/search'
import Notice from '../components/notice'
import Circles from '../components/circles'
import Board from '../components/board'
import TimeLine from '../components/timeline'

Vue.use(Router);

export default new Router({
    // '#' tag를 없애줌.

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
        },
        {
            path: '/timeline',
            component: TimeLine
        },
        {
            path: '/abc/abc',
            component: Board
        }
    ]
})
