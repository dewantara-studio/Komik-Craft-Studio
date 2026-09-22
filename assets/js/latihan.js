// =========================================================
// KOMIK STRIP STUDIO — Latihan interaktif (TAHAP 6)
// =========================================================
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { doc, getDoc, updateDoc, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const KATEGORI = [
  { judul: "Latihan Clip Studio Paint", ikon: "🎨", item: ["Brush", "Eraser", "Layer", "Selection", "Transform", "Color", "Text"] },
  { judul: "Latihan Komik", ikon: "📚", item: ["Ekspresi", "Karakter", "Panel", "Storyboard", "Dialog", "Warna", "Background"] }
];

const wrapEl = document.getElementById("latihan-wrap");
const loadingEl = document.getElementById("latihan-loading");

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
    wrapEl.innerHTML = KATEGORI.map((kat) => `
      <div class="panel" style="margin-bottom:22px;">
        <h3 style="margin-top:0;">${kat.ikon} ${kat.judul}</h3>
        <ul style="list-style:none; margin:0; padding:0; display:flex; flex-direction:column; gap:8px;">
          ${kat.item.map((it) => {
            const key = `${kat.judul}:${it}`;
            const checked = selesai.includes(key) ? "checked" : "";
            return `<li>
              <label style="display:flex; align-items:center; gap:10px; padding:8px 4px; cursor:pointer;">
                <input type="checkbox" data-key="${key}" ${checked} style="width:18px;height:18px;" />
                <span>${it}</span>
              </label>
            </li>`;
          }).join("")}
        </ul>
      </div>
    `).join("");

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
