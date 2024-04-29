import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyB72oicuFZfqTi7WW4Q7AuAUbL51bfgweY",
  authDomain: "astrodiscover-80675.firebaseapp.com",
  projectId: "astrodiscover-80675",
  storageBucket: "astrodiscover-80675.appspot.com",
  messagingSenderId: "320198277372",
  appId: "1:320198277372:web:eaeb04cc71037eacd8ff79",
  measurementId: "G-0KZ1HK48EN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth(app)
export { app,auth };