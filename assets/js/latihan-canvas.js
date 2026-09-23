// =========================================================
// KOMIK STRIP STUDIO — Widget Latihan Interaktif (canvas)
// =========================================================
// Semua latihan dikerjakan LANGSUNG di web ini (bukan di Clip
// Studio Paint asli), lalu terdeteksi otomatis kapan "selesai".
// mountLatihanWidget(container, config) me-render satu widget
// latihan ke dalam `container`, dan mengembalikan Promise yang
// resolve dengan dataURL (gambar bukti/snapshot) begitu sistem
// mendeteksi tugasnya selesai dikerjakan.
// =========================================================

function buatCanvas(w, h) {
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.style.cssText = "width:100%; max-width:420px; border:3px solid var(--line); border-radius:10px; background:#fff; touch-action:none; display:block; margin-bottom:10px;";
  return canvas;
}

function posisiCanvas(canvas, e) {
  const rect = canvas.getBoundingClientRect();
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  return { x: (clientX - rect.left) * scaleX, y: (clientY - rect.top) * scaleY };
}

function hitungCakupanTinta(ctx, w, h) {
  const data = ctx.getImageData(0, 0, w, h).data;
  let terisi = 0;
  const totalPiksel = w * h;
  // Sample tiap 4 piksel biar tidak berat
  for (let i = 0; i < data.length; i += 16) {
    // Piksel dianggap "terisi" kalau bukan putih polos (ada tinta di sana)
    if (data[i] < 245 || data[i + 1] < 245 || data[i + 2] < 245) terisi++;
  }
  return terisi / (totalPiksel / 4);
}

function gambarPanelGuide(ctx, w, h, count) {
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = "#1C1B19";
  ctx.lineWidth = 3;
  ctx.strokeRect(2, 2, w - 4, h - 4);
  if (count === 3) {
    for (let i = 1; i < 3; i++) {
      ctx.beginPath();
      ctx.moveTo((w / 3) * i, 2);
      ctx.lineTo((w / 3) * i, h - 2);
      ctx.stroke();
    }
  } else if (count === 4) {
    ctx.beginPath();
    ctx.moveTo(w / 2, 2); ctx.lineTo(w / 2, h - 2);
    ctx.moveTo(2, h / 2); ctx.lineTo(w - 2, h / 2);
    ctx.stroke();
  }
}

// ---------- MODE: draw (menggambar bebas) ----------
function modeDraw(container, config, selesai) {
  const W = 420, H = 300;
  const canvas = buatCanvas(W, H);
  const ctx = canvas.getContext("2d");
  if (config.panelCount) gambarPanelGuide(ctx, W, H, config.panelCount);
  else { ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, W, H); }

  const toolbar = document.createElement("div");
  toolbar.style.cssText = "display:flex; gap:8px; align-items:center; margin-bottom:10px; flex-wrap:wrap;";
  toolbar.innerHTML = `
    <input type="color" value="#1C1B19" style="width:38px; height:38px; border:2px solid var(--line); border-radius:8px; padding:2px;" />
    <input type="range" min="1" max="20" value="4" style="width:100px;" />
    <span style="font-size:0.8rem; color:var(--ink-soft);">Gambar sampai area terisi cukup</span>
  `;
  const colorInput = toolbar.querySelector("input[type=color]");
  const sizeInput = toolbar.querySelector("input[type=range]");
  container.append(toolbar, canvas);

  let drawing = false;
  let sudahSelesai = false;
  function mulai(e) { drawing = true; const { x, y } = posisiCanvas(canvas, e); ctx.beginPath(); ctx.moveTo(x, y); e.preventDefault(); }
  function lanjut(e) {
    if (!drawing) return;
    const { x, y } = posisiCanvas(canvas, e);
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.lineWidth = Number(sizeInput.value);
    ctx.strokeStyle = colorInput.value;
    ctx.lineTo(x, y); ctx.stroke();
    e.preventDefault();
  }
  function selesaiGaris() {
    if (!drawing) return;
    drawing = false;
    if (sudahSelesai) return;
    const cakupan = hitungCakupanTinta(ctx, W, H);
    if (cakupan >= (config.minCoverage || 0.03)) {
      sudahSelesai = true;
      selesai(canvas.toDataURL("image/jpeg", 0.7));
    }
  }
  canvas.addEventListener("mousedown", mulai);
  canvas.addEventListener("mousemove", lanjut);
  canvas.addEventListener("mouseup", selesaiGaris);
  canvas.addEventListener("mouseleave", selesaiGaris);
  canvas.addEventListener("touchstart", mulai, { passive: false });
  canvas.addEventListener("touchmove", lanjut, { passive: false });
  canvas.addEventListener("touchend", selesaiGaris);
}

// ---------- MODE: erase (menghapus bentuk) ----------
function modeErase(container, config, selesai) {
  const W = 420, H = 300;
  const canvas = buatCanvas(W, H);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#E8402C";
  ctx.beginPath();
  ctx.ellipse(W / 2, H / 2, 130, 90, 0, 0, Math.PI * 2);
  ctx.fill();

  const totalTerisiAwal = hitungCakupanTinta(ctx, W, H);

  const info = document.createElement("p");
  info.className = "field-hint";
  info.textContent = "Hapus bagian bentuk merah ini sampai sebagian besar hilang.";
  container.append(info, canvas);

  let drawing = false;
  let sudahSelesai = false;
  function mulai(e) { drawing = true; e.preventDefault(); }
  function hapus(e) {
    if (!drawing) return;
    const { x, y } = posisiCanvas(canvas, e);
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x, y, 18, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";
    e.preventDefault();
  }
  function selesaiHapus() {
    if (!drawing) return;
    drawing = false;
    if (sudahSelesai) return;
    const sisaTerisi = hitungCakupanTinta(ctx, W, H);
    const rasioTerhapus = 1 - (sisaTerisi / Math.max(totalTerisiAwal, 0.001));
    if (rasioTerhapus >= (config.minErase || 0.3)) {
      sudahSelesai = true;
      selesai(canvas.toDataURL("image/jpeg", 0.7));
    }
  }
  canvas.addEventListener("mousedown", mulai);
  canvas.addEventListener("mousemove", hapus);
  canvas.addEventListener("mouseup", selesaiHapus);
  canvas.addEventListener("mouseleave", selesaiHapus);
  canvas.addEventListener("touchstart", mulai, { passive: false });
  canvas.addEventListener("touchmove", hapus, { passive: false });
  canvas.addEventListener("touchend", selesaiHapus);
}

// ---------- MODE: color-fill (isi kotak dengan warna) ----------
function modeColorFill(container, config, selesai) {
  const jumlah = config.jumlahKotak || 5;
  const W = 420, H = 140;
  const canvas = buatCanvas(W, H);
  const ctx = canvas.getContext("2d");
  const lebarKotak = W / jumlah;
  const warnaKotak = new Array(jumlah).fill(null);

  function gambarUlang() {
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < jumlah; i++) {
      const x = i * lebarKotak;
      ctx.fillStyle = warnaKotak[i] || "#ffffff";
      ctx.fillRect(x + 6, 20, lebarKotak - 12, H - 40);
      ctx.strokeStyle = "#1C1B19";
      ctx.lineWidth = 3;
      ctx.strokeRect(x + 6, 20, lebarKotak - 12, H - 40);
    }
  }
  gambarUlang();

  const toolbar = document.createElement("div");
  toolbar.style.cssText = "display:flex; gap:8px; align-items:center; margin-bottom:10px;";
  toolbar.innerHTML = `
    <input type="color" value="#E8402C" style="width:38px; height:38px; border:2px solid var(--line); border-radius:8px; padding:2px;" />
    <span style="font-size:0.8rem; color:var(--ink-soft);">Pilih warna, lalu klik salah satu kotak untuk mewarnainya</span>
  `;
  const colorInput = toolbar.querySelector("input[type=color]");
  container.append(toolbar, canvas);

  let sudahSelesai = false;
  canvas.addEventListener("click", (e) => {
    if (sudahSelesai) return;
    const { x } = posisiCanvas(canvas, e);
    const idx = Math.floor(x / lebarKotak);
    if (idx < 0 || idx >= jumlah) return;
    warnaKotak[idx] = colorInput.value;
    gambarUlang();
    if (warnaKotak.every((w) => w)) {
      sudahSelesai = true;
      selesai(canvas.toDataURL("image/jpeg", 0.7));
    }
  });
}

// ---------- MODE: text (menempatkan teks / balon dialog) ----------
function modeText(container, config, selesai) {
  const W = 420, H = 260;
  const canvas = buatCanvas(W, H);
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, W, H);
  ctx.fillStyle = "#F1E9D8";
  ctx.beginPath();
  ctx.arc(W / 2, H / 2 + 30, 45, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = "#1C1B19"; ctx.lineWidth = 3; ctx.stroke();

  const info = document.createElement("p");
  info.className = "field-hint";
  info.textContent = config.balloon
    ? "Klik di area dekat karakter untuk menaruh balon dialog."
    : "Klik di canvas untuk menaruh teks.";
  const inputTeks = document.createElement("input");
  inputTeks.type = "text";
  inputTeks.placeholder = "Tulis teksnya di sini dulu...";
  inputTeks.style.cssText = "width:100%; max-width:420px; padding:10px 12px; border:2px solid var(--line); border-radius:8px; margin-bottom:10px; font-family:inherit;";
  container.append(info, inputTeks, canvas);

  let sudahSelesai = false;
  canvas.addEventListener("click", (e) => {
    if (sudahSelesai) return;
    const teks = inputTeks.value.trim();
    if (!teks) { inputTeks.focus(); return; }
    const { x, y } = posisiCanvas(canvas, e);

    if (config.balloon) {
      ctx.fillStyle = "#fff"; ctx.strokeStyle = "#1C1B19"; ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.ellipse(x, y, 70, 34, 0, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
    }
    ctx.fillStyle = "#1C1B19";
    ctx.font = "16px 'Work Sans', sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(teks, x, y + 5);

    sudahSelesai = true;
    inputTeks.disabled = true;
    selesai(canvas.toDataURL("image/jpeg", 0.7));
  });
}

// ---------- MODE: manipulate (pindah / ubah ukuran / putar) ----------
function modeManipulate(container, config, selesai) {
  const W = 420, H = 300;
  const canvas = buatCanvas(W, H);
  const ctx = canvas.getContext("2d");

  const shape = { cx: W / 2, cy: H / 2, w: 100, h: 70, rot: 0 };
  const awal = { cx: shape.cx, cy: shape.cy, w: shape.w, h: shape.h };
  const dicapai = { move: false, resize: false, rotate: false };
  const required = config.required || ["move"];

  function titikResize() {
    const lx = shape.w / 2, ly = shape.h / 2;
    return {
      x: shape.cx + lx * Math.cos(shape.rot) - ly * Math.sin(shape.rot),
      y: shape.cy + lx * Math.sin(shape.rot) + ly * Math.cos(shape.rot)
    };
  }
  function titikRotate() {
    const lx = 0, ly = -(shape.h / 2 + 30);
    return {
      x: shape.cx + lx * Math.cos(shape.rot) - ly * Math.sin(shape.rot),
      y: shape.cy + lx * Math.sin(shape.rot) + ly * Math.cos(shape.rot)
    };
  }

  function gambar() {
    ctx.fillStyle = "#fff"; ctx.fillRect(0, 0, W, H);
    ctx.save();
    ctx.translate(shape.cx, shape.cy);
    ctx.rotate(shape.rot);
    ctx.fillStyle = "#3E7CB1";
    ctx.strokeStyle = "#1C1B19"; ctx.lineWidth = 3;
    ctx.fillRect(-shape.w / 2, -shape.h / 2, shape.w, shape.h);
    ctx.strokeRect(-shape.w / 2, -shape.h / 2, shape.w, shape.h);
    ctx.restore();

    if (required.includes("resize")) {
      const p = titikResize();
      ctx.fillStyle = "#F4B740"; ctx.beginPath(); ctx.arc(p.x, p.y, 8, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
    if (required.includes("rotate")) {
      const p = titikRotate();
      ctx.strokeStyle = "#1C1B19"; ctx.beginPath(); ctx.moveTo(shape.cx, shape.cy); ctx.lineTo(p.x, p.y); ctx.stroke();
      ctx.fillStyle = "#E8402C"; ctx.beginPath(); ctx.arc(p.x, p.y, 8, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    }
  }
  gambar();

  const info = document.createElement("p");
  info.className = "field-hint";
  const label = { move: "geser bentuknya", resize: "tarik titik kuning untuk ubah ukuran", rotate: "tarik titik merah untuk memutar" };
  info.textContent = "Coba " + required.map((r) => label[r]).join(", ") + ".";
  container.append(info, canvas);

  let mode = null;
  let mulaiPos = null;
  let shapeAwalDrag = null;

  function jarak(a, b) { return Math.hypot(a.x - b.x, a.y - b.y); }

  canvas.addEventListener("mousedown", (e) => turunMouse(e));
  canvas.addEventListener("touchstart", (e) => turunMouse(e), { passive: false });
  function turunMouse(e) {
    const pos = posisiCanvas(canvas, e);
    if (required.includes("resize") && jarak(pos, titikResize()) < 16) mode = "resize";
    else if (required.includes("rotate") && jarak(pos, titikRotate()) < 16) mode = "rotate";
    else if (Math.abs(pos.x - shape.cx) < shape.w / 2 + 20 && Math.abs(pos.y - shape.cy) < shape.h / 2 + 20) mode = "move";
    else mode = null;
    mulaiPos = pos;
    shapeAwalDrag = { ...shape };
    if (mode) e.preventDefault();
  }
  canvas.addEventListener("mousemove", (e) => gerak(e));
  canvas.addEventListener("touchmove", (e) => gerak(e), { passive: false });
  function gerak(e) {
    if (!mode) return;
    const pos = posisiCanvas(canvas, e);
    if (mode === "move") {
      shape.cx = shapeAwalDrag.cx + (pos.x - mulaiPos.x);
      shape.cy = shapeAwalDrag.cy + (pos.y - mulaiPos.y);
    } else if (mode === "resize") {
      shape.w = Math.max(30, shapeAwalDrag.w + (pos.x - mulaiPos.x));
      shape.h = Math.max(30, shapeAwalDrag.h + (pos.y - mulaiPos.y));
    } else if (mode === "rotate") {
      shape.rot = Math.atan2(pos.y - shape.cy, pos.x - shape.cx) + Math.PI / 2;
    }
    gambar();
    e.preventDefault();
  }
  function lepas() {
    if (!mode) return;
    if (mode === "move" && jarak({ x: shape.cx, y: shape.cy }, { x: awal.cx, y: awal.cy }) > 15) dicapai.move = true;
    if (mode === "resize" && Math.abs(shape.w - awal.w) + Math.abs(shape.h - awal.h) > 15) dicapai.resize = true;
    if (mode === "rotate" && Math.abs(shape.rot) > 0.2) dicapai.rotate = true;
    mode = null;

    if (required.every((r) => dicapai[r])) {
      selesai(canvas.toDataURL("image/jpeg", 0.7));
    }
  }
  canvas.addEventListener("mouseup", lepas);
  canvas.addEventListener("mouseleave", lepas);
  canvas.addEventListener("touchend", lepas);
}

// ---------- MODE: layer-sim (simulasi panel layer) ----------
function modeLayerSim(container, config, selesai) {
  const required = config.required || ["tambah", "toggle", "urutkan"];
  const dicapai = { tambah: false, toggle: false, urutkan: false };
  let layers = [{ nama: "Layer 1", terlihat: true }];

  const info = document.createElement("p");
  info.className = "field-hint";
  info.textContent = "Coba: tambah layer baru, sembunyikan salah satu layer, lalu ubah urutannya.";

  const panel = document.createElement("div");
  panel.style.cssText = "border:2px solid var(--line); border-radius:10px; padding:12px; max-width:340px; background:var(--paper-alt);";

  const tombolTambah = document.createElement("button");
  tombolTambah.type = "button";
  tombolTambah.className = "btn btn-secondary";
  tombolTambah.style.cssText = "width:auto; padding:8px 14px; margin-bottom:10px;";
  tombolTambah.textContent = "+ Layer Baru";

  const daftarEl = document.createElement("div");

  function cekSelesai() {
    if (required.every((r) => dicapai[r])) {
      // Snapshot sederhana: gambar daftar layer ke canvas kecil sbg bukti
      const c = document.createElement("canvas");
      c.width = 320; c.height = 40 + layers.length * 34;
      const cx = c.getContext("2d");
      cx.fillStyle = "#fff"; cx.fillRect(0, 0, c.width, c.height);
      cx.fillStyle = "#1C1B19"; cx.font = "14px sans-serif";
      cx.fillText("Simulasi Layer Panel:", 10, 20);
      layers.forEach((l, i) => {
        cx.fillText(`${l.terlihat ? "👁" : "🚫"} ${l.nama}`, 10, 44 + i * 28);
      });
      selesai(c.toDataURL("image/jpeg", 0.8));
    }
  }

  function render() {
    daftarEl.innerHTML = "";
    layers.forEach((l, i) => {
      const row = document.createElement("div");
      row.style.cssText = "display:flex; align-items:center; gap:8px; padding:6px 0; border-bottom:1px solid var(--ink-soft);";
      row.innerHTML = `
        <button type="button" data-act="toggle" data-i="${i}" style="border:none; background:none; font-size:1.1rem; cursor:pointer;">${l.terlihat ? "👁" : "🚫"}</button>
        <span style="flex:1; font-size:0.9rem;">${l.nama}</span>
        <button type="button" data-act="naik" data-i="${i}" style="border:none; background:none; cursor:pointer;" ${i === 0 ? "disabled" : ""}>⬆</button>
        <button type="button" data-act="turun" data-i="${i}" style="border:none; background:none; cursor:pointer;" ${i === layers.length - 1 ? "disabled" : ""}>⬇</button>
      `;
      daftarEl.appendChild(row);
    });

    daftarEl.querySelectorAll("button[data-act]").forEach((b) => {
      b.addEventListener("click", () => {
        const i = Number(b.dataset.i);
        const act = b.dataset.act;
        if (act === "toggle") { layers[i].terlihat = !layers[i].terlihat; dicapai.toggle = true; }
        if (act === "naik" && i > 0) { [layers[i - 1], layers[i]] = [layers[i], layers[i - 1]]; dicapai.urutkan = true; }
        if (act === "turun" && i < layers.length - 1) { [layers[i + 1], layers[i]] = [layers[i], layers[i + 1]]; dicapai.urutkan = true; }
        render();
        cekSelesai();
      });
    });
  }

  tombolTambah.addEventListener("click", () => {
    layers.push({ nama: `Layer ${layers.length + 1}`, terlihat: true });
    dicapai.tambah = true;
    render();
    cekSelesai();
  });

  panel.append(tombolTambah, daftarEl);
  container.append(info, panel);
  render();
}

const MODE_MAP = {
  draw: modeDraw,
  erase: modeErase,
  "color-fill": modeColorFill,
  text: modeText,
  manipulate: modeManipulate,
  "layer-sim": modeLayerSim
};

export function mountLatihanWidget(container, config) {
  return new Promise((resolve) => {
    const fn = MODE_MAP[config.mode] || modeDraw;
    fn(container, config, resolve);
  });
}
