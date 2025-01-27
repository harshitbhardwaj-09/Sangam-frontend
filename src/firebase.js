// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWVupuOnUO8XcpFQr6xpSvJJPvUzkaLaY",
  authDomain: "pushnotification-8496b.firebaseapp.com",
  projectId: "pushnotification-8496b",
  storageBucket: "pushnotification-8496b.firebasestorage.app",
  messagingSenderId: "1076542350391",
  appId: "1:1076542350391:web:6da3be21890a03a8fc8bb2",
  measurementId: "G-W4CLXGD5JK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const messaging = getMessaging(app);

export const generateToken = async () => {
   const permission = await Notification.requestPermission();
   console.log(permission);
   if (permission === "granted"){
    const token = await getToken(messaging, {
    vapidKey: 
    "BBxI8Dl1gctwWMHzlphfXmu58SVZvMDlyPAXZFhCgAw6fgneqmsdneG-1LDCMakriKdMz99NwVe0Np8e_EFUg8g",
    });
    console.log(token);
   }
   
}
