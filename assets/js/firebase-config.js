// =========================================================
// KOMIK STRIP STUDIO — Konfigurasi Firebase
// =========================================================
// 1. Buka https://console.firebase.google.com
// 2. Buat project baru (atau pakai project yang sudah ada)
// 3. Tambahkan sebuah "Web App" di dalam project tsb
// 4. Salin objek firebaseConfig yang diberikan Firebase
//    lalu tempel di bawah, menggantikan nilai "ISI_DENGAN_..."
// 5. Di Firebase Console, aktifkan:
//    - Authentication > Sign-in method > Email/Password
//    - Firestore Database (mode production, lalu pasang
//      aturan dari file firestore.rules)
// =========================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCoL8wuF5Up1iik7AE0DQ0cUpv3x90cZ80",
  authDomain: "komik-craft-studio.firebaseapp.com",
  projectId: "komik-craft-studio",
  storageBucket: "komik-craft-studio.firebasestorage.app",
  messagingSenderId: "403188204371",
  appId: "1:403188204371:web:2f1cea519e0f5cc66817a6",
  measurementId: "G-K0KCK57ZY7"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
