import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// The user needs to populate this with their Firebase configuration.
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase only if config is provided
let app;
let auth;
let db;

try {
  if (Object.keys(firebaseConfig).length > 0 && firebaseConfig.apiKey) {
    app = initializeApp(firebaseConfig);
  } else {
    // If empty config, initialize with placeholder so it doesn't crash, but it won't work until configured.
    console.warn("Firebase config is missing. Please add it to src/firebase.js");
    app = initializeApp({ apiKey: "placeholder", projectId: "placeholder", appId: "placeholder" });
  }

  auth = getAuth(app);
  db = getFirestore(app);
} catch (error) {
  console.error("Firebase initialization error:", error);
}

export { auth, db };
