// =========================================================
// KOMIK STRIP STUDIO — Data Latihan Interaktif (auto-deteksi)
// =========================================================
// Tiap item punya "mode" yang menentukan jenis widget interaktif
// yang dipakai (lihat assets/js/latihan-canvas.js):
//   draw         - menggambar bebas (auto-selesai kalau cukup terisi)
//   erase        - menghapus bentuk (auto-selesai kalau cukup terhapus)
//   color-fill   - mewarnai kotak-kotak
//   text         - menempatkan teks/balon dialog
//   manipulate   - memindah/mengubah ukuran/memutar bentuk
//   layer-sim    - simulasi panel layer (tambah/toggle/urutkan)
// =========================================================

export const LATIHAN_CSP = [
  {
    nama: "Brush",
    ikon: "🖊️",
    instruksi: "Gambar bebas di canvas di bawah ini sampai areanya terisi cukup banyak — latihan mengontrol ketebalan garis.",
    mode: "draw",
    config: { minCoverage: 0.04 }
  },
  {
    nama: "Eraser",
    ikon: "🧽",
    instruksi: "Hapus sebagian besar bentuk merah di bawah ini memakai Eraser.",
    mode: "erase",
    config: { minErase: 0.35 }
  },
  {
    nama: "Layer",
    ikon: "🗂️",
    instruksi: "Coba simulasi panel layer di bawah: tambah layer baru, sembunyikan salah satu layer, lalu ubah urutannya.",
    mode: "layer-sim",
    config: { required: ["tambah", "toggle", "urutkan"] }
  },
  {
    nama: "Selection",
    ikon: "🔲",
    instruksi: "Geser bentuk di bawah ini ke posisi lain — latihan menyeleksi lalu memindahkan objek.",
    mode: "manipulate",
    config: { required: ["move"] }
  },
  {
    nama: "Transform",
    ikon: "🔄",
    instruksi: "Ubah ukuran bentuk di bawah (tarik titik kuning) dan putar (tarik titik merah).",
    mode: "manipulate",
    config: { required: ["resize", "rotate"] }
  },
  {
    nama: "Color",
    ikon: "🎨",
    instruksi: "Pilih warna berbeda-beda dan warnai kelima kotak di bawah ini.",
    mode: "color-fill",
    config: { jumlahKotak: 5 }
  },
  {
    nama: "Text",
    ikon: "🔤",
    instruksi: "Tulis namamu di kolom, lalu klik di canvas untuk menaruhnya.",
    mode: "text",
    config: {}
  }
];

export const LATIHAN_KOMIK = [
  {
    nama: "Ekspresi",
    ikon: "😊",
    instruksi: "Gambar satu ekspresi wajah bebas (senang/sedih/kaget/marah, pilih salah satu) di canvas di bawah.",
    mode: "draw",
    config: { minCoverage: 0.03 }
  },
  {
    nama: "Karakter",
    ikon: "🧑‍🎨",
    instruksi: "Gambar karakter sederhana bebas di canvas di bawah ini.",
    mode: "draw",
    config: { minCoverage: 0.04 }
  },
  {
    nama: "Panel",
    ikon: "🔲",
    instruksi: "Canvas di bawah sudah dibagi jadi 4 panel — coba gambar sesuatu di dalamnya, bebas apa saja.",
    mode: "draw",
    config: { minCoverage: 0.03, panelCount: 4 }
  },
  {
    nama: "Storyboard",
    ikon: "🗒️",
    instruksi: "Canvas di bawah sudah dibagi jadi 3 panel — sketsa kasar 3 momen cerita bebas, boleh coret-coretan.",
    mode: "draw",
    config: { minCoverage: 0.02, panelCount: 3 }
  },
  {
    nama: "Dialog",
    ikon: "💬",
    instruksi: "Tulis dialog pendek, lalu klik dekat karakter di canvas untuk menaruh balon dialognya.",
    mode: "text",
    config: { balloon: true }
  },
  {
    nama: "Warna",
    ikon: "🎨",
    instruksi: "Warnai keempat kotak di bawah ini dengan warna berbeda — latihan menentukan palet warna karakter.",
    mode: "color-fill",
    config: { jumlahKotak: 4 }
  },
  {
    nama: "Background",
    ikon: "🏞️",
    instruksi: "Gambar background sederhana bebas (kamar/sekolah/rumah/taman, pilih salah satu) di canvas di bawah.",
    mode: "draw",
    config: { minCoverage: 0.04 }
  }
];
