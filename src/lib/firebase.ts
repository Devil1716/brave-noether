// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQ0ZMNHbI1QWUi_eYzQqSHBzUqUYoOwjg",
  authDomain: "courses-7eca3.firebaseapp.com",
  projectId: "courses-7eca3",
  storageBucket: "courses-7eca3.firebasestorage.app",
  messagingSenderId: "53266946377",
  appId: "1:53266946377:web:5b22fdcfcf3b08d2b7a298",
  measurementId: "G-5VG3MPBB0T"
};

// Initialize Firebase only once
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Initialize Analytics (only supported in browser environments)
let analytics;
if (typeof window !== "undefined") {
  isSupported().then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  });
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
