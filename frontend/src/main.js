import 'vue-material/dist/vue-material.min.css'
import VueMaterial from 'vue-material';

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

<<<<<<< HEAD
Vue.prototype.$http = axios
Vue.config.productionTip = false
=======
Vue.use(VueMaterial);
>>>>>>> 0a6a6208730c201e499d571f5a6e7f4679e2e2b3

new Vue({
    el: '#app',
    router,
    render: h => h(App)
})
