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
import showSchedules from '../components/showSchedules'
import manageBoard from '../components/manageBoard'
import showBoard from '../components/showBoard'
import showGroups from '../components/showGroups'
import manageGroup from '../components/manageGroup'
import showGroup from '../components/showGroup'
import showActive from '../components/showActive'
import manageActive from '../components/manageActive'
import showActives from '../components/showActives'

import Vuetify from "vuetify";

import mypage from '../views/menu/mypage'
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
            path: '/boards/:boardName',
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
            path: '/circle/:circleName/board/:postType/manage_notice/create',
            component: manageNotice
        },
        {
            path: '/circle/:circleName/board/:postType/manage_notice/:postNum',
            component: manageNotice
        },
        {
            path: '/circle/:circleName/board/:postType/show_notice/:postNum',
            component: showNotice
        },
        {
            path: '/circle/:circleName/board/:postType/show_notices',
            component: showNotices
        },
        {
            path: '/circle/:circleName/schedule/show_schedules',
            component: showSchedules
        },
        {
            path: '/mypage',
            component: mypage
        },
        {
            path: '/boards/:boardName/manage_notice/:postNum',
            component: manageBoard
        },
        {
            path: '/boards/:boardName/show_notice/:postNum',
            component: showBoard
        },
        {
            path: '/circle/:circleName/group/show_groups',
            component: showGroups
        },
        {
            path: '/circle/:circleName/manage_group/create',
            component: manageGroup
        },
        {
            path: '/circle/:circleName/group/show_group/:groupId',
            component: showGroup
        },
        {
            path: '/circle/:circleName/manage_group/update/:groupId',
            component: manageGroup
        },
        {
            path: '/circle/:circleName/active/show_actives',
            component: showActives
        },
        {
            path: '/circle/:circleName/manage_active/create',
            component: manageActive
        },
        {
            path: '/circle/:circleName/active/show_active/:activeId',
            component: showActive
        },
        {
            path: '/circle/:circleName/manage_active/update/:activeId',
            component: manageActive
        },
    ]
})
