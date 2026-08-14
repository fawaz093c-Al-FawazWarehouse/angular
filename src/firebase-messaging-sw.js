// Service Worker for FCM background messages
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.22.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: '<API_KEY>',
  authDomain: '<AUTH_DOMAIN>',
  projectId: '<PROJECT_ID>',
  messagingSenderId: '<MESSAGING_SENDER_ID>',
  appId: '<APP_ID>'
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage(function(payload) {
  const title = payload.notification?.title || 'تنبيه';
  const options = {
    body: payload.notification?.body || '',
    data: payload.data || {}
  };
  self.registration.showNotification(title, options);
});
