import Vue from 'vue'
import App from './App.vue'
import router from './router'
import firebase from 'firebase'

import {
  library
} from '@fortawesome/fontawesome-svg-core'
import {
  faSignOutAlt,
  faPlus,
  faEdit,
  faTrashAlt,
  faMoneyBillAlt
} from '@fortawesome/free-solid-svg-icons'
import {
  FontAwesomeIcon
} from '@fortawesome/vue-fontawesome'
import {
  BootstrapVue,
  IconsPlugin
} from 'bootstrap-vue'



// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

library.add(faSignOutAlt, faPlus, faEdit, faTrashAlt, faMoneyBillAlt)

Vue.component('font-awesome-icon', FontAwesomeIcon)

let app = ''





firebase.initializeApp(firebaseConfig);


Vue.config.productionTip = false

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      render: h => h(App)
    }).$mount('#app')
  }
});

// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')