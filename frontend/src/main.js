import 'vue-material/dist/vue-material.min.css'

import VueMaterial from 'vue-material';

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import Vuetify from 'vuetify'

//Use session
import VueSession from 'vue-session'
Vue.use(VueSession)

Vue.use(Vuetify, {
    iconfont: 'mdi' // 'md' || 'mdi' || 'fa' || 'fa4'
});


Vue.config.productionTip = false

Vue.prototype.$http = axios

Vue.use(VueMaterial);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
