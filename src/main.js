import Vue from 'vue'
import App from './App.vue'
import 'normalize.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faTimes, faMinus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faTimes, faMinus);
Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app');
