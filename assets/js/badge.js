// =========================================================
// KOMIK STRIP STUDIO — Badge (TAHAP 9, dihitung otomatis)
// =========================================================
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { KOMIK_LEVELS } from "./data/komik-levels.js";
import { LATIHAN_CSP, LATIHAN_KOMIK } from "./data/latihan-data.js";

const listEl = document.getElementById("badge-list");
const loadingEl = document.getElementById("badge-loading");
const xpEl = document.getElementById("badge-xp");
const TOTAL_LATIHAN = LATIHAN_CSP.length + LATIHAN_KOMIK.length;
function daftarBadge(csp, komik, jumlahKarya, jumlahLatihan) {
  return [
    { ikon: "🏅", nama: "Kenal Clip Studio Paint", didapat: csp.includes(1) },
    { ikon: "🏅", nama: "Brush Master", didapat: csp.includes(3) },
    { ikon: "🏅", nama: "Layer Explorer", didapat: csp.includes(4) },
    { ikon: "🏅", nama: "Coloring Artist", didapat: csp.includes(7) },
    { ikon: "🏅", nama: "Comic Beginner", didapat: komik.includes(1) },
    { ikon: "🏅", nama: "Storyteller", didapat: komik.includes(4) },
    { ikon: "🏅", nama: "Comic Creator", didapat: komik.length === KOMIK_LEVELS.length },
    { ikon: "🏅", nama: "Komik Pertamaku", didapat: jumlahKarya > 0 },
    { ikon: "🏅", nama: "Rajin Berlatih", didapat: jumlahLatihan >= TOTAL_LATIHAN }
  ];
}

onAuthStateChanged(auth, async (user) => {
  if (!user) { window.location.href = "index.html"; return; }

  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    const data = snap.exists() ? snap.data() : {};
    const csp = data.progress?.csp || [];
    const komik = data.progress?.komik || [];

    const karyaSnap = await getDocs(collection(db, "users", user.uid, "karya"));
    const latihanSnap = await getDocs(collection(db, "users", user.uid, "latihanHasil"));
    const jumlahLatihan = latihanSnap.size;

    if (xpEl) xpEl.textContent = `${data.xp || 0} XP`;

    if (listEl) {
      listEl.innerHTML = daftarBadge(csp, komik, karyaSnap.size, jumlahLatihan).map((b) => `
        <div class="mini-card ${b.didapat ? "" : "locked"}">
          <div style="font-size:2rem; margin-bottom:6px;">${b.didapat ? b.ikon : "🔒"}</div>
          <h3 style="margin:0;">${b.nama}</h3>
          <p style="margin:4px 0 0; font-size:0.85rem;">${b.didapat ? "Didapat" : "Belum didapat"}</p>
        </div>
      `).join("");
    }
  } catch (err) {
    console.error("Gagal memuat badge:", err);
  } finally {
    if (loadingEl) loadingEl.hidden = true;
    if (listEl) listEl.hidden = false;
  }
});
