importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/3.5.2/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
var _config = {
  apiKey: "AIzaSyBMJKIi1lVCTh3VMJu_63ZUFhnTs0R_2qo",
  authDomain: "anda-technologies-production.firebaseapp.com",
  databaseURL: "https://anda-technologies-production.firebaseio.com",
  storageBucket: "anda-technologies-production.appspot.com",
  messagingSenderId: "459234387485"
}

firebase.initializeApp(_config);

var messaging = firebase.messaging();
// var _lang = window.localStorage.getItem('_lang');
var _type = '', _key = '';
messaging.setBackgroundMessageHandler(function(payload) {
  var title = '',
      options = {};

  console.log('on Message: ', payload.data, options, title);
  _type = payload.data.type;
  _key = payload.data.conversation_uid;
  // if (payload.data.type === 'new_invitation') {
  //   title = payload.data.fullname;
  //   options = {
  //     body: 'Nueva invitación',
  //     icon: '/static/img/logoanda.png'
  //   };
  // } else 
  if (payload.data.type === 'new_message') {
    title = payload.data.title;
    options = {
      body: payload.data.body,
      icon: '/static/img/logoanda.png'
    };
    return self.registration.showNotification(title, options);
  }

});

self.addEventListener('notificationclick', function(event) {

  event.notification.close();

  // if (_type === 'new_invitation') {
  //   clients.openWindow('https://web.anda.pe/#!/user/invitations');
  // } else if (_type === 'new_message') {
  //   clients.openWindow('https://web.anda.pe/#!/user/chats/' + _key);
  // }
  // console.log('se dio click');
  // Do something as the result of the notification click
});