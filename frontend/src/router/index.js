import Vue from 'vue'
<<<<<<< HEAD
import Circle from '../components/circle.vue'
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
=======
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
import Vuetify from "vuetify";
>>>>>>> ee26abf2244ded58a36f2754eb6c6768366297d2

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
<<<<<<< HEAD
=======
            path: '/boards',
            component: Boards
        },
        {
>>>>>>> ee26abf2244ded58a36f2754eb6c6768366297d2
            path: '/circlesignup',
            component: CircleSignup
        },
        {
<<<<<<< HEAD
            path: '/circle/:name',
=======
            path: '/circle/:circleName',
>>>>>>> ee26abf2244ded58a36f2754eb6c6768366297d2
            component: Circle,
        },
        {
            path: '/timeline',
            component: TimeLine
<<<<<<< HEAD
=======
        },
        {
            path: '*',
            component: NotFound
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
>>>>>>> ee26abf2244ded58a36f2754eb6c6768366297d2
        }
    ]
})
