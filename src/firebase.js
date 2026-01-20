// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDoc6PHfm8ldNH52jNFlngbdBYkLLeYkxI",
  authDomain: "void-chat-2393b.firebaseapp.com",
  projectId: "void-chat-2393b",
  storageBucket: "void-chat-2393b.firebasestorage.app",
  messagingSenderId: "1056489556096",
  appId: "1:1056489556096:web:03702cf9aee9e7aeeb7e65",
  measurementId: "G-7Q4M34VZW3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize services
export const auth = getAuth(app);
export const database = getDatabase(app);

// DEBUG: Test if Firebase is connected
console.log("Firebase initialized:", app.name);
console.log("Auth:", auth);
console.log("Database:", database);

export default app;