import Vue from 'vue'

import Router from 'vue-router'
import Login from '../views/menu/login'
import Home from '../views/home/home'
import NotFound from '../views/404'
import SignUp from '../views/menu/signup'
import Notice from '../views/menu/notice'
import Circles from '../views/circle/circles'
import Circle from '../views/circle/circle'
import Board from '../views/menu/board'
import TimeLine from '../views/menu/timeline'
import Test from "../components/test"

Vue.use(Router);

export default new Router({
    // '#' tag를 없애줌.
   // mode : "history",

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
            path: '/circle/:name',
            component: Circle,
        },
        {
            path: '/timeline',
            component: TimeLine
        },
        {
            path: '/test',
            component: Test
        },
        {
            path: '*',
            component: NotFound
        },
    ]
})
