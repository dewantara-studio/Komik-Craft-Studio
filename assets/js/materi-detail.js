// =========================================================
// KOMIK STRIP STUDIO — Detail materi: step-by-step + checklist
// =========================================================
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { doc, getDoc, updateDoc, arrayUnion, increment } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { CSP_LEVELS } from "./data/csp-levels.js";
import { KOMIK_LEVELS } from "./data/komik-levels.js";

const params = new URLSearchParams(location.search);
const jenis = params.get("jenis") === "komik" ? "komik" : "csp";
const id = Number(params.get("id"));
const LEVELS = jenis === "komik" ? KOMIK_LEVELS : CSP_LEVELS;
const progressKey = jenis === "komik" ? "komik" : "csp";
const level = LEVELS.find((l) => l.id === id);

const backHref = `materi.html?jenis=${jenis}`;
const titleEl = document.getElementById("detail-title");
const backLink = document.getElementById("detail-back");
const stepArea = document.getElementById("step-area");
const stepCounter = document.getElementById("step-counter");
const stepImg = document.getElementById("step-img");
const stepTitle = document.getElementById("step-title");
const stepBody = document.getElementById("step-body");
const btnPrev = document.getElementById("btn-prev");
const btnNext = document.getElementById("btn-next");
const checklistArea = document.getElementById("checklist-area");
const checklistList = document.getElementById("checklist-list");
const btnSelesai = document.getElementById("btn-selesai");
const doneMsg = document.getElementById("done-msg");

if (backLink) backLink.href = backHref;

if (!level) {
  if (titleEl) titleEl.textContent = "Materi tidak ditemukan";
  if (stepArea) stepArea.hidden = true;
} else {
  if (titleEl) titleEl.textContent = `${level.ikon} ${level.judul}`;

  let langkahAktif = 0;
  const totalLangkah = level.langkah.length;

  function tampilkanLangkah() {
    const l = level.langkah[langkahAktif];
    stepCounter.textContent = `LANGKAH ${langkahAktif + 1} DARI ${totalLangkah}`;
    stepTitle.textContent = l.judul;
    stepBody.textContent = l.pahami;

    // Gambar/screenshot opsional. Isi field "gambar" di file data
    // (csp-levels.js / komik-levels.js) untuk menampilkannya di sini.
    stepImg.innerHTML = "";
    if (l.gambar) {
      const img = document.createElement("img");
      img.src = l.gambar;
      img.alt = l.judul;
      img.loading = "lazy";
      img.style.cssText = "width:100%; border:3px solid var(--line); border-radius:10px; margin-bottom:16px; display:block;";
      stepImg.appendChild(img);
    }

    btnPrev.disabled = langkahAktif === 0;
    btnNext.textContent = langkahAktif === totalLangkah - 1 ? "Lanjut ke checklist →" : "Lanjut →";
  }

  btnPrev?.addEventListener("click", () => {
    if (langkahAktif > 0) { langkahAktif--; tampilkanLangkah(); }
  });
  btnNext?.addEventListener("click", () => {
    if (langkahAktif < totalLangkah - 1) {
      langkahAktif++;
      tampilkanLangkah();
    } else {
      stepArea.hidden = true;
      checklistArea.hidden = false;
    }
  });

  tampilkanLangkah();

  // Checklist
  if (checklistList) {
    level.checklist.forEach((teks, i) => {
      const li = document.createElement("li");
      li.className = "journey";
      li.style.padding = "0";
      li.innerHTML = `
        <label style="display:flex; align-items:center; gap:10px; padding:12px 14px; cursor:pointer;">
          <input type="checkbox" data-idx="${i}" style="width:18px;height:18px;" />
          <span>${teks}</span>
        </label>`;
      checklistList.appendChild(li);
    });
  }

  function cekSemuaTercentang() {
    const boxes = checklistList.querySelectorAll("input[type='checkbox']");
    return [...boxes].every((b) => b.checked);
  }
  checklistList?.addEventListener("change", () => {
    btnSelesai.disabled = !cekSemuaTercentang();
  });

  btnSelesai?.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) return;
    btnSelesai.disabled = true;
    btnSelesai.textContent = "Menyimpan…";
    try {
      await updateDoc(doc(db, "users", user.uid), {
        [`progress.${progressKey}`]: arrayUnion(level.id),
        xp: increment(10)
      });
      checklistArea.hidden = true;
      doneMsg.hidden = false;
      siapkanTombolLanjut();
    } catch (err) {
      console.error("Gagal menyimpan progress:", err);
      btnSelesai.disabled = false;
      btnSelesai.textContent = "Materi Selesai 🎉";
    }
  });

  // Tombol "Lanjut ke Level Berikutnya" — otomatis arahkan ke level
  // sesudahnya di jenis yang sama. Kalau ini level terakhir CSP,
  // arahkan ke Belajar Komik. Kalau ini level terakhir Komik,
  // arahkan kembali ke dasbor (seluruh materi sudah selesai).
  function siapkanTombolLanjut() {
    const idxSekarang = LEVELS.findIndex((l) => l.id === level.id);
    const levelBerikutnya = LEVELS[idxSekarang + 1];
    const btnLanjut = document.getElementById("btn-lanjut-level");
    if (!btnLanjut) return;

    if (levelBerikutnya) {
      btnLanjut.textContent = `Lanjut ke ${levelBerikutnya.ikon} ${levelBerikutnya.judul} →`;
      btnLanjut.href = `materi-detail.html?jenis=${jenis}&id=${levelBerikutnya.id}`;
    } else if (jenis === "csp") {
      btnLanjut.textContent = "Semua materi CSP selesai! Lanjut ke Belajar Komik →";
      btnLanjut.href = "materi.html?jenis=komik";
    } else {
      btnLanjut.textContent = "Semua materi selesai! Kembali ke Dasbor 🎉";
      btnLanjut.href = "dashboard.html";
    }
  }
}

onAuthStateChanged(auth, (user) => {
  if (!user) window.location.href = "index.html";
});
