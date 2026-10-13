// =========================================================
// KOMIK STRIP STUDIO — Komik Studio: editor sederhana
// =========================================================
// CATATAN JUJUR: Editor ini editor LATIHAN sederhana di dalam
// browser (canvas HTML5), bukan pengganti Clip Studio Paint.
// Hasil karya disimpan sebagai gambar (base64) langsung di
// Firestore. Untuk komik yang lebih besar/detail, pindahkan
// penyimpanan gambar ke Firebase Storage.
//
// STRUKTUR KANVAS:
// - "base"    : kanvas tersembunyi berisi goresan Brush/Eraser + garis panel
// - "objects" : daftar Teks & Balon dialog (BUKAN dicap ke gambar), jadi
//               bisa digeser, diubah lebar/tinggi/ukuran huruf, dan
//               isinya diedit lagi kapan saja.
// Tiap render: latar putih -> base -> semua objek -> kotak seleksi.
// =========================================================
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const canvas = document.getElementById("studio-canvas");
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

// Panel properti objek (teks/balon terpilih)
const objPanel = document.getElementById("obj-panel");
const objJudul = document.getElementById("obj-judul");
const objText = document.getElementById("obj-text");
const objSize = document.getElementById("obj-size");
const objColor = document.getElementById("obj-color");
const objTailField = document.getElementById("obj-tail-field");
const objTail = document.getElementById("obj-tail");
const objHapus = document.getElementById("obj-hapus");

if (canvas) init();

function init() {
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  // Kanvas tersembunyi untuk goresan. willReadFrequently: true karena
  // sering dibaca ulang (getImageData) untuk fitur Undo/Redo.
  const base = document.createElement("canvas");
  base.width = W;
  base.height = H;
  const bctx = base.getContext("2d", { willReadFrequently: true });

  let tool = "brush";
  let objects = [];
  let selectedId = null;
  let nextId = 1;
  let history = [];
  let histIdx = -1;
  let lastPanel = Number(panelSelect?.value || 1);
  let aksi = null; // aksi pointer yang sedang berjalan
  const HS = 14;   // setengah ukuran pegangan (handle), dalam piksel kanvas

  // ---------- Util ----------
  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }
  function pilihan() { return objects.find((o) => o.id === selectedId) || null; }
  function posisi(e) {
    const r = canvas.getBoundingClientRect();
    return { x: (e.clientX - r.left) * (W / r.width), y: (e.clientY - r.top) * (H / r.height) };
  }
  function luminans(hex) {
    const n = parseInt(hex.slice(1), 16);
    const r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    return (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  }

  // ---------- Kanvas dasar (garis panel) ----------
  function resetBase(count) {
    bctx.globalCompositeOperation = "source-over";
    bctx.fillStyle = "#ffffff";
    bctx.fillRect(0, 0, W, H);
    bctx.strokeStyle = "#1C1B19";
    bctx.lineWidth = 4;
    bctx.strokeRect(2, 2, W - 4, H - 4);
    if (count === 2) {
      bctx.beginPath(); bctx.moveTo(W / 2, 4); bctx.lineTo(W / 2, H - 4); bctx.stroke();
    } else if (count === 3) {
      for (let i = 1; i < 3; i++) {
        bctx.beginPath(); bctx.moveTo((W / 3) * i, 4); bctx.lineTo((W / 3) * i, H - 4); bctx.stroke();
      }
    } else if (count === 4) {
      bctx.beginPath();
      bctx.moveTo(W / 2, 4); bctx.lineTo(W / 2, H - 4);
      bctx.moveTo(4, H / 2); bctx.lineTo(W - 4, H / 2);
      bctx.stroke();
    }
  }

  // ---------- Histori (Undo/Redo) ----------
  // Tiap entri = { base: ImageData, objects: [...] }. Kalau cuma objek
  // yang berubah, ImageData base dipakai ulang (hemat memori).
  function pushHistory(baseBerubah) {
    history = history.slice(0, histIdx + 1);
    const prev = history[histIdx];
    const baseData = (baseBerubah || !prev) ? bctx.getImageData(0, 0, W, H) : prev.base;
    history.push({ base: baseData, objects: JSON.parse(JSON.stringify(objects)) });
    histIdx = history.length - 1;
    if (history.length > 30) { history.shift(); histIdx--; }
  }
  function pulihkan(idx) {
    const h = history[idx];
    if (!h) return;
    bctx.putImageData(h.base, 0, 0);
    objects = JSON.parse(JSON.stringify(h.objects));
    if (!objects.some((o) => o.id === selectedId)) selectedId = null;
    histIdx = idx;
    syncPanel();
    render();
  }
  function resetSemua(count) {
    objects = [];
    selectedId = null;
    resetBase(count);
    history = [];
    histIdx = -1;
    pushHistory(true);
    syncPanel();
    render();
  }

  // ---------- Menggambar teks & balon ----------
  function bungkusTeks(teks, lebarMaks, ukuran) {
    ctx.font = `600 ${ukuran}px "Work Sans", sans-serif`;
    const baris = [];
    String(teks).split("\n").forEach((par) => {
      let cur = "";
      par.split(" ").forEach((kata) => {
        const coba = cur ? cur + " " + kata : kata;
        if (!cur || ctx.measureText(coba).width <= lebarMaks) cur = coba;
        else { baris.push(cur); cur = kata; }
      });
      baris.push(cur);
    });
    return baris;
  }

  function gambarBalon(o) {
    const cx = o.x + o.w / 2, cy = o.y + o.h / 2, rx = o.w / 2, ry = o.h / 2;
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#1C1B19";
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    if (o.tail === "tanpa") return;
    const kiri = o.tail !== "kanan";
    const a1 = (kiri ? 100 : 80) * Math.PI / 180;
    const a2 = (kiri ? 130 : 50) * Math.PI / 180;
    const p1 = { x: cx + rx * Math.cos(a1), y: cy + ry * Math.sin(a1) };
    const p2 = { x: cx + rx * Math.cos(a2), y: cy + ry * Math.sin(a2) };
    const tip = { x: cx + (kiri ? -0.7 : 0.7) * rx, y: cy + ry + Math.min(40, o.h * 0.35) };
    const in1 = { x: p1.x + (cx - p1.x) * 0.12, y: p1.y + (cy - p1.y) * 0.12 };
    const in2 = { x: p2.x + (cx - p2.x) * 0.12, y: p2.y + (cy - p2.y) * 0.12 };
    // isi putih (menutup garis oval di pangkal ekor), lalu garis kedua sisi ekor
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y); ctx.lineTo(tip.x, tip.y); ctx.lineTo(p2.x, p2.y);
    ctx.lineTo(in2.x, in2.y); ctx.lineTo(in1.x, in1.y);
    ctx.closePath();
    ctx.fillStyle = "#ffffff";
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(p1.x, p1.y); ctx.lineTo(tip.x, tip.y); ctx.lineTo(p2.x, p2.y);
    ctx.stroke();
  }

  function gambarObjek(o) {
    ctx.save();
    const balon = o.type === "balloon";
    if (balon) gambarBalon(o);

    const area = balon
      ? { x: o.x + o.w * 0.15, y: o.y + o.h * 0.15, w: o.w * 0.7, h: o.h * 0.7 }
      : { x: o.x + 6, y: o.y + 6, w: o.w - 12, h: o.h - 12 };
    const lh = o.size * 1.2;
    const baris = bungkusTeks(o.text, Math.max(area.w, 10), o.size);
    const tinggi = baris.length * lh;
    const y0 = balon ? area.y + (area.h - tinggi) / 2 : area.y;
    const tx = balon ? area.x + area.w / 2 : area.x;

    ctx.font = `600 ${o.size}px "Work Sans", sans-serif`;
    ctx.textBaseline = "top";
    ctx.textAlign = balon ? "center" : "left";
    ctx.lineJoin = "round";
    const halo = luminans(o.color) < 0.5 ? "#ffffff" : "#000000";

    baris.forEach((b, i) => {
      const y = y0 + i * lh;
      if (!balon) {
        // lingkar tipis berlawanan warna supaya teks tetap terbaca di atas gambar
        ctx.lineWidth = Math.max(3, o.size / 5);
        ctx.strokeStyle = halo;
        ctx.strokeText(b, tx, y);
      }
      ctx.fillStyle = o.color;
      ctx.fillText(b, tx, y);
    });
    ctx.restore();
  }

  function pegangan(o) {
    return {
      se: { x: o.x + o.w, y: o.y + o.h },
      e: { x: o.x + o.w, y: o.y + o.h / 2 },
      s: { x: o.x + o.w / 2, y: o.y + o.h }
    };
  }

  function gambarSeleksi(o) {
    ctx.save();
    ctx.strokeStyle = "#3E7CB1";
    ctx.lineWidth = 2;
    ctx.setLineDash([6, 4]);
    ctx.strokeRect(o.x, o.y, o.w, o.h);
    ctx.setLineDash([]);
    const hs = pegangan(o);
    Object.values(hs).forEach((p) => {
      ctx.fillStyle = "#F4B740";
      ctx.strokeStyle = "#1C1B19";
      ctx.lineWidth = 2;
      ctx.fillRect(p.x - HS / 2, p.y - HS / 2, HS, HS);
      ctx.strokeRect(p.x - HS / 2, p.y - HS / 2, HS, HS);
    });
    ctx.restore();
  }

  function render(tampilSeleksi = true) {
    ctx.globalCompositeOperation = "source-over";
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);
    ctx.drawImage(base, 0, 0);
    objects.forEach(gambarObjek);
    const sel = pilihan();
    if (tampilSeleksi && sel) gambarSeleksi(sel);
  }

  // ---------- Hit test ----------
  function cekPegangan(o, p) {
    const hs = pegangan(o);
    for (const k of ["se", "e", "s"]) {
      if (Math.abs(p.x - hs[k].x) <= HS + 4 && Math.abs(p.y - hs[k].y) <= HS + 4) return k;
    }
    return null;
  }
  function cekObjek(p) {
    for (let i = objects.length - 1; i >= 0; i--) {
      const o = objects[i];
      if (p.x >= o.x && p.x <= o.x + o.w && p.y >= o.y && p.y <= o.y + o.h) return o;
    }
    return null;
  }

  // ---------- Alat ----------
  function setTool(t) {
    tool = t;
    toolButtons.forEach((b) => b.classList.toggle("active", b.dataset.tool === t));
    canvas.style.cursor = t === "select" ? "default" : "crosshair";
    if (t === "brush" || t === "eraser") {
      selectedId = null;
      syncPanel();
      render();
    }
  }

  function buatObjek(jenis, p) {
    const d = jenis === "balloon"
      ? { w: 200, h: 110, size: 20, text: "Halo!", tail: "kiri" }
      : { w: 180, h: 56, size: 26, text: "Teks", tail: "tanpa" };
    const o = {
      id: nextId++,
      type: jenis,
      x: clamp(p.x - d.w / 2, 0, W - d.w),
      y: clamp(p.y - d.h / 2, 0, H - d.h),
      w: d.w, h: d.h, size: d.size, text: d.text, color: "#1C1B19", tail: d.tail
    };
    objects.push(o);
    selectedId = o.id;
    setTool("select");
    pushHistory(false);
    syncPanel();
    render();
    // langsung fokus ke kotak teks supaya bisa mengetik isinya
    setTimeout(() => { objText?.focus(); objText?.select(); }, 50);
  }

  function hapusTerpilih() {
    if (!selectedId) return;
    objects = objects.filter((o) => o.id !== selectedId);
    selectedId = null;
    pushHistory(false);
    syncPanel();
    render();
  }

  // ---------- Panel properti ----------
  function syncPanel() {
    if (!objPanel) return;
    const o = pilihan();
    objPanel.hidden = !o;
    if (!o) return;
    objJudul.textContent = o.type === "balloon" ? "💬 Balon dialog terpilih" : "🔤 Teks terpilih";
    if (document.activeElement !== objText) objText.value = o.text;
    objSize.value = o.size;
    objColor.value = o.color;
    objTailField.hidden = o.type !== "balloon";
    objTail.value = o.tail;
  }

  objText?.addEventListener("input", () => { const o = pilihan(); if (!o) return; o.text = objText.value; render(); });
  objText?.addEventListener("change", () => pushHistory(false));
  objSize?.addEventListener("input", () => { const o = pilihan(); if (!o) return; o.size = Number(objSize.value); render(); });
  objSize?.addEventListener("change", () => pushHistory(false));
  objColor?.addEventListener("input", () => { const o = pilihan(); if (!o) return; o.color = objColor.value; render(); });
  objColor?.addEventListener("change", () => pushHistory(false));
  objTail?.addEventListener("change", () => { const o = pilihan(); if (!o) return; o.tail = objTail.value; render(); pushHistory(false); });
  objHapus?.addEventListener("click", hapusTerpilih);

  document.addEventListener("keydown", (e) => {
    const tag = document.activeElement?.tagName;
    if ((e.key === "Delete") && selectedId && tag !== "TEXTAREA" && tag !== "INPUT" && tag !== "SELECT") {
      hapusTerpilih();
    }
  });

  // ---------- Pointer (mouse + sentuh) ----------
  function mulaiGaris(p) {
    const hapus = tool === "eraser";
    bctx.lineCap = "round";
    bctx.lineJoin = "round";
    bctx.lineWidth = Number(sizeInput?.value || 4);
    bctx.strokeStyle = colorInput?.value || "#1C1B19";
    bctx.globalCompositeOperation = hapus ? "destination-out" : "source-over";
    bctx.beginPath();
    bctx.moveTo(p.x, p.y);
    bctx.lineTo(p.x + 0.01, p.y);
    bctx.stroke();
    aksi = { jenis: "gambar", last: p };
    render();
  }

  function selesaiAksi() {
    if (!aksi) return;
    const a = aksi;
    aksi = null;
    if (a.jenis === "gambar") {
      bctx.globalCompositeOperation = "source-over";
      pushHistory(true);
    } else if ((a.jenis === "pindah" || a.jenis === "ubah") && a.berubah) {
      pushHistory(false);
    }
  }

  canvas.addEventListener("pointerdown", (e) => {
    if (e.button !== undefined && e.button > 0) return;
    const p = posisi(e);
    canvas.setPointerCapture?.(e.pointerId);

    if (tool === "brush" || tool === "eraser") { mulaiGaris(p); e.preventDefault(); return; }

    const sel = pilihan();
    if (sel) {
      const h = cekPegangan(sel, p);
      if (h) {
        aksi = { jenis: "ubah", handle: h, awal: { w: sel.w, h: sel.h }, mulai: p, berubah: false };
        e.preventDefault();
        return;
      }
    }
    const hit = cekObjek(p);
    if (hit) {
      selectedId = hit.id;
      setTool("select");
      syncPanel();
      render();
      aksi = { jenis: "pindah", ox: p.x - hit.x, oy: p.y - hit.y, mulai: p, berubah: false };
      e.preventDefault();
      return;
    }
    if (tool === "text" || tool === "balloon") { buatObjek(tool, p); e.preventDefault(); return; }

    selectedId = null;
    syncPanel();
    render();
  });

  canvas.addEventListener("pointermove", (e) => {
    const p = posisi(e);

    if (aksi?.jenis === "gambar") {
      bctx.beginPath();
      bctx.moveTo(aksi.last.x, aksi.last.y);
      bctx.lineTo(p.x, p.y);
      bctx.stroke();
      aksi.last = p;
      render();
      e.preventDefault();
      return;
    }

    const o = pilihan();
    if (aksi?.jenis === "pindah" && o) {
      if (Math.hypot(p.x - aksi.mulai.x, p.y - aksi.mulai.y) > 2) aksi.berubah = true;
      o.x = clamp(p.x - aksi.ox, -o.w + 30, W - 30);
      o.y = clamp(p.y - aksi.oy, -o.h + 30, H - 30);
      render();
      e.preventDefault();
      return;
    }
    if (aksi?.jenis === "ubah" && o) {
      const dx = p.x - aksi.mulai.x;
      const dy = p.y - aksi.mulai.y;
      if (Math.abs(dx) + Math.abs(dy) > 2) aksi.berubah = true;
      if (aksi.handle === "e" || aksi.handle === "se") o.w = Math.max(60, aksi.awal.w + dx);
      if (aksi.handle === "s" || aksi.handle === "se") o.h = Math.max(40, aksi.awal.h + dy);
      render();
      e.preventDefault();
      return;
    }

    // Ubah bentuk kursor saat hover (mode pilih)
    if (tool === "select") {
      const sel = pilihan();
      const h = sel ? cekPegangan(sel, p) : null;
      if (h === "se") canvas.style.cursor = "nwse-resize";
      else if (h === "e") canvas.style.cursor = "ew-resize";
      else if (h === "s") canvas.style.cursor = "ns-resize";
      else canvas.style.cursor = cekObjek(p) ? "move" : "default";
    }
  });

  canvas.addEventListener("pointerup", selesaiAksi);
  canvas.addEventListener("pointercancel", selesaiAksi);

  // Klik dua kali pada objek = langsung edit teksnya
  canvas.addEventListener("dblclick", (e) => {
    const hit = cekObjek(posisi(e));
    if (!hit) return;
    selectedId = hit.id;
    setTool("select");
    syncPanel();
    render();
    objText?.focus();
    objText?.select();
  });

  // ---------- Tombol-tombol ----------
  toolButtons.forEach((btn) => btn.addEventListener("click", () => setTool(btn.dataset.tool)));

  panelSelect?.addEventListener("change", () => {
    if (confirm("Mengganti jumlah panel akan mengosongkan canvas (termasuk teks & balon). Lanjutkan?")) {
      lastPanel = Number(panelSelect.value);
      resetSemua(lastPanel);
    } else {
      panelSelect.value = String(lastPanel);
    }
  });

  btnUndo?.addEventListener("click", () => { if (histIdx > 0) pulihkan(histIdx - 1); });
  btnRedo?.addEventListener("click", () => { if (histIdx < history.length - 1) pulihkan(histIdx + 1); });
  btnClear?.addEventListener("click", () => {
    if (confirm("Kosongkan seluruh canvas (termasuk teks & balon)?")) resetSemua(Number(panelSelect?.value || 1));
  });

  onAuthStateChanged(auth, (user) => {
    if (!user) window.location.href = "index.html";
  });

  btnSimpan?.addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) return;
    const judul = judulInput?.value.trim();
    if (!judul) { judulInput?.focus(); return; }

    btnSimpan.disabled = true;
    btnSimpan.textContent = "Menyimpan…";
    try {
      render(false); // tanpa kotak seleksi
      const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
      render(true);
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

  setTool("brush");
  resetSemua(lastPanel);
}
