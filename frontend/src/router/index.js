import Vue from 'vue'
import Router from 'vue-router'

import Login from '../views/menu/login'
import Home from '../views/home/home'
import NotFound from '../views/404'
import SignUp from '../views/menu/signup'
import Notice from '../views/menu/notice'
import Circles from '../views/circle/circles'
import Circle from '../views/circle/circle'
import CircleSignup from '../views/circle/circlesignup'
import Board from '../views/menu/board'
import Boards from '../views/menu/boards'
import TimeLine from '../views/menu/timeline'
import manageNotice from '../components/manageNotice'
import showNotice from '../components/showNotice'
import showNotices from '../components/showNotices'

import Vuetify from "vuetify";

Vue.use(Router);
Vue.use(Vuetify, {
    iconfont: 'mdi'
});

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
            path: '/boards',
            component: Boards
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
            path: '*',
            component: NotFound
        },
        {
            path: '/circle/:circleName/board/:kind/manage_notice/create',
            component: manageNotice
        },
        {
            path: '/circle/:circleName/board/:kind/manage_notice/:title/:date',
            component: manageNotice
        },
        {
            path: '/circle/:circleName/board/:kind/show_notice/:title/:date',
            component: showNotice
        },
        {
            path: '/circle/:circleName/board/:kind/show_notices',
            component: showNotices
        }
    ]
})
