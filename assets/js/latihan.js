// =========================================================
// KOMIK STRIP STUDIO — Latihan interaktif (TAHAP 6, diperdalam)
// =========================================================
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { LATIHAN_CSP, LATIHAN_KOMIK } from "./data/latihan-data.js";

const KATEGORI = [
  { key: "csp", judul: "Latihan Clip Studio Paint", ikon: "🎨", item: LATIHAN_CSP },
  { key: "komik", judul: "Latihan Komik", ikon: "📚", item: LATIHAN_KOMIK }
];

const wrapEl = document.getElementById("latihan-wrap");
const loadingEl = document.getElementById("latihan-loading");

function kartuLatihan(kat, it, selesai) {
  const key = `${kat.key}:${it.nama}`;
  const checked = selesai.includes(key);
  const gambarHtml = it.gambar
    ? `<img src="${it.gambar}" alt="${it.nama}" style="width:100%; border:2px solid var(--line); border-radius:8px; margin:8px 0;" />`
    : "";
  return `
    <div class="mini-card ${checked ? "" : ""}" style="margin-bottom:10px;">
      <label style="display:flex; align-items:flex-start; gap:10px; cursor:pointer;">
        <input type="checkbox" data-key="${key}" ${checked ? "checked" : ""} style="width:20px; height:20px; margin-top:2px; flex-shrink:0;" />
        <span style="flex:1;">
          <span class="tag" style="margin-bottom:6px;">${it.ikon} ${it.nama}</span>
          ${gambarHtml}
          <p style="margin:4px 0 0; font-size:0.9rem;">${it.instruksi}</p>
        </span>
      </label>
    </div>`;
}

onAuthStateChanged(auth, async (user) => {
  if (!user) { window.location.href = "index.html"; return; }

  let selesai = [];
  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    selesai = snap.exists() ? (snap.data()?.latihanSelesai || []) : [];
  } catch (err) {
    console.error("Gagal memuat latihan:", err);
  }

  if (wrapEl) {
    wrapEl.innerHTML = KATEGORI.map((kat) => {
      const jumlahSelesai = kat.item.filter((it) => selesai.includes(`${kat.key}:${it.nama}`)).length;
      return `
        <div class="panel" style="margin-bottom:22px;">
          <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px;">
            <h3 style="margin:0;">${kat.ikon} ${kat.judul}</h3>
            <span class="auth-kicker" style="margin:0;">${jumlahSelesai}/${kat.item.length} selesai</span>
          </div>
          ${kat.item.map((it) => kartuLatihan(kat, it, selesai)).join("")}
        </div>`;
    }).join("");

    wrapEl.querySelectorAll("input[type='checkbox']").forEach((box) => {
      box.addEventListener("change", async () => {
        const key = box.dataset.key;
        try {
          await updateDoc(doc(db, "users", user.uid), {
            latihanSelesai: box.checked ? arrayUnion(key) : arrayRemove(key)
          });
        } catch (err) {
          console.error("Gagal menyimpan latihan:", err);
          box.checked = !box.checked;
        }
      });
    });
  }
  if (loadingEl) loadingEl.hidden = true;
  if (wrapEl) wrapEl.hidden = false;
});
