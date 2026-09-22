// =========================================================
// KOMIK STRIP STUDIO — Komik Saya / Portofolio (TAHAP 10)
// =========================================================
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { collection, query, orderBy, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const listEl = document.getElementById("karya-list");
const loadingEl = document.getElementById("karya-loading");
const emptyEl = document.getElementById("karya-empty");

const LABEL_STATUS = { draft: "Draft", selesai: "Selesai", dipublikasikan: "Dipublikasikan" };

onAuthStateChanged(auth, async (user) => {
  if (!user) { window.location.href = "index.html"; return; }

  try {
    const q = query(collection(db, "users", user.uid, "karya"), orderBy("dibuatPada", "desc"));
    const snap = await getDocs(q);

    if (snap.empty) {
      if (emptyEl) emptyEl.hidden = false;
    } else if (listEl) {
      listEl.innerHTML = "";
      snap.forEach((d) => {
        const k = d.data();
        const tanggal = k.dibuatPada?.toDate ? k.dibuatPada.toDate().toLocaleDateString("id-ID") : "-";
        const card = document.createElement("div");
        card.className = "mini-card";
        card.innerHTML = `
          <img src="${k.dataUrl}" alt="${k.judul}" style="width:100%; border:2px solid var(--line); border-radius:8px; margin-bottom:10px; display:block;" />
          <span class="tag">${LABEL_STATUS[k.status] || k.status}</span>
          <h3 style="margin:0 0 4px;">${k.judul}</h3>
          <p style="margin:0 0 10px; font-size:0.85rem;">${tanggal} · ${k.panelCount} panel</p>
          <button class="icon-btn" data-id="${d.id}" type="button" style="width:100%;">🗑 Hapus</button>
        `;
        listEl.appendChild(card);
      });

      listEl.querySelectorAll("button[data-id]").forEach((btn) => {
        btn.addEventListener("click", async () => {
          if (!confirm("Hapus karya ini?")) return;
          try {
            await deleteDoc(doc(db, "users", user.uid, "karya", btn.dataset.id));
            btn.closest(".mini-card").remove();
          } catch (err) {
            console.error("Gagal menghapus karya:", err);
          }
        });
      });
    }
  } catch (err) {
    console.error("Gagal memuat portofolio:", err);
  } finally {
    if (loadingEl) loadingEl.hidden = true;
    if (listEl) listEl.hidden = false;
  }
});
