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
  apiKey: "AIzaSyAwABtavcBrSTYRL9mlmHM01z_fbz2wkiA",
  authDomain: "officecraft-studio.firebaseapp.com",
  projectId: "officecraft-studio",
  storageBucket: "officecraft-studio.firebasestorage.app",
  messagingSenderId: "625737188043",
  appId: "1:625737188043:web:acea90962a0964a5eb514e",
  measurementId: "G-5TGEYWHVC3"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
