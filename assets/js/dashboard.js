// =========================================================
// KOMIK STRIP STUDIO — Dashboard dasar (TAHAP 1)
// =========================================================
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const helloEl = document.getElementById("dash-hello");
const progressEl = document.getElementById("dash-progress-value");
const progressBarEl = document.getElementById("dash-progress-bar");
const guruNavEl = document.getElementById("nav-guru");
const loadingEl = document.getElementById("dash-loading");
const contentEl = document.getElementById("dash-content");

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "index.html";
    return;
  }

  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    const data = snap.exists() ? snap.data() : null;
    const nama = data?.nama || user.displayName || "Sahabat Komik";
    const progresCSP = data?.progress?.clipStudioPaint ?? 0;

    if (helloEl) helloEl.textContent = `SELAMAT DATANG, ${nama.toUpperCase()}`;
    if (progressEl) progressEl.textContent = `${progresCSP}%`;
    if (progressBarEl) progressBarEl.style.width = `${progresCSP}%`;

    if (data?.role === "guru" && guruNavEl) {
      guruNavEl.hidden = false;
    }
  } catch (err) {
    if (helloEl) helloEl.textContent = "SELAMAT DATANG";
    console.error("Gagal memuat profil:", err);
  } finally {
    if (loadingEl) loadingEl.hidden = true;
    if (contentEl) contentEl.hidden = false;
  }
});
