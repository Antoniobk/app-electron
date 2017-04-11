import Vue from 'vue'
import Electron from 'vue-electron'
import Router from 'vue-router'
import firebase from 'firebase'
// import firebase from 'firebase'
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
// import './scss/app.scss'
import App from './App'
import routes from './routes'

Vue.use(Electron)
Vue.use(MuseUI)
Vue.use(Router)

Vue.config.debug = true
// firebase
const _config = {
  apiKey: 'AIzaSyCOPH6o3W4LhcVNvc16-CAtJf9SmWKmE6Q',
  authDomain: 'anda-technologies.firebaseapp.com',
  databaseURL: 'https://anda-technologies.firebaseio.com',
  storageBucket: 'anda-technologies.appspot.com',
  messagingSenderId: '576969091517'
}
const FbApp = firebase.initializeApp(_config)

Vue.prototype.$FireBase = FbApp.database()
// Vue.prototype.$FireStorage = FbApp.storage().ref() (no esta incluido)
Vue.prototype.$FireAuth = FbApp.auth()
Vue.prototype.$FireTimestamp = firebase.database.ServerValue.TIMESTAMP
Vue.prototype.$AuthCredential = firebase.auth
// Vue.prototype.$FireMessaging = firebase.messaging() (no esta incluido)
const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes
})

/* eslint-disable no-new */
new Vue({
  router,
  ...App
}).$mount('#app')
