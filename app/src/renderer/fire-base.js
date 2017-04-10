import Vue from 'vue'
import firebase from 'firebase'
const _config = {
  apiKey: 'AIzaSyCOPH6o3W4LhcVNvc16-CAtJf9SmWKmE6Q',
  authDomain: 'anda-technologies.firebaseapp.com',
  databaseURL: 'https://anda-technologies.firebaseio.com',
  storageBucket: 'anda-technologies.appspot.com',
  messagingSenderId: '576969091517'
}
let FbApp = firebase.initializeApp(_config)
Vue.prototype.$FireBase = FbApp.database()
Vue.prototype.$FireStorage = FbApp.storage()
Vue.prototype.$FireAuth = FbApp.auth()
Vue.prototype.$FireTimestamp = firebase.database.ServerValue.TIMESTAMP
Vue.prototype.$AuthCredential = firebase.auth
Vue.prototype.$FireMessaging = firebase.messaging()

