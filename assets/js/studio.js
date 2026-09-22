// =========================================================
// KOMIK STRIP STUDIO — Komik Studio: editor sederhana (TAHAP 8/9)
// =========================================================
// CATATAN JUJUR: Editor ini editor LATIHAN sederhana di dalam
// browser (canvas HTML5), bukan pengganti Clip Studio Paint.
// Hasil karya disimpan sebagai gambar PNG (base64) langsung di
// Firestore agar TAHAP 1 ini tetap sederhana. Untuk komik yang
// lebih besar/detail, pindahkan penyimpanan gambar ke Firebase
// Storage (field thumbnailUrl sudah disiapkan namanya di README).
// =========================================================
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { doc, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const canvas = document.getElementById("studio-canvas");
const ctx = canvas?.getContext("2d");
const panelSelect = document.getElementById("panel-count");
const toolButtons = document.querySelectorAll("[data-tool]");
const colorInput = document.getElementById("tool-color");
const sizeInput = document.getElementById("tool-size");
const btnUndo = document.getElementById("btn-undo");
const btnRedo = document.getElementById("btn-redo");
const btnClear = document.getElementById("btn-clear");
const judulInput = document.getElementById("karya-judul");
const statusSelect = document.getElementById("karya-status");
const btnSimpan = document.getElementById("btn-simpan-karya");
const simpanMsg = document.getElementById("simpan-msg");

let tool = "brush";
let drawing = false;
let history = [];
let historyIdx = -1;

function drawPanelGuides(count) {
  if (!ctx) return;
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = "#1C1B19";
  ctx.lineWidth = 4;
  ctx.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);

  if (count === 2) {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 4);
    ctx.lineTo(canvas.width / 2, canvas.height - 4);
    ctx.stroke();
  } else if (count === 3) {
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo((canvas.width / 3) * i, 4);
      ctx.lineTo((canvas.width / 3) * i, canvas.height - 4);
      ctx.stroke();
    }
  } else if (count === 4) {
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 4);
    ctx.lineTo(canvas.width / 2, canvas.height - 4);
    ctx.moveTo(4, canvas.height / 2);
    ctx.lineTo(canvas.width - 4, canvas.height / 2);
    ctx.stroke();
  }
  simpanHistori();
}

function simpanHistori() {
  if (!ctx) return;
  history = history.slice(0, historyIdx + 1);
  history.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
  historyIdx = history.length - 1;
  if (history.length > 30) { history.shift(); historyIdx--; }
}

function pulihkanHistori(idx) {
  if (!ctx || idx < 0 || idx >= history.length) return;
  ctx.putImageData(history[idx], 0, 0);
  historyIdx = idx;
}

function posisi(e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
}

function mulaiGambar(e) {
  if (tool !== "brush" && tool !== "eraser") return;
  drawing = true;
  const { x, y } = posisi(e);
  ctx.beginPath();
  ctx.moveTo(x, y);
  e.preventDefault();
}
function lanjutGambar(e) {
  if (!drawing) return;
  const { x, y } = posisi(e);
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = Number(sizeInput?.value || 4);
  if (tool === "eraser") {
    ctx.globalCompositeOperation = "destination-out";
    ctx.strokeStyle = "rgba(0,0,0,1)";
  } else {
    ctx.globalCompositeOperation = "source-over";
    ctx.strokeStyle = colorInput?.value || "#1C1B19";
  }
  ctx.lineTo(x, y);
  ctx.stroke();
  e.preventDefault();
}
function selesaiGambar() {
  if (!drawing) return;
  drawing = false;
  ctx.globalCompositeOperation = "source-over";
  simpanHistori();
}

function klikCanvasUntukTeks(e) {
  if (tool !== "text" && tool !== "balloon") return;
  const { x, y } = posisi(e);
  const teks = prompt(tool === "balloon" ? "Tulis dialog balon:" : "Tulis teks:");
  if (!teks) return;

  ctx.font = "20px 'Work Sans', sans-serif";
  const lebar = ctx.measureText(teks).width;

  if (tool === "balloon") {
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#1C1B19";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(x + lebar / 2 + 8, y - 6, lebar / 2 + 24, 34, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 20);
    ctx.lineTo(x - 6, y + 42);
    ctx.lineTo(x + 30, y + 22);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
  }
  ctx.fillStyle = "#1C1B19";
  ctx.fillText(teks, x, y);
  simpanHistori();
}

if (canvas) {
  canvas.addEventListener("mousedown", mulaiGambar);
  canvas.addEventListener("mousemove", lanjutGambar);
  canvas.addEventListener("mouseup", selesaiGambar);
  canvas.addEventListener("mouseleave", selesaiGambar);
  canvas.addEventListener("touchstart", mulaiGambar, { passive: false });
  canvas.addEventListener("touchmove", lanjutGambar, { passive: false });
  canvas.addEventListener("touchend", selesaiGambar);
  canvas.addEventListener("click", klikCanvasUntukTeks);
}

toolButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    tool = btn.dataset.tool;
    toolButtons.forEach((b) => b.classList.toggle("active", b === btn));
  });
});

panelSelect?.addEventListener("change", () => {
  if (confirm("Mengganti jumlah panel akan mengosongkan canvas. Lanjutkan?")) {
    drawPanelGuides(Number(panelSelect.value));
  } else {
    panelSelect.value = String(historyIdx >= 0 ? panelSelect.dataset.last || 1 : 1);
  }
  panelSelect.dataset.last = panelSelect.value;
});

btnUndo?.addEventListener("click", () => pulihkanHistori(historyIdx - 1));
btnRedo?.addEventListener("click", () => pulihkanHistori(historyIdx + 1));
btnClear?.addEventListener("click", () => {
  if (confirm("Kosongkan seluruh canvas?")) drawPanelGuides(Number(panelSelect?.value || 1));
});

onAuthStateChanged(auth, (user) => {
  if (!user) { window.location.href = "index.html"; return; }
  if (canvas) drawPanelGuides(Number(panelSelect?.value || 1));
});

btnSimpan?.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user || !canvas) return;
  const judul = judulInput?.value.trim();
  if (!judul) { judulInput?.focus(); return; }

  btnSimpan.disabled = true;
  btnSimpan.textContent = "Menyimpan…";
  try {
    const dataUrl = canvas.toDataURL("image/png");
    await addDoc(collection(db, "users", user.uid, "karya"), {
      judul,
      panelCount: Number(panelSelect?.value || 1),
      status: statusSelect?.value || "draft",
      dataUrl,
      dibuatPada: serverTimestamp()
    });
    simpanMsg.hidden = false;
    simpanMsg.textContent = "Tersimpan ke Komik Saya! 🎉";
    setTimeout(() => { simpanMsg.hidden = true; }, 3000);
  } catch (err) {
    console.error("Gagal menyimpan karya:", err);
    simpanMsg.hidden = false;
    simpanMsg.textContent = "Gagal menyimpan. Coba lagi.";
  } finally {
    btnSimpan.disabled = false;
    btnSimpan.textContent = "Simpan Karya";
  }
});
