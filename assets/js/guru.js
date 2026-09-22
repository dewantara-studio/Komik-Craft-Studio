// =========================================================
// KOMIK STRIP STUDIO — Dashboard Guru (TAHAP 11)
// =========================================================
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { collection, query, where, getDocs, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { CSP_LEVELS } from "./data/csp-levels.js";
import { KOMIK_LEVELS } from "./data/komik-levels.js";

const loadingEl = document.getElementById("guru-loading");
const listEl = document.getElementById("guru-list");
const deniedEl = document.getElementById("guru-denied");

onAuthStateChanged(auth, async (user) => {
  if (!user) { window.location.href = "index.html"; return; }

  const meSnap = await getDoc(doc(db, "users", user.uid));
  const role = meSnap.exists() ? meSnap.data()?.role : null;

  if (role !== "guru") {
    if (loadingEl) loadingEl.hidden = true;
    if (deniedEl) deniedEl.hidden = false;
    return;
  }

  try {
    const q = query(collection(db, "users"), where("role", "==", "peserta_didik"));
    const snap = await getDocs(q);

    if (listEl) {
      listEl.innerHTML = "";
      snap.forEach((d) => {
        const s = d.data();
        const csp = s.progress?.csp || [];
        const komik = s.progress?.komik || [];
        const persenCsp = Math.round((csp.length / CSP_LEVELS.length) * 100);
        const persenKomik = Math.round((komik.length / KOMIK_LEVELS.length) * 100);

        const row = document.createElement("div");
        row.className = "panel";
        row.style.marginBottom = "14px";
        row.innerHTML = `
          <h3 style="margin:0 0 6px;">${s.nama || "(tanpa nama)"}</h3>
          <p style="margin:0 0 10px; font-size:0.85rem;">@${s.username || "-"} · ${s.xp || 0} XP</p>
          <p style="margin:0 0 4px; font-size:0.85rem; font-weight:600;">Clip Studio Paint — ${persenCsp}%</p>
          <div class="progress-bar" style="margin-bottom:10px;"><span style="width:${persenCsp}%"></span></div>
          <p style="margin:0 0 4px; font-size:0.85rem; font-weight:600;">Komik — ${persenKomik}%</p>
          <div class="progress-bar"><span style="width:${persenKomik}%"></span></div>
        `;
        listEl.appendChild(row);
      });
      if (snap.empty) listEl.innerHTML = `<p class="empty-state">Belum ada peserta didik yang terdaftar.</p>`;
    }
  } catch (err) {
    console.error("Gagal memuat data peserta didik:", err);
    if (listEl) listEl.innerHTML = `<p class="empty-state">Gagal memuat data. Coba muat ulang halaman.</p>`;
  } finally {
    if (loadingEl) loadingEl.hidden = true;
    if (listEl) listEl.hidden = false;
  }
});
