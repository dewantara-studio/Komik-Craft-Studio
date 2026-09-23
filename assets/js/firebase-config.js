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
  apiKey: "ISI_DENGAN_API_KEY",
  authDomain: "ISI_DENGAN_AUTH_DOMAIN",
  projectId: "ISI_DENGAN_PROJECT_ID",
  storageBucket: "ISI_DENGAN_STORAGE_BUCKET",
  messagingSenderId: "ISI_DENGAN_SENDER_ID",
  appId: "ISI_DENGAN_APP_ID"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
