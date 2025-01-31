/* eslint-env serviceworker */
/* global importScripts */
/// <reference lib="webworker" />

importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging.js");

const firebase = self.firebase;

fetch("/firebase-config.json")
  .then((response) => response.json())
  .then((config) => {
    firebase.initializeApp(config);

    const messaging = firebase.messaging();

    messaging.onBackgroundMessage((payload) => {
      console.log(
        "[firebase-messaging-sw.js] Received background message:",
        payload
      );

      const notificationTitle = payload.notification?.title || "New Notification";
      const notificationOptions = {
        body: payload.notification?.body || "You have a new message!",
        icon: payload.notification?.image || "/default-icon.png",
      };

      self.registration.showNotification(notificationTitle, notificationOptions);
    });
  })
  .catch((error) => console.error("Failed to load Firebase config:", error));
