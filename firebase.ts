
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-storage.js";

// Lưu ý: Các thông tin này cần khớp với dự án Firebase của bạn trên console.firebase.google.com
const firebaseConfig = {
  apiKey: "AIzaSyAO98boIWEewKF8HKj7jJZbmkT0uu6pXYE",
  authDomain: "so-y-te.firebaseapp.com",
  projectId: "so-y-te",
  storageBucket: "so-y-te.firebasestorage.app",
  messagingSenderId: "203017190488",
  appId: "1:203017190488:web:33ebb73d618a41e799de2d",
  measurementId: "G-84TCF013S9"
};

// Khởi tạo Firebase (tránh khởi tạo lại nhiều lần gây lỗi)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
