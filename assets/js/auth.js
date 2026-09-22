// =========================================================
// KOMIK STRIP STUDIO — Autentikasi (TAHAP 1)
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
    "auth/invalid-email": "Format email tidak valid.",
    "auth/user-not-found": "Email belum terdaftar. Silakan daftar dulu.",
    "auth/wrong-password": "Kata sandi salah. Coba lagi.",
    "auth/invalid-credential": "Email atau kata sandi salah.",
    "auth/email-already-in-use": "Email ini sudah terdaftar. Silakan masuk.",
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
    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value;

    setLoading(submitBtn, true, "Masuk", "Memproses…");
    try {
      await signInWithEmailAndPassword(auth, email, password);
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

  onAuthStateChanged(auth, (user) => {
    if (user) window.location.href = "dashboard.html";
  });

  registerForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    hideAlert(alertEl);

    const nama = document.getElementById("register-nama").value.trim();
    const email = document.getElementById("register-email").value.trim();
    const password = document.getElementById("register-password").value;
    const konfirmasi = document.getElementById("register-konfirmasi").value;

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
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(cred.user, { displayName: nama });

      // Profil disimpan di Firestore, BUKAN kata sandi.
      // Kata sandi sepenuhnya dikelola oleh Firebase Authentication.
      await setDoc(doc(db, "users", cred.user.uid), {
        nama,
        email,
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
