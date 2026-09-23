// =========================================================
// KOMIK STRIP STUDIO — Latihan interaktif otomatis (TAHAP 6+)
// =========================================================
// Tugasnya dikerjakan LANGSUNG di web ini lewat widget canvas
// (lihat latihan-canvas.js). Begitu sistem mendeteksi tugasnya
// selesai (gambar cukup terisi, semua kotak terwarnai, dst),
// status "Selesai" otomatis tersimpan — tidak ada tombol
// centang manual maupun upload foto sama sekali.
// =========================================================
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { collection, getDocs, doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { LATIHAN_CSP, LATIHAN_KOMIK } from "./data/latihan-data.js";
import { mountLatihanWidget } from "./latihan-canvas.js";

const KATEGORI = [
  { key: "csp", judul: "Latihan Clip Studio Paint", ikon: "🎨", item: LATIHAN_CSP },
  { key: "komik", judul: "Latihan Komik", ikon: "📚", item: LATIHAN_KOMIK }
];

const wrapEl = document.getElementById("latihan-wrap");
const loadingEl = document.getElementById("latihan-loading");

function formatTanggal(ts) {
  return ts?.toDate ? ts.toDate().toLocaleDateString("id-ID", { day: "numeric", month: "short", year: "numeric" }) : "";
}

onAuthStateChanged(auth, async (user) => {
  if (!user) { window.location.href = "index.html"; return; }

  let hasil = {};
  try {
    const snap = await getDocs(collection(db, "users", user.uid, "latihanHasil"));
    snap.forEach((d) => { hasil[d.id] = d.data(); });
  } catch (err) {
    console.error("Gagal memuat hasil latihan:", err);
  }

  function hitungBadgeKategori() {
    KATEGORI.forEach((kat) => {
      const jumlahSelesai = kat.item.filter((it) => hasil[`${kat.key}:${it.nama}`]).length;
      const badgeEl = document.getElementById(`badge-${kat.key}`);
      if (badgeEl) badgeEl.textContent = `${jumlahSelesai}/${kat.item.length} selesai`;
    });
  }

  async function simpanHasil(key, dataUrl) {
    await setDoc(doc(db, "users", user.uid, "latihanHasil", key), {
      gambar: dataUrl,
      waktu: serverTimestamp()
    });
    hasil[key] = { gambar: dataUrl, waktu: { toDate: () => new Date() } };
  }

  function renderKartu(kat, it) {
    const key = `${kat.key}:${it.nama}`;
    const idAman = key.replace(/[^a-zA-Z0-9]/g, "-");
    const submisi = hasil[key];

    const kartu = document.createElement("div");
    kartu.className = "mini-card";
    kartu.style.marginBottom = "10px";
    kartu.id = `kartu-${idAman}`;

    kartu.innerHTML = `
      <span class="tag">${it.ikon} ${it.nama} ${submisi ? "· Selesai ✓" : ""}</span>
      <p style="margin:6px 0 10px; font-size:0.9rem;">${it.instruksi}</p>
      <div id="area-${idAman}"></div>
    `;
    const area = kartu.querySelector(`#area-${idAman}`);

    if (submisi) {
      area.innerHTML = `
        <img src="${submisi.gambar}" alt="Hasil ${it.nama}" style="width:100%; max-width:280px; border:2px solid var(--line); border-radius:8px; display:block; margin-bottom:8px;" />
        <p style="margin:0 0 10px; font-size:0.8rem; color:var(--ink-soft);">Selesai ${formatTanggal(submisi.waktu)}</p>
        <button type="button" class="btn btn-secondary" data-ulangi="${idAman}" style="width:auto; padding:10px 16px;">Ulangi latihan</button>
      `;
      area.querySelector("[data-ulangi]").addEventListener("click", () => mulaiLatihan(area, kat, it, key));
    } else {
      const tombol = document.createElement("button");
      tombol.type = "button";
      tombol.className = "btn btn-primary";
      tombol.style.cssText = "width:auto; padding:10px 16px;";
      tombol.textContent = "Mulai Latihan";
      tombol.addEventListener("click", () => mulaiLatihan(area, kat, it, key), { once: true });
      area.appendChild(tombol);
    }

    return kartu;
  }

  async function mulaiLatihan(area, kat, it, key) {
    area.innerHTML = `<p class="field-hint" style="margin-bottom:8px;">Mengerjakan latihan…</p>`;
    const widgetDiv = document.createElement("div");
    area.appendChild(widgetDiv);

    try {
      const dataUrl = await mountLatihanWidget(widgetDiv, { mode: it.mode, ...it.config });
      area.innerHTML = `<p class="field-hint">Menyimpan…</p>`;
      await simpanHasil(key, dataUrl);
      render();
    } catch (err) {
      console.error("Gagal menyimpan hasil latihan:", err);
      area.innerHTML = `<p class="field-hint">Gagal menyimpan, coba lagi.</p>`;
    }
  }

  function render() {
    if (!wrapEl) return;
    wrapEl.innerHTML = "";
    KATEGORI.forEach((kat) => {
      const panel = document.createElement("div");
      panel.className = "panel";
      panel.style.marginBottom = "22px";
      panel.innerHTML = `
        <div style="display:flex; align-items:center; justify-content:space-between; margin-bottom:14px;">
          <h3 style="margin:0;">${kat.ikon} ${kat.judul}</h3>
          <span class="auth-kicker" id="badge-${kat.key}" style="margin:0;"></span>
        </div>
      `;
      kat.item.forEach((it) => panel.appendChild(renderKartu(kat, it)));
      wrapEl.appendChild(panel);
    });
    hitungBadgeKategori();
  }

  render();
  if (loadingEl) loadingEl.hidden = true;
  if (wrapEl) wrapEl.hidden = false;
});
