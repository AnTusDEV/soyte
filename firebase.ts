
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAO98boIWEewKF8HKj7jJZbmkT0uu6pXYE",
  authDomain: "so-y-te.firebaseapp.com",
  projectId: "so-y-te",
  storageBucket: "so-y-te.firebasestorage.app",
  messagingSenderId: "203017190488",
  appId: "1:203017190488:web:33ebb73d618a41e799de2d",
  measurementId: "G-84TCF013S9"
};

// Khởi tạo Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
