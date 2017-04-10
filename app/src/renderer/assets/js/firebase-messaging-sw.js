// [START initialize_firebase_in_sw]
// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here, other Firebase libraries
// are not available in the service worker.
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js', {scope: './'}).then(function(registration) {
//     console.log('success')
//   }).catch(function(error) {
//     console.log(error)
//   });
// 
//   navigator.serviceWorker.register('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js', {scope: './'}).then(function(registration) {
//     console.log('success')
//   }).catch(function(error) {
//     console.log(error)
//   });
// } else {
//   console.log('blablabla')
// }
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
var _config = {
  apiKey: 'AIzaSyCOPH6o3W4LhcVNvc16-CAtJf9SmWKmE6Q',
  authDomain: 'anda-technologies.firebaseapp.com',
  databaseURL: 'https://anda-technologies.firebaseio.com',
  storageBucket: 'anda-technologies.appspot.com',
  messagingSenderId: '576969091517'
}

firebase.initializeApp(_config);

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
var messaging = firebase.messaging();
// [END initialize_firebase_in_sw]

// If you would like to customize notifications that are received in the
// background (Web app is closed or not in browser focus) then you should
// implement this optional method.
// [START background_handler]
// messaging.setBackgroundMessageHandler(function(payload) {
//   console.log('[firebase-messaging-sw.js] Received background message ', payload);
//   // Customize notification here
//   const notificationTitle = 'Background Message Title';
//   const notificationOptions = {
//     body: 'Background Message body.',
//     icon: '/firebase-logo.png'
//   };
// 
//   return self.registration.showNotification(notificationTitle,
//       notificationOptions);
// });
// [END background_handler]