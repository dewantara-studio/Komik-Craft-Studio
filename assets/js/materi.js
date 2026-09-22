// =========================================================
// KOMIK STRIP STUDIO — Daftar materi (CSP & Komik) TAHAP 3/7
// =========================================================
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { CSP_LEVELS } from "./data/csp-levels.js";
import { KOMIK_LEVELS } from "./data/komik-levels.js";

const params = new URLSearchParams(location.search);
const jenis = params.get("jenis") === "komik" ? "komik" : "csp";
const LEVELS = jenis === "komik" ? KOMIK_LEVELS : CSP_LEVELS;
const progressKey = jenis === "komik" ? "komik" : "csp";

const titleEl = document.getElementById("materi-title");
const subtitleEl = document.getElementById("materi-subtitle");
const listEl = document.getElementById("materi-list");
const loadingEl = document.getElementById("materi-loading");

if (titleEl) {
  titleEl.textContent = jenis === "komik" ? "📚 Belajar Komik" : "🎨 Belajar Clip Studio Paint";
}
if (subtitleEl) {
  subtitleEl.textContent = jenis === "komik"
    ? "13 level, dari ide cerita sampai menerbitkan komikmu."
    : "12 level bertahap, mulai dari mengenal aplikasi sampai komik pertamamu.";
}

onAuthStateChanged(auth, async (user) => {
  if (!user) { window.location.href = "index.html"; return; }

  let selesai = [];
  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    selesai = snap.exists() ? (snap.data()?.progress?.[progressKey] || []) : [];
  } catch (err) {
    console.error("Gagal memuat progress:", err);
  }

  if (listEl) {
    listEl.innerHTML = "";
    LEVELS.forEach((level, idx) => {
      const sudahSelesai = selesai.includes(level.id);
      const terkunci = idx > 0 && !selesai.includes(LEVELS[idx - 1].id) && !sudahSelesai;

      const item = document.createElement(terkunci ? "div" : "a");
      if (!terkunci) item.href = `materi-detail.html?jenis=${jenis}&id=${level.id}`;
      item.className = "mini-card" + (terkunci ? " locked" : "") + " materi-item";

      item.innerHTML = `
        <span class="tag">${sudahSelesai ? "Selesai ✓" : terkunci ? "Terkunci 🔒" : `Level ${level.id}`}</span>
        <h3 style="margin:0 0 4px;">${level.ikon} ${level.judul}</h3>
        <p style="margin:0; font-size:0.9rem;">${level.ringkasan}</p>
      `;
      listEl.appendChild(item);
    });
  }
  if (loadingEl) loadingEl.hidden = true;
  if (listEl) listEl.hidden = false;
});
