// =========================================================
// KOMIK STRIP STUDIO — Data Materi: Clip Studio Paint
// =========================================================
// Edit isi array ini untuk mengubah konten materi.
// Setiap level punya: id, judul, ringkasan, ikon, langkah[]
// Setiap langkah punya: judul, pahami (penjelasan singkat)
// checklist: daftar pernyataan "Saya sudah bisa ..."
// =========================================================

export const CSP_LEVELS = [
  {
    id: 1,
    judul: "Mengenal Clip Studio Paint",
    ikon: "🖥️",
    ringkasan: "Apa itu Clip Studio Paint dan bagian-bagian tampilannya.",
    langkah: [
      { judul: "Apa itu Clip Studio Paint?", pahami: "Clip Studio Paint adalah aplikasi untuk menggambar digital dan membuat komik. Dengan aplikasi ini kamu bisa membuat garis, mewarnai, dan menyusun panel komik di satu tempat." },
      { judul: "Mengenal tampilan utama", pahami: "Ada beberapa bagian penting: Menu (baris perintah di atas), Toolbar (kumpulan alat gambar), Canvas (kertas gambar), Navigator (peta kecil gambar), Layer (susunan lapisan gambar), Color (pemilih warna), dan Tool Property (pengaturan alat yang dipilih)." }
    ],
    checklist: [
      "Saya tahu apa itu Clip Studio Paint",
      "Saya bisa menunjukkan Toolbar, Canvas, Layer, dan Color di layar"
    ]
  },
  {
    id: 2,
    judul: "Membuat Canvas",
    ikon: "📄",
    ringkasan: "Langkah-langkah membuat lembar kerja baru.",
    langkah: [
      { judul: "Buka Clip Studio Paint", pahami: "Jalankan aplikasi Clip Studio Paint di komputer." },
      { judul: "Pilih New", pahami: "Klik menu File, lalu pilih New untuk membuat file baru." },
      { judul: "Pilih ukuran canvas", pahami: "Pilih ukuran kertas yang sesuai, misalnya ukuran komik strip." },
      { judul: "Masukkan ukuran", pahami: "Isi lebar dan tinggi canvas sesuai kebutuhan." },
      { judul: "Klik Create", pahami: "Klik tombol Create untuk membuka canvas baru siap gambar." }
    ],
    checklist: [
      "Saya bisa membuat canvas baru dari awal sampai selesai"
    ]
  },
  {
    id: 3,
    judul: "Mengenal Tool",
    ikon: "🖊️",
    ringkasan: "Pen/Brush, Eraser, Move, dan Transform.",
    langkah: [
      { judul: "Pen / Brush", pahami: "Pelajari cara memilih brush, mengubah ukurannya, dan membuat garis tebal maupun tipis." },
      { judul: "Eraser", pahami: "Pelajari cara memilih eraser, menghapus bagian gambar, dan mengubah ukuran eraser." },
      { judul: "Move", pahami: "Pelajari cara memindahkan objek dan menggeser gambar di canvas." },
      { judul: "Transform", pahami: "Pelajari cara memperbesar, memperkecil, dan memutar objek." }
    ],
    checklist: [
      "Saya bisa memakai Brush untuk membuat garis tebal dan tipis",
      "Saya bisa memakai Eraser",
      "Saya bisa memindahkan dan memutar objek dengan Move/Transform"
    ]
  },
  {
    id: 4,
    judul: "Belajar Layer",
    ikon: "🗂️",
    ringkasan: "Membuat, menghapus, dan mengatur layer.",
    langkah: [
      { judul: "Layer itu apa?", pahami: "Layer seperti lembar plastik transparan yang ditumpuk: Background di bawah, lalu Character, Line Art, dan Color di atasnya. Kamu bisa mengedit satu layer tanpa mengganggu layer lain." },
      { judul: "Mengelola layer", pahami: "Pelajari cara membuat layer baru, menghapus layer, mengubah nama layer, memindahkan posisi layer, menyembunyikan/menampilkan layer (hide/show), dan mengatur opacity." }
    ],
    checklist: [
      "Saya bisa membuat dan menghapus layer",
      "Saya bisa mengubah urutan dan opacity layer"
    ]
  },
  {
    id: 5,
    judul: "Belajar Menggambar",
    ikon: "✏️",
    ringkasan: "Dari garis sederhana sampai karakter sederhana.",
    langkah: [
      { judul: "Garis", pahami: "Latihan membuat garis lurus dan lengkung." },
      { judul: "Lingkaran", pahami: "Latihan membuat bentuk lingkaran sebagai dasar kepala karakter." },
      { judul: "Kotak", pahami: "Latihan membuat bentuk kotak sebagai dasar badan/objek." },
      { judul: "Bentuk kepala", pahami: "Gabungkan lingkaran dan garis bantu untuk membuat bentuk kepala." },
      { judul: "Wajah", pahami: "Tambahkan mata, hidung, dan mulut sederhana pada bentuk kepala." },
      { judul: "Karakter sederhana", pahami: "Gabungkan semua bentuk dasar menjadi satu karakter sederhana." }
    ],
    checklist: [
      "Saya bisa menggambar bentuk dasar (garis, lingkaran, kotak)",
      "Saya bisa menggambar karakter sederhana dari bentuk dasar"
    ]
  },
  {
    id: 6,
    judul: "Line Art",
    ikon: "🖋️",
    ringkasan: "Membuat garis bersih dan rapi.",
    langkah: [
      { judul: "Garis bersih", pahami: "Pelajari cara membuat garis bersih, mengatur ukuran brush, dan memakai stabilisasi garis agar tidak bergetar." },
      { judul: "Outline & perbaikan", pahami: "Pelajari cara membuat outline karakter dan memperbaiki garis yang kurang rapi." }
    ],
    checklist: [
      "Saya bisa membuat outline karakter dengan garis rapi"
    ]
  },
  {
    id: 7,
    judul: "Mewarnai",
    ikon: "🎨",
    ringkasan: "Memilih warna dan mewarnai karakter.",
    langkah: [
      { judul: "Memilih warna", pahami: "Pelajari cara memakai color wheel untuk memilih warna." },
      { judul: "Mengisi warna", pahami: "Pelajari cara memakai Fill Tool untuk membuat warna dasar." },
      { judul: "Shading sederhana", pahami: "Tambahkan bayangan sederhana agar karakter terlihat lebih hidup." }
    ],
    checklist: [
      "Saya bisa mewarnai karakter dengan Fill Tool",
      "Saya bisa menambahkan shading sederhana"
    ]
  },
  {
    id: 8,
    judul: "Background",
    ikon: "🏞️",
    ringkasan: "Membuat latar sederhana: kamar, sekolah, rumah, taman.",
    langkah: [
      { judul: "Bentuk sederhana dulu", pahami: "Mulai dari bentuk kotak dan garis sederhana untuk membuat kamar, sekolah, rumah, atau taman." }
    ],
    checklist: [
      "Saya bisa membuat satu background sederhana"
    ]
  },
  {
    id: 9,
    judul: "Teks dan Balon Komik",
    ikon: "💬",
    ringkasan: "Text Tool dan balon dialog.",
    langkah: [
      { judul: "Text Tool", pahami: "Pelajari cara membuat teks, memilih font, dan mengatur ukuran." },
      { judul: "Balon dialog", pahami: "Pelajari cara membuat balon dialog dan menempatkannya di dekat karakter yang bicara. Contoh: Karakter berkata \"Halo!\"" }
    ],
    checklist: [
      "Saya bisa membuat teks dengan Text Tool",
      "Saya bisa membuat balon dialog"
    ]
  },
  {
    id: 10,
    judul: "Mengenal Fitur Komik",
    ikon: "🧩",
    ringkasan: "Panel, Frame Border, Balloon, Ruler, dan lainnya.",
    langkah: [
      { judul: "Fitur-fitur komik", pahami: "Kenalan dengan Panel, Frame Border, Balloon, Text, Ruler, Layer, Perspective, dan Tone (jika diperlukan)." }
    ],
    checklist: [
      "Saya tahu fungsi Panel, Frame Border, dan Balloon"
    ]
  },
  {
    id: 11,
    judul: "Membuat Panel Komik",
    ikon: "🔲",
    ringkasan: "Dari 1 panel sampai 4 panel.",
    langkah: [
      { judul: "1 panel", pahami: "Latihan membuat 1 panel komik." },
      { judul: "2 panel", pahami: "Latihan menyusun 2 panel berurutan." },
      { judul: "3 panel", pahami: "Latihan menyusun 3 panel berurutan." },
      { judul: "4 panel", pahami: "Latihan menyusun 4 panel dan memahami urutan cerita." }
    ],
    checklist: [
      "Saya bisa menyusun panel komik 1 sampai 4 panel"
    ]
  },
  {
    id: 12,
    judul: "Latihan Komik Pertama",
    ikon: "📗",
    ringkasan: "Membuat komik sederhana: 1 karakter, 1 background, 2 panel, 2 dialog.",
    langkah: [
      { judul: "Contoh tema: Pensilku Hilang", pahami: "Panel 1: \"Di mana pensilku?\" — Panel 2: \"Oh, ternyata ada di meja!\" Buat komik sederhana dengan 1 karakter, 1 background, 2 panel, dan 2 dialog." }
    ],
    checklist: [
      "Saya berhasil membuat komik 2 panel pertama saya"
    ]
  }
];
