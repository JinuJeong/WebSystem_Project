import Vue from 'vue'
import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import App from './App.vue'

Vue.use(VueMaterial)

//추후 router 추가 예정
new Vue({
  el: '#app',
  render: h => h(App)
})
