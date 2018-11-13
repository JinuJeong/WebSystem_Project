import Vue from 'vue'
import VueMaterial from 'vue-material'
//import Router from 'vue-router'
import 'vue-material/dist/vue-material.min.css'
import App from './components/App'
//import Login from './components/login'

Vue.use(VueMaterial)
//Vue.use(Router)

/*
const routes = [];

const router = new VueRouter({
  routes
})
*/
const app = new Vue({
  el: '#app',
  render: h => h(App),
  //router
});