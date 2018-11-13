import Vue from 'vue'
import VueMaterial from 'vue-material'
//import Router from 'vue-router'
import 'vue-material/dist/vue-material.min.css'
import App from './App'
import Login from './components/login'
import NotFound from './components/404'

Vue.use(VueMaterial)
//Vue.use(Router)

/*
const routes = [];

const router = new VueRouter({
  routes
})

const app = new Vue({
  el: '#app',
  render: h => h(Login),
  //router
});
*/

const routes = {
  '/': App,
  '/login': Login,
  '/404': NotFound
}

new Vue({
  el: '#app',
  data: {
    currentRoute: window.location.pathname
  },
  computed: {
    ViewComponent () {
      return routes[this.currentRoute] || routes['/404']
    }
  },
  render (h) {
    return h(this.ViewComponent)
  }
})

window.addEventListener('popstate', () => {
  app.currentRoute = window.location.pathname
})