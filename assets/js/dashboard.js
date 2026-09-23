// =========================================================
// KOMIK STRIP STUDIO — Dashboard lengkap (TAHAP 2)
// =========================================================
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { CSP_LEVELS } from "./data/csp-levels.js";
import { KOMIK_LEVELS } from "./data/komik-levels.js";

const helloEl = document.getElementById("dash-hello");
const progressEl = document.getElementById("dash-progress-value");
const progressBarEl = document.getElementById("dash-progress-bar");
const nextTitleEl = document.getElementById("dash-next-title");
const nextLinkEl = document.getElementById("dash-next-link");
const xpEl = document.getElementById("dash-xp");
const guruNavEl = document.getElementById("nav-guru");
const loadingEl = document.getElementById("dash-loading");
const contentEl = document.getElementById("dash-content");
const journeyEl = document.getElementById("dash-journey");

function levelBerikutnya(levels, selesai) {
  return levels.find((l) => !selesai.includes(l.id)) || null;
}

onAuthStateChanged(auth, async (user) => {
  if (!user) { window.location.href = "index.html"; return; }

  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    const data = snap.exists() ? snap.data() : null;
    const nama = data?.nama || user.displayName || "Sahabat Komik";
    const csp = data?.progress?.csp || [];
    const komik = data?.progress?.komik || [];
    const xp = data?.xp || 0;

    const persenCsp = Math.round((csp.length / CSP_LEVELS.length) * 100);

    let jumlahLatihan = 0;
    try {
      const latihanSnap = await getDocs(collection(db, "users", user.uid, "latihanHasil"));
      jumlahLatihan = latihanSnap.size;
    } catch (err) {
      console.error("Gagal memuat jumlah latihan:", err);
    }

    if (helloEl) helloEl.textContent = `SELAMAT DATANG, ${nama.toUpperCase()}`;
    if (progressEl) progressEl.textContent = `${persenCsp}%`;
    if (progressBarEl) progressBarEl.style.width = `${persenCsp}%`;
    if (xpEl) xpEl.textContent = `${xp} XP`;

    const berikutnya = levelBerikutnya(CSP_LEVELS, csp);
    if (berikutnya) {
      if (nextTitleEl) nextTitleEl.textContent = `Materi berikutnya: ${berikutnya.judul}`;
      if (nextLinkEl) nextLinkEl.href = `materi-detail.html?jenis=csp&id=${berikutnya.id}`;
    } else {
      if (nextTitleEl) nextTitleEl.textContent = "Semua materi Clip Studio Paint selesai! Lanjutkan ke Belajar Komik.";
      if (nextLinkEl) { nextLinkEl.href = "materi.html?jenis=komik"; nextLinkEl.textContent = "Belajar Komik →"; }
    }

    if (journeyEl) {
      const cspDone = csp.length === CSP_LEVELS.length;
      const komikDone = komik.length === KOMIK_LEVELS.length;
      const items = [
        { label: "🎨 Clip Studio Paint", done: csp.length > 0, href: "materi.html?jenis=csp" },
        { label: "📚 Belajar Komik", done: komik.length > 0, href: "materi.html?jenis=komik" },
        { label: "✏️ Latihan", done: jumlahLatihan > 0, href: "latihan.html" },
        { label: "🖌️ Komik Studio", done: false, href: "komik-studio.html" },
        { label: "🏆 Projek Akhir", done: cspDone && komikDone, href: "komik-studio.html" },
        { label: "📁 Portofolio", done: false, href: "komik-saya.html" }
      ];
      journeyEl.innerHTML = items.map((it) => `
        <li data-status="${it.done ? "done" : ""}">
          <span class="dot"></span>
          <a href="${it.href}" style="text-decoration:none; color:inherit; font-weight:600;">${it.label}</a>
        </li>`).join("");
    }

    if (data?.role === "guru" && guruNavEl) guruNavEl.hidden = false;
  } catch (err) {
    if (helloEl) helloEl.textContent = "SELAMAT DATANG";
    console.error("Gagal memuat profil:", err);
  } finally {
    if (loadingEl) loadingEl.hidden = true;
    if (contentEl) contentEl.hidden = false;
  }
});
