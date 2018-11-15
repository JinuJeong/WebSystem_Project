import 'vue-material/dist/vue-material.min.css'
import VueMaterial from 'vue-material';

import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.use(VueMaterial);

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
