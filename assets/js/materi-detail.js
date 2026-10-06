// =========================================================
// KOMIK STRIP STUDIO — Detail materi
// =========================================================
// Dua jalur berbeda setelah langkah step-by-step selesai:
// - jenis=csp   -> kuis pilihan ganda (menguji pemahaman konsep)
// - jenis=komik -> TUGAS NYATA yang hasilnya disimpan ke satu
//   proyek komik (users/{uid}/proyekKomik/aktif). Level 13 (Export)
//   menggabung semuanya jadi satu karya utuh di Komik Saya.
// =========================================================
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import {
  doc, getDoc, setDoc, updateDoc, arrayUnion, increment,
  collection, addDoc, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";
import { CSP_LEVELS } from "./data/csp-levels.js";
import { KOMIK_LEVELS } from "./data/komik-levels.js";
import { mountLatihanWidget } from "./latihan-canvas.js";

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
const tugasArea = document.getElementById("tugas-area");
const tugasWrap = document.getElementById("tugas-wrap");
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
    btnNext.textContent = langkahAktif === totalLangkah - 1
      ? (jenis === "komik" ? "Lanjut ke tugas →" : "Lanjut ke kuis →")
      : "Lanjut →";
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
      if (jenis === "komik") {
        tugasArea.hidden = false;
        mulaiTugasKomik();
      } else {
        kuisArea.hidden = false;
        mulaiKuisCsp();
      }
    }
  });

  tampilkanLangkah();

  // =======================================================
  // JALUR CSP: kuis pilihan ganda
  // =======================================================
  function acakArray(arr) {
    return arr.map((v) => [Math.random(), v]).sort((a, b) => a[0] - b[0]);
  }

  function mulaiKuisCsp() {
    const soal = level.kuis || [];
    const terjawabBenar = new Array(soal.length).fill(false);

    soal.forEach((s, i) => {
      const card = document.createElement("div");
      card.className = "kuis-card";

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
        btn.addEventListener("click", () => jawabKuis(i, opsi.benar, btn, card));
        opsiWrap.appendChild(btn);
      });

      kuisList.appendChild(card);

      if (s.gambar) {
        const wrap = document.getElementById(`kuis-img-wrap-${i}`);
        pasangZoom(wrap, wrap.querySelector("img"));
      }
    });

    async function jawabKuis(idx, benar, btn, card) {
      if (terjawabBenar[idx]) return;
      const semuaBtn = card.querySelectorAll(".kuis-opsi");
      if (benar) {
        btn.classList.add("benar");
        semuaBtn.forEach((b) => (b.disabled = true));
        card.classList.add("terjawab");
        terjawabBenar[idx] = true;
        if (terjawabBenar.every(Boolean)) await selesaikanMateri();
      } else {
        btn.classList.add("salah");
        setTimeout(() => btn.classList.remove("salah"), 500);
      }
    }
  }

  // =======================================================
  // JALUR KOMIK: tugas nyata -> proyekKomik/aktif
  // =======================================================
  async function ambilProyek(user) {
    try {
      const snap = await getDoc(doc(db, "users", user.uid, "proyekKomik", "aktif"));
      return snap.exists() ? snap.data() : {};
    } catch (err) {
      console.error("Gagal memuat proyek komik:", err);
      return {};
    }
  }

  async function simpanKeProyek(user, data) {
    await setDoc(doc(db, "users", user.uid, "proyekKomik", "aktif"), {
      ...data,
      diperbaruiPada: serverTimestamp()
    }, { merge: true });
  }

  async function mulaiTugasKomik() {
    const user = auth.currentUser;
    if (!user) return;
    const t = level.tugas;
    tugasWrap.innerHTML = "";

    if (t.mode === "export") {
      await renderExport(user);
      return;
    }

    const proyek = await ambilProyek(user);

    const labelEl = document.createElement("p");
    labelEl.style.cssText = "font-weight:600; margin-bottom:12px;";
    labelEl.textContent = t.label;
    tugasWrap.appendChild(labelEl);

    if (t.mode === "text") {
      const textarea = document.createElement("textarea");
      textarea.rows = 3;
      textarea.placeholder = t.placeholder || "";
      textarea.value = proyek[t.field] || "";
      textarea.style.cssText = "width:100%; padding:10px 12px; border:2px solid var(--line); border-radius:8px; font-family:inherit; font-size:0.95rem; margin-bottom:10px;";

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-primary";
      btn.style.cssText = "width:auto; padding:10px 20px;";
      btn.textContent = "Simpan & Lanjut";
      btn.disabled = textarea.value.trim().length < (t.minPanjang || 5);

      textarea.addEventListener("input", () => {
        btn.disabled = textarea.value.trim().length < (t.minPanjang || 5);
      });
      btn.addEventListener("click", async () => {
        btn.disabled = true;
        btn.textContent = "Menyimpan…";
        await simpanKeProyek(user, { [t.field]: textarea.value.trim() });
        await selesaikanMateri();
      });

      tugasWrap.append(textarea, btn);
    } else if (t.mode === "text-multi") {
      const nilai = proyek[t.field] || {};
      const inputs = {};

      t.fields.forEach((f) => {
        const wrap = document.createElement("div");
        wrap.className = "field";
        const lbl = document.createElement("label");
        lbl.textContent = f.label + (f.opsional ? " (opsional)" : "");
        const input = document.createElement("input");
        input.type = "text";
        input.placeholder = f.placeholder || "";
        input.value = nilai[f.key] || "";
        wrap.append(lbl, input);
        tugasWrap.appendChild(wrap);
        inputs[f.key] = input;
      });

      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn btn-primary";
      btn.style.cssText = "width:auto; padding:10px 20px;";
      btn.textContent = "Simpan & Lanjut";

      function cekValid() {
        return t.fields.every((f) => f.opsional || inputs[f.key].value.trim().length >= (t.minPanjang || 2));
      }
      btn.disabled = !cekValid();
      Object.values(inputs).forEach((inp) => inp.addEventListener("input", () => { btn.disabled = !cekValid(); }));

      btn.addEventListener("click", async () => {
        btn.disabled = true;
        btn.textContent = "Menyimpan…";
        const hasil = {};
        t.fields.forEach((f) => { hasil[f.key] = inputs[f.key].value.trim(); });
        await simpanKeProyek(user, { [t.field]: hasil });
        await selesaikanMateri();
      });

      tugasWrap.appendChild(btn);
    } else if (t.mode === "pilihan") {
      const opsiWrap = document.createElement("div");
      t.opsi.forEach((opsi) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "kuis-opsi";
        btn.textContent = opsi;
        if (proyek[t.field] === opsi) btn.classList.add("benar");
        btn.addEventListener("click", async () => {
          opsiWrap.querySelectorAll(".kuis-opsi").forEach((b) => (b.disabled = true));
          btn.classList.add("benar");
          await simpanKeProyek(user, { [t.field]: opsi });
          await selesaikanMateri();
        });
        opsiWrap.appendChild(btn);
      });
      tugasWrap.appendChild(opsiWrap);
    } else if (t.mode === "draw") {
      const widgetDiv = document.createElement("div");
      tugasWrap.appendChild(widgetDiv);
      const dataUrl = await mountLatihanWidget(widgetDiv, { mode: "draw", ...t.config });
      widgetDiv.insertAdjacentHTML("beforeend", `<p class="field-hint">Menyimpan…</p>`);
      await simpanKeProyek(user, { [t.field]: dataUrl });
      await selesaikanMateri();
    }
  }

  async function renderExport(user) {
    const proyek = await ambilProyek(user);
    const gambarAkhir = proyek.finishing || proyek.background || proyek.lineArt || proyek.warna || proyek.storyboard || proyek.komposisi || proyek.ekspresi || null;

    const ringkasan = document.createElement("div");
    ringkasan.innerHTML = `
      <div class="panel panel-alt" style="margin-bottom:16px;">
        <h3 style="margin-top:0;">Ringkasan proyek komikmu</h3>
        <p style="margin:0 0 6px;"><strong>Ide cerita:</strong> ${proyek.ide || "(belum diisi)"}</p>
        <p style="margin:0 0 6px;"><strong>Karakter:</strong> ${proyek.karakter || "(belum diisi)"}</p>
        <p style="margin:0 0 6px;"><strong>Alur:</strong> ${proyek.alur ? `${proyek.alur.awal || "-"} → ${proyek.alur.tengah || "-"} → ${proyek.alur.akhir || "-"}` : "(belum diisi)"}</p>
        <p style="margin:0 0 6px;"><strong>Jumlah panel:</strong> ${proyek.jumlahPanel || "(belum dipilih)"}</p>
        <p style="margin:0;"><strong>Dialog:</strong> ${proyek.dialog?.dialog1 || "-"}${proyek.dialog?.dialog2 ? " / " + proyek.dialog.dialog2 : ""}</p>
      </div>
    `;
    tugasWrap.appendChild(ringkasan);

    if (gambarAkhir) {
      const imgWrap = document.createElement("div");
      imgWrap.className = "zoom-wrap";
      imgWrap.style.maxWidth = "420px";
      imgWrap.innerHTML = `<img src="${gambarAkhir}" alt="Hasil akhir komik" /><span class="zoom-hint">🔍 zoom</span>`;
      tugasWrap.appendChild(imgWrap);
      pasangZoom(imgWrap, imgWrap.querySelector("img"));

      const btnSimpan = document.createElement("button");
      btnSimpan.type = "button";
      btnSimpan.className = "btn btn-primary";
      btnSimpan.style.cssText = "width:auto; padding:12px 22px; margin-top:14px;";
      btnSimpan.textContent = "Simpan sebagai Komik Selesai 🎉";
      btnSimpan.addEventListener("click", async () => {
        btnSimpan.disabled = true;
        btnSimpan.textContent = "Menyimpan…";
        try {
          const panelCount = parseInt(proyek.jumlahPanel, 10) || 1;
          await addDoc(collection(db, "users", user.uid, "karya"), {
            judul: proyek.ide ? proyek.ide.slice(0, 60) : "Komik Pertamaku",
            panelCount,
            status: "selesai",
            dataUrl: gambarAkhir,
            dibuatPada: serverTimestamp()
          });
          await selesaikanMateri();
        } catch (err) {
          console.error("Gagal menyimpan karya:", err);
          btnSimpan.disabled = false;
          btnSimpan.textContent = "Gagal, coba lagi";
        }
      });
      tugasWrap.appendChild(btnSimpan);
    } else {
      const peringatan = document.createElement("p");
      peringatan.className = "field-hint";
      peringatan.textContent = "Kamu belum menggambar apa pun di level-level sebelumnya (Ekspresi/Storyboard/Line Art/Warna/Background/Finishing). Selesaikan minimal satu level menggambar dulu sebelum export.";
      tugasWrap.appendChild(peringatan);
    }
  }

  // =======================================================
  // Selesai (dipakai kedua jalur)
  // =======================================================
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
    if (kuisArea) kuisArea.hidden = true;
    if (tugasArea) tugasArea.hidden = true;
    doneMsg.hidden = false;
    siapkanTombolLanjut();
  }

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
      btnLanjut.textContent = "Komikmu selesai! Lihat di Komik Saya 📁";
      btnLanjut.href = "komik-saya.html";
    }
  }
}

onAuthStateChanged(auth, (user) => {
  if (!user) window.location.href = "index.html";
});
