import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// Replace with your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyA3YtnhGa86ALJMoptGs6WRwzPYA4NMr1g",
  authDomain: "cheenta-bloag-app.firebaseapp.com",
  projectId: "cheenta-bloag-app",
  storageBucket: "cheenta-bloag-app.firebasestorage.app",
  messagingSenderId: "985835857405",
  appId: "G-X2Z84CRX92"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Sign-In Function
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Google Sign-In Error:", error);
    return null;
  }
};

// Logout Function
const logout = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Logout Error:", error);
  }
};

export { auth, signInWithGoogle, logout };
