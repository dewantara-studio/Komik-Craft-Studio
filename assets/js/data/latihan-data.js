// =========================================================
// KOMIK STRIP STUDIO — Data Latihan Interaktif
// =========================================================
// Sama seperti csp-levels.js/komik-levels.js — edit array ini
// untuk mengubah instruksi latihan. Field "gambar" opsional,
// taruh filenya di assets/img/latihan-csp/ atau
// assets/img/latihan-komik/.
// =========================================================

export const LATIHAN_CSP = [
  {
    nama: "Brush",
    ikon: "🖊️",
    instruksi: "Buat canvas baru kosong. Pilih Brush di Toolbar, lalu gambar 5 garis berdampingan dengan ukuran brush berbeda-beda (dari paling kecil ke paling besar, lihat pengaturan Size di Tool Property). Perhatikan bagaimana ketebalan garis berubah."
  },
  {
    nama: "Eraser",
    ikon: "🧽",
    instruksi: "Gambar satu bentuk bebas dengan Brush, lalu pakai Eraser untuk menghapus sebagian kecil garis itu tanpa menghapus seluruhnya. Coba juga ubah ukuran Eraser dan rasakan bedanya saat menghapus detail kecil vs area luas."
  },
  {
    nama: "Layer",
    ikon: "🗂️",
    instruksi: "Buat 3 layer baru dengan nama berbeda (misalnya 'Sketsa', 'Line Art', 'Warna'). Gambar bentuk sederhana di masing-masing layer dengan warna berbeda, lalu latihan menyembunyikan (hide) satu layer dan mengubah urutan tumpukannya."
  },
  {
    nama: "Selection",
    ikon: "🔲",
    instruksi: "Gambar beberapa bentuk di canvas. Pakai Selection Tool untuk menyeleksi salah satu bentuk saja, lalu coba pindahkan hanya bentuk yang terseleksi itu tanpa mengganggu bentuk lain di sekitarnya."
  },
  {
    nama: "Transform",
    ikon: "🔄",
    instruksi: "Gambar satu bentuk sederhana (misalnya bintang atau kotak). Seleksi bentuk itu, lalu pakai Transform untuk memperbesarnya 2x, memperkecilnya lagi, dan memutarnya 45 derajat."
  },
  {
    nama: "Color",
    ikon: "🎨",
    instruksi: "Buat 5 kotak kecil berdampingan, lalu warnai masing-masing dengan warna berbeda memakai color wheel di Color Panel. Coba juga buat gradasi terang-gelap dari satu warna yang sama."
  },
  {
    nama: "Text",
    ikon: "🔤",
    instruksi: "Ketik namamu memakai Text Tool. Coba ganti font-nya, perbesar ukurannya, lalu ubah perataannya (rata kiri, tengah, kanan) lewat Tool Property."
  }
];

export const LATIHAN_KOMIK = [
  {
    nama: "Ekspresi",
    ikon: "😊",
    instruksi: "Gambar satu karakter yang sama sebanyak 4 kali berdampingan. Beri tiap salinan ekspresi berbeda: senang, sedih, kaget, marah — tanpa mengubah bentuk dasar wajahnya."
  },
  {
    nama: "Karakter",
    ikon: "🧑‍🎨",
    instruksi: "Rancang satu karakter baru (boleh selain karakter utamamu) lengkap dengan 2 ciri khas yang mudah dikenali, seperti Level 2 di materi Belajar Komik."
  },
  {
    nama: "Panel",
    ikon: "🔲",
    instruksi: "Buat satu halaman kosong berisi 4 kotak panel dengan ukuran berbeda-beda (jangan semuanya sama besar) — latihan ini murni soal tata letak, tidak perlu diisi gambar dulu."
  },
  {
    nama: "Storyboard",
    ikon: "🗒️",
    instruksi: "Ambil ide cerita bebas (boleh sangat sederhana), lalu buat storyboard 3 kotak berisi sketsa sangat kasar — jangan pikirkan kerapian, fokus ke alur ceritanya saja."
  },
  {
    nama: "Dialog",
    ikon: "💬",
    instruksi: "Ambil satu panel dari latihan Panel di atas, tambahkan satu balon dialog berisi kalimat pendek (maksimal 6 kata) yang sesuai dengan situasi di panel itu."
  },
  {
    nama: "Warna",
    ikon: "🎨",
    instruksi: "Ambil karakter dari latihan Karakter di atas, tentukan palet warna tetapnya (warna kulit, rambut, baju), lalu warnai karakter itu secara konsisten."
  },
  {
    nama: "Background",
    ikon: "🏞️",
    instruksi: "Pilih satu lokasi (kamar, sekolah, rumah, atau taman) dan gambar background sangat sederhana untuk lokasi itu, memakai bentuk-bentuk dasar seperti di Level 8 materi Clip Studio Paint."
  }
];
