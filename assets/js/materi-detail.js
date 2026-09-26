// =========================================================
// KOMIK STRIP STUDIO — Detail materi: step-by-step + kuis akhir
// =========================================================
// Perubahan dari versi sebelumnya:
// - Gambar step punya efek zoom mengikuti kursor (hover-magnify),
//   supaya screenshot menu/tool yang kecil tetap kebaca jelas.
// - Checklist manual diganti kuis pilihan ganda. Begitu jawaban
//   benar dipilih, item itu otomatis "tercentang" (tidak perlu
//   klik centang terpisah). Begitu SEMUA kuis di level itu benar,
//   progres & XP otomatis tersimpan tanpa perlu klik tombol lagi.
// =========================================================
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { doc, updateDoc, arrayUnion, increment } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
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
const kuisArea = document.getElementById("kuis-area");
const kuisList = document.getElementById("kuis-list");
const doneMsg = document.getElementById("done-msg");

if (backLink) backLink.href = backHref;

// ---------- Zoom gambar mengikuti kursor ----------
function pasangZoom(wrap, img) {
  wrap.addEventListener("mouseenter", () => wrap.classList.add("zoomed"));
  wrap.addEventListener("mouseleave", () => wrap.classList.remove("zoomed"));
  wrap.addEventListener("mousemove", (e) => {
    const rect = wrap.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    img.style.transformOrigin = `${px}% ${py}%`;
  });
}

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

    stepImg.innerHTML = "";
    if (l.gambar) {
      const wrap = document.createElement("div");
      wrap.className = "zoom-wrap";
      const img = document.createElement("img");
      img.src = l.gambar;
      img.alt = l.judul;
      img.loading = "lazy";
      const hint = document.createElement("span");
      hint.className = "zoom-hint";
      hint.textContent = "🔍 arahkan kursor untuk zoom";
      wrap.append(img, hint);
      stepImg.appendChild(wrap);
      pasangZoom(wrap, img);
    }

    btnPrev.disabled = langkahAktif === 0;
    btnNext.textContent = langkahAktif === totalLangkah - 1 ? "Lanjut ke kuis →" : "Lanjut →";
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
      kuisArea.hidden = false;
    }
  });

  tampilkanLangkah();

  // ---------- Kuis akhir (pengganti checklist) ----------
  const soal = level.kuis || [];
  const terjawabBenar = new Array(soal.length).fill(false);

  function acakArray(arr) {
    return arr.map((v, i) => [Math.random(), v, i]).sort((a, b) => a[0] - b[0]);
  }

  if (kuisList) {
    soal.forEach((s, i) => {
      const card = document.createElement("div");
      card.className = "kuis-card";
      card.id = `kuis-${i}`;

      const gambarHtml = s.gambar
        ? `<div class="zoom-wrap" id="kuis-img-wrap-${i}" style="max-width:360px;"><img src="${s.gambar}" alt="Gambar soal" loading="lazy" /><span class="zoom-hint">🔍 zoom</span></div>`
        : "";

      const pilihanUrut = acakArray(s.pilihan.map((teks, idx) => ({ teks, benar: idx === s.benar })));

      card.innerHTML = `
        <p class="kuis-pertanyaan">${i + 1}. ${s.pertanyaan}</p>
        ${gambarHtml}
        <div class="kuis-opsi-wrap"></div>
      `;
      const opsiWrap = card.querySelector(".kuis-opsi-wrap");
      pilihanUrut.forEach(([, opsi]) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "kuis-opsi";
        btn.textContent = opsi.teks;
        btn.addEventListener("click", () => jawab(i, opsi.benar, btn, card));
        opsiWrap.appendChild(btn);
      });

      kuisList.appendChild(card);

      if (s.gambar) {
        const wrap = document.getElementById(`kuis-img-wrap-${i}`);
        const img = wrap.querySelector("img");
        pasangZoom(wrap, img);
      }
    });
  }

  async function jawab(idx, benar, btn, card) {
    if (terjawabBenar[idx]) return;
    const semuaBtn = card.querySelectorAll(".kuis-opsi");

    if (benar) {
      btn.classList.add("benar");
      semuaBtn.forEach((b) => (b.disabled = true));
      card.classList.add("terjawab");
      terjawabBenar[idx] = true;

      if (terjawabBenar.every(Boolean)) {
        await selesaikanMateri();
      }
    } else {
      btn.classList.add("salah");
      setTimeout(() => btn.classList.remove("salah"), 500);
    }
  }

  async function selesaikanMateri() {
    const user = auth.currentUser;
    if (!user) return;
    try {
      await updateDoc(doc(db, "users", user.uid), {
        [`progress.${progressKey}`]: arrayUnion(level.id),
        xp: increment(10)
      });
    } catch (err) {
      console.error("Gagal menyimpan progress:", err);
    }
    kuisArea.hidden = true;
    doneMsg.hidden = false;
    siapkanTombolLanjut();
  }

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
