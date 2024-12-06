// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDt7DrllajwCpMDfhXQpbC4YNa31tUDb0k",
  authDomain: "portfolio-weslsilva.firebaseapp.com",
  projectId: "portfolio-weslsilva",
  storageBucket: "portfolio-weslsilva.appspot.com",
  messagingSenderId: "193765429402",
  appId: "1:193765429402:web:573c2501932be2eab0cf23",
  measurementId: "G-D859BYEPFL"
};

const app = initializeApp(firebaseConfig);

// Inicializar Analytics apenas no cliente
let analytics;
if (typeof window !== 'undefined' && isSupported()) {
    analytics = getAnalytics(app);
}

export { app, analytics };