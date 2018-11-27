import Vue from 'vue'

import Router from 'vue-router'
import Login from '../components/login'
import Home from '../components/home'
import NotFound from '../components/404'
import SignUp from '../components/signup'
import Notice from '../components/notice'
import Circles from '../components/circles'
import Board from '../components/board'
import CircleSignup from '../components/circlesignup'
import TimeLine from '../components/timeline'
import Circle from '../components/circle'
import manageNotice from '../components/manageNotice'
import showNotice from '../components/showNotice'

Vue.use(Router);

export default new Router({
    // '#' tag를 없애줌.
    //mode : "history",
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
            path: '/circlesignup',
            component: CircleSignup
        },
        {
            path: '/circle/:circleName',
            component: Circle,
        },
        {
            path: '/timeline',
            component: TimeLine
        },
        {
            path: '/circle/:circleName/manage_notice/create',
            component: manageNotice
        },
        {
            path: '/circle/:circleName/manage_notice/:title/:date',
            component: manageNotice
        },
        {
            path: '/circle/:circleName/show_notice/:title/:date',
            component: showNotice
        }
    ]
})
