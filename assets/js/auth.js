// =========================================================
// KOMIK STRIP STUDIO — Autentikasi pakai USERNAME (TAHAP 1)
// =========================================================
// CATATAN TEKNIS: Firebase Authentication (paket Email/Password)
// secara teknis tetap butuh format email di baliknya. Supaya
// peserta didik cukup mengingat USERNAME (bukan email), setiap
// username otomatis diubah jadi alamat email "palsu" seperti
// "budi123@komikstripstudio.app" sebelum dikirim ke Firebase.
// Alamat ini TIDAK dipakai untuk mengirim email sungguhan —
// hanya dipakai Firebase di belakang layar untuk login.
// Keunikan username otomatis terjamin karena Firebase menolak
// dua akun dengan "email" (hasil konversi) yang sama persis.
// =========================================================
import { auth, db } from "./firebase-config.js";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const DOMAIN_LOGIN = "@komikstripstudio.app";
const POLA_USERNAME = /^[a-zA-Z0-9_]{4,20}$/;

function usernameKeEmail(username) {
  return `${username.trim().toLowerCase()}${DOMAIN_LOGIN}`;
}

// ---------- Util ----------
function showAlert(el, message, type = "error") {
  if (!el) return;
  el.textContent = message;
  el.className = `alert show ${type === "success" ? "success" : ""}`;
}
function hideAlert(el) {
  if (!el) return;
  el.className = "alert";
}
function setLoading(button, isLoading, labelDefault, labelLoading) {
  if (!button) return;
  button.disabled = isLoading;
  button.textContent = isLoading ? labelLoading : labelDefault;
}
function pesanErrorFirebase(kode) {
  const peta = {
    "auth/invalid-email": "Username mengandung karakter yang tidak diperbolehkan.",
    "auth/user-not-found": "Username belum terdaftar. Silakan daftar dulu.",
    "auth/wrong-password": "Kata sandi salah. Coba lagi.",
    "auth/invalid-credential": "Username atau kata sandi salah.",
    "auth/email-already-in-use": "Username ini sudah dipakai. Coba username lain.",
    "auth/weak-password": "Kata sandi minimal 6 karakter.",
    "auth/too-many-requests": "Terlalu banyak percobaan. Coba lagi beberapa saat lagi.",
    "auth/network-request-failed": "Koneksi bermasalah. Periksa jaringan internet."
  };
  return peta[kode] || "Terjadi kesalahan. Silakan coba lagi.";
}

// ---------- Halaman Login (index.html) ----------
const loginForm = document.getElementById("form-login");
if (loginForm) {
  const alertEl = document.getElementById("login-alert");
  const submitBtn = loginForm.querySelector("button[type='submit']");

  // Kalau sudah login, langsung lempar ke dashboard
  onAuthStateChanged(auth, (user) => {
    if (user) window.location.href = "dashboard.html";
  });

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideAlert(alertEl);
    const username = document.getElementById("login-username").value.trim();
    const password = document.getElementById("login-password").value;

    if (!username) {
      showAlert(alertEl, "Username wajib diisi.");
      return;
    }

    setLoading(submitBtn, true, "Masuk", "Memproses…");
    try {
      await signInWithEmailAndPassword(auth, usernameKeEmail(username), password);
      window.location.href = "dashboard.html";
    } catch (err) {
      showAlert(alertEl, pesanErrorFirebase(err.code));
      setLoading(submitBtn, false, "Masuk", "Memproses…");
    }
  });
}

// ---------- Halaman Register (register.html) ----------
const registerForm = document.getElementById("form-register");
if (registerForm) {
  const alertEl = document.getElementById("register-alert");
  const submitBtn = registerForm.querySelector("button[type='submit']");

  // Auto-redirect kalau orang buka halaman Daftar padahal sudah login.
  // PENTING: begitu form submit mulai diproses, listener ini kita
  // matikan (unsubscribe) — soalnya createUserWithEmailAndPassword
  // langsung men-trigger login otomatis, dan kalau listener ini masih
  // aktif, dia akan buru-buru redirect ke dashboard SEBELUM proses
  // setDoc() di bawah sempat selesai menyimpan profil ke Firestore.
  const unsubscribeAutoRedirect = onAuthStateChanged(auth, (user) => {
    if (user) window.location.href = "dashboard.html";
  });

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideAlert(alertEl);
    unsubscribeAutoRedirect();

    const nama = document.getElementById("register-nama").value.trim();
    const username = document.getElementById("register-username").value.trim();
    const password = document.getElementById("register-password").value;
    const konfirmasi = document.getElementById("register-konfirmasi").value;

    if (!POLA_USERNAME.test(username)) {
      showAlert(alertEl, "Username 4-20 karakter, hanya huruf, angka, dan garis bawah (_), tanpa spasi.");
      return;
    }
    if (password !== konfirmasi) {
      showAlert(alertEl, "Konfirmasi kata sandi tidak sama.");
      return;
    }
    if (password.length < 6) {
      showAlert(alertEl, "Kata sandi minimal 6 karakter.");
      return;
    }

    setLoading(submitBtn, true, "Daftar", "Membuat akun…");
    try {
      const cred = await createUserWithEmailAndPassword(auth, usernameKeEmail(username), password);
      await updateProfile(cred.user, { displayName: nama });

      // Profil disimpan di Firestore, BUKAN kata sandi.
      // Kata sandi sepenuhnya dikelola oleh Firebase Authentication.
      await setDoc(doc(db, "users", cred.user.uid), {
        nama,
        username: username.toLowerCase(),
        role: "peserta_didik",
        xp: 0,
        badges: [],
        // progress.csp & progress.komik: daftar id level yang sudah
        // diselesaikan (mengacu ke assets/js/data/csp-levels.js dan
        // komik-levels.js)
        progress: {
          csp: [],
          komik: []
        },
        latihanSelesai: [],
        dibuatPada: serverTimestamp()
      });

      window.location.href = "dashboard.html";
    } catch (err) {
      console.error("Gagal mendaftar:", err);
      showAlert(alertEl, pesanErrorFirebase(err.code));
      setLoading(submitBtn, false, "Daftar", "Membuat akun…");
    }
  });
}

// ---------- Logout (dipakai di dashboard.html) ----------
export async function logout() {
  await signOut(auth);
  window.location.href = "index.html";
}

// Tombol logout generik, kalau ada di halaman manapun
document.querySelectorAll("[data-action='logout']").forEach((btn) => {
  btn.addEventListener("click", logout);
});
