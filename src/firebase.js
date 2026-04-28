import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// The user needs to populate this with their Firebase configuration.
const firebaseConfig = {
  apiKey: "AIzaSyC3GyI7au1RUqZMJLAFf0596H11P_nWRWo",
  authDomain: "sante-intelligente.firebaseapp.com",
  projectId: "sante-intelligente",
  storageBucket: "sante-intelligente.firebasestorage.app",
  messagingSenderId: "553046384614",
  appId: "1:553046384614:web:9934d4303c46c6f1b3c027",
  measurementId: "G-3BMG07SGHL"
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
