// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
// Replace 10.13.2 with latest version of the Firebase JS SDK.
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyAWVupuOnUO8XcpFQr6xpSvJJPvUzkaLaY",
    authDomain: "pushnotification-8496b.firebaseapp.com",
    projectId: "pushnotification-8496b",
    storageBucket: "pushnotification-8496b.firebasestorage.app",
    messagingSenderId: "1076542350391",
    appId: "1:1076542350391:web:6da3be21890a03a8fc8bb2",
    measurementId: "G-W4CLXGD5JK"
  });

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    console.log(
      '[firebase-messaging-sw.js] Received background message ',
      payload
    );
    // Customize notification here
    const notificationTitle = payload.notification.title;
    const notificationOptions = {
      body: payload.notification.body,
      icon: payload.notification.image,
    };
  
    self.registration.showNotification(notificationTitle, notificationOptions);
  });

