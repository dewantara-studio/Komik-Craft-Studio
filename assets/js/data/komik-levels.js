// =========================================================
// KOMIK STRIP STUDIO — Data Materi: Belajar Komik Strip
// =========================================================
// Sama seperti csp-levels.js: tambahkan field "gambar" di
// sebuah langkah untuk menampilkan gambar/contoh, taruh
// filenya di assets/img/materi-komik/. Lihat README.md.
// =========================================================

export const KOMIK_LEVELS = [
  {
    id: 1,
    judul: "Ide Cerita",
    ikon: "💡",
    ringkasan: "Menemukan ide cerita sederhana untuk komik strip.",
    langkah: [
      { judul: "Cari ide dari keseharian", pahami: "Ide cerita paling mudah datang dari kejadian sehari-hari: kehilangan barang, lupa PR, salah paham dengan teman, atau kejadian lucu di sekolah/rumah. Kamu tidak perlu ide yang rumit — cerita sederhana justru sering paling mudah dipahami pembaca dalam format komik strip pendek." },
      { judul: "Uji dengan satu kalimat", pahami: "Coba ringkas idemu jadi satu kalimat, misalnya: 'Seorang anak panik karena pensilnya hilang, ternyata ada di kantongnya sendiri.' Kalau kamu bisa menjelaskan idemu dalam satu kalimat, itu tanda idemu sudah cukup jelas untuk mulai dikembangkan." }
    ],
    kuis: [
      { pertanyaan: "Ide cerita komik strip paling mudah didapat dari mana?", pilihan: ["Kejadian sehari-hari yang sederhana", "Selalu harus dari film terkenal", "Tidak boleh dari pengalaman pribadi"], benar: 0 },
      { pertanyaan: "Kenapa baiknya ide cerita bisa diringkas jadi satu kalimat?", pilihan: ["Tanda idenya sudah cukup jelas untuk dikembangkan", "Supaya ceritanya jadi lebih panjang", "Supaya tidak perlu digambar"], benar: 0 }
    ]
  },
  {
    id: 2,
    judul: "Membuat Karakter",
    ikon: "🧑‍🎨",
    ringkasan: "Merancang tampilan karakter utama.",
    langkah: [
      { judul: "Tentukan ciri khas", pahami: "Pikirkan 2-3 ciri khas yang membuat karaktermu mudah dikenali, misalnya bentuk rambut unik, kacamata, topi favorit, atau warna baju khas. Ciri khas ini akan membantu pembaca langsung mengenali karaktermu di panel manapun." },
      { judul: "Sketsa dari beberapa sisi", pahami: "Coba gambar karaktermu dari depan dan agak menyamping. Ini membantu kamu memastikan proporsi wajah dan badannya konsisten, tidak berubah-ubah setiap kali digambar ulang." }
    ],
    kuis: [
      { pertanyaan: "Ciri khas pada karakter berguna untuk apa?", pilihan: ["Membuat pembaca mudah mengenali karakter di panel manapun", "Membuat karakter terlihat rumit", "Tidak ada gunanya"], benar: 0 },
      { pertanyaan: "Kenapa perlu sketsa karakter dari beberapa sisi (depan & samping)?", pilihan: ["Supaya proporsi tetap konsisten setiap digambar ulang", "Supaya karaktermu punya banyak baju", "Supaya lebih cepat selesai"], benar: 0 }
    ]
  },
  {
    id: 3,
    judul: "Ekspresi Karakter",
    ikon: "😊",
    ringkasan: "Menggambar berbagai ekspresi wajah.",
    langkah: [
      { judul: "Kenali bagian yang berubah", pahami: "Ekspresi wajah terutama dibentuk oleh tiga bagian: alis, mata, dan mulut. Perhatikan bagaimana ketiga bagian ini berubah bentuk saat kita senang, sedih, kaget, atau marah — misalnya alis naik saat kaget, atau ujung mulut turun saat sedih." },
      { judul: "Latihan 4 ekspresi dasar", pahami: "Gambar karakter yang sama dengan 4 ekspresi berbeda: senang, sedih, kaget, dan marah, dalam satu baris berdampingan. Latihan ini membantumu melihat langsung perbedaan bentuk alis-mata-mulut di tiap ekspresi." }
    ],
    kuis: [
      { pertanyaan: "Tiga bagian wajah yang paling menentukan ekspresi adalah?", pilihan: ["Alis, mata, dan mulut", "Telinga, rambut, dan leher", "Tangan, kaki, dan badan"], benar: 0 },
      { pertanyaan: "Latihan 4 ekspresi dasar bertujuan untuk apa?", pilihan: ["Melihat perbedaan bentuk alis-mata-mulut di tiap ekspresi", "Menghapus karakter lama", "Menentukan warna baju"], benar: 0 }
    ]
  },
  {
    id: 4,
    judul: "Membuat Alur Cerita",
    ikon: "🧵",
    ringkasan: "Menyusun awal, tengah, dan akhir cerita.",
    langkah: [
      { judul: "Tiga bagian cerita", pahami: "Cerita sederhana biasanya punya tiga bagian: Awal (perkenalan situasi), Tengah (muncul masalah/kejadian), dan Akhir (bagaimana masalah selesai atau apa reaksi akhirnya). Untuk komik strip pendek, bagian Tengah sering hanya satu kejadian singkat." },
      { judul: "Susun alurmu sendiri", pahami: "Ambil ide dari Level 1, lalu tuliskan tiga bagian itu dalam beberapa kata saja, misalnya: Awal = 'anak mencari pensil', Tengah = 'panik tidak ketemu', Akhir = 'ternyata ada di kantong'." }
    ],
    kuis: [
      { pertanyaan: "Tiga bagian dasar sebuah cerita adalah?", pilihan: ["Awal, Tengah, Akhir", "Judul, Nama, Tanggal", "Warna, Garis, Teks"], benar: 0 },
      { pertanyaan: "Di bagian 'Tengah' cerita, biasanya apa yang muncul?", pilihan: ["Masalah atau kejadian", "Ucapan terima kasih", "Daftar isi"], benar: 0 }
    ]
  },
  {
    id: 5,
    judul: "Storyboard",
    ikon: "🗒️",
    ringkasan: "Sketsa kasar urutan adegan.",
    langkah: [
      { judul: "Apa itu storyboard?", pahami: "Storyboard adalah sketsa sangat kasar (boleh coret-coretan, tidak perlu rapi) yang menunjukkan apa yang terjadi di tiap panel, sebelum kamu menggambar versi finalnya. Tujuannya supaya kamu bisa mengecek dulu apakah alur ceritanya sudah masuk akal." },
      { judul: "Buat storyboard 2-4 kotak", pahami: "Gambar kotak-kotak kecil (boleh di kertas coret atau layer terpisah di CSP), lalu sketsa sangat kasar apa yang terjadi di tiap kotak sesuai alur cerita dari Level 4. Jangan pikirkan detail gambar dulu, fokus ke: siapa ada di panel itu, sedang apa, dan dialog singkatnya apa." }
    ],
    kuis: [
      { pertanyaan: "Storyboard itu apa?", pilihan: ["Sketsa sangat kasar urutan adegan sebelum digambar final", "Gambar akhir yang sudah diwarnai", "Balon dialog karakter"], benar: 0 },
      { pertanyaan: "Kenapa storyboard tidak perlu rapi?", pilihan: ["Tujuannya cuma mengecek alur cerita masuk akal atau tidak", "Karena nanti akan dijual", "Karena harus dicetak"], benar: 0 }
    ]
  },
  {
    id: 6,
    judul: "Panel",
    ikon: "🔲",
    ringkasan: "Menentukan jumlah dan bentuk panel.",
    langkah: [
      { judul: "Pilih jumlah panel", pahami: "Berdasarkan storyboard, tentukan berapa panel yang dibutuhkan supaya cerita tersampaikan dengan jelas tanpa terasa buru-buru atau bertele-tele. Komik strip biasanya cukup 2-4 panel." },
      { judul: "Pertimbangkan ukuran panel", pahami: "Panel yang lebih besar biasanya dipakai untuk momen penting yang ingin ditonjolkan, sedangkan panel kecil cocok untuk momen singkat atau transisi. Kamu tidak harus membuat semua panel berukuran sama." }
    ],
    kuis: [
      { pertanyaan: "Untuk komik strip pendek, biasanya berapa panel yang cukup?", pilihan: ["2-4 panel", "20 panel", "Harus selalu 1 panel"], benar: 0 },
      { pertanyaan: "Panel besar biasanya dipakai untuk momen seperti apa?", pilihan: ["Momen penting yang ingin ditonjolkan", "Momen yang tidak penting", "Selalu di akhir cerita"], benar: 0 }
    ]
  },
  {
    id: 7,
    judul: "Komposisi",
    ikon: "🖼️",
    ringkasan: "Menata posisi karakter dan objek dalam panel.",
    langkah: [
      { judul: "Prioritaskan yang penting", pahami: "Pastikan elemen paling penting di tiap panel (biasanya wajah/ekspresi karakter) berada di posisi yang mudah dilihat, tidak terlalu di pinggir atau terpotong oleh tepi panel." },
      { judul: "Beri ruang bernapas", pahami: "Jangan memenuhi seluruh panel dengan objek — sisakan sedikit ruang kosong (biasa disebut 'negative space') supaya panel tidak terasa sesak dan pembaca bisa fokus ke elemen utamanya." }
    ],
    kuis: [
      { pertanyaan: "Elemen paling penting di panel sebaiknya diletakkan di posisi yang?", pilihan: ["Mudah dilihat, tidak terpotong tepi panel", "Selalu di pojok", "Sembunyi di belakang objek lain"], benar: 0 },
      { pertanyaan: "Apa itu 'negative space' dalam komposisi panel?", pilihan: ["Ruang kosong yang sengaja disisakan supaya tidak sesak", "Warna hitam pekat", "Kesalahan menggambar"], benar: 0 }
    ]
  },
  {
    id: 8,
    judul: "Dialog",
    ikon: "💬",
    ringkasan: "Menulis dialog singkat dan jelas.",
    langkah: [
      { judul: "Buat dialog sesingkat mungkin", pahami: "Dialog komik sebaiknya pendek — idealnya satu-dua kalimat pendek per balon. Pembaca membaca komik strip dengan cepat, jadi dialog panjang justru bisa membuat pembaca kehilangan fokus." },
      { judul: "Sesuaikan dengan karakter", pahami: "Perhatikan gaya bicara yang cocok dengan karaktermu — apakah dia formal, santai, atau suka bercanda? Konsistensi gaya bicara membuat karakter terasa lebih 'hidup' dan mudah dikenali walau tanpa melihat gambarnya." }
    ],
    kuis: [
      { pertanyaan: "Dialog komik idealnya berapa kalimat per balon?", pilihan: ["Satu-dua kalimat pendek", "Lebih dari lima kalimat", "Tidak boleh ada dialog"], benar: 0 },
      { pertanyaan: "Kenapa gaya bicara karakter perlu konsisten?", pilihan: ["Supaya karakter terasa 'hidup' dan mudah dikenali", "Supaya ceritanya lebih panjang", "Tidak ada alasan khusus"], benar: 0 }
    ]
  },
  {
    id: 9,
    judul: "Line Art",
    ikon: "🖋️",
    ringkasan: "Merapikan garis komik.",
    langkah: [
      { judul: "Rapikan tiap panel", pahami: "Sama seperti Level 6 di materi Clip Studio Paint, buat garis akhir (line art) yang bersih untuk seluruh panel komikmu. Kerjakan panel demi panel supaya lebih fokus dan tidak kewalahan." },
      { judul: "Jaga konsistensi ketebalan", pahami: "Usahakan ketebalan garis outline karakter cukup konsisten di semua panel — perbedaan ketebalan yang terlalu jauh antar panel bisa membuat komik terlihat kurang rapi." }
    ],
    kuis: [
      { pertanyaan: "Line art di tahap ini sebaiknya dikerjakan bagaimana?", pilihan: ["Panel demi panel supaya fokus dan tidak kewalahan", "Semua panel sekaligus tanpa jeda", "Tanpa perlu dirapikan"], benar: 0 },
      { pertanyaan: "Kenapa ketebalan garis outline perlu konsisten di semua panel?", pilihan: ["Supaya komik terlihat rapi, tidak berbeda-beda", "Supaya lebih cepat selesai", "Tidak berpengaruh sama sekali"], benar: 0 }
    ]
  },
  {
    id: 10,
    judul: "Warna",
    ikon: "🎨",
    ringkasan: "Mewarnai seluruh komik.",
    langkah: [
      { judul: "Buat palet warna karakter", pahami: "Tentukan dulu warna tetap untuk karaktermu (warna kulit, rambut, baju) sebelum mulai mewarnai semua panel, supaya warnanya tidak berubah-ubah antar panel." },
      { judul: "Warnai panel demi panel", pahami: "Gunakan warna yang sudah ditentukan secara konsisten di setiap panel. Kalau perlu, simpan warna yang sering dipakai di palet warna favorit di CSP supaya mudah dipakai ulang." }
    ],
    kuis: [
      { pertanyaan: "Kenapa perlu menentukan palet warna karakter dulu sebelum mewarnai semua panel?", pilihan: ["Supaya warnanya tidak berubah-ubah antar panel", "Supaya lebih cepat selesai", "Supaya warnanya selalu hitam putih"], benar: 0 },
      { pertanyaan: "Kalau ada warna yang sering dipakai berulang, sebaiknya disimpan di mana?", pilihan: ["Palet warna favorit di CSP", "Dihafal saja", "Ditulis di kertas terpisah"], benar: 0 }
    ]
  },
  {
    id: 11,
    judul: "Background",
    ikon: "🏞️",
    ringkasan: "Menambahkan latar tiap panel.",
    langkah: [
      { judul: "Tidak semua panel butuh background detail", pahami: "Untuk panel yang fokus ke ekspresi karakter (misalnya wajah kaget), kamu boleh memakai background sangat sederhana (warna polos atau garis kecepatan) supaya perhatian pembaca tetap ke wajah karakter." },
      { judul: "Tambahkan latar sesuai lokasi cerita", pahami: "Gunakan background sederhana yang sudah dilatih di Level 8 materi Clip Studio Paint (kamar, sekolah, rumah, taman) sesuai lokasi kejadian di ceritamu, supaya pembaca tahu di mana adegan itu terjadi." }
    ],
    kuis: [
      { pertanyaan: "Kapan boleh memakai background sangat sederhana (polos/garis kecepatan)?", pilihan: ["Saat panel fokus ke ekspresi karakter", "Selalu di setiap panel tanpa kecuali", "Tidak boleh sama sekali"], benar: 0 },
      { pertanyaan: "Background sebaiknya disesuaikan dengan apa?", pilihan: ["Lokasi kejadian di ceritanya", "Warna favorit pembuatnya", "Jumlah panel"], benar: 0 }
    ]
  },
  {
    id: 12,
    judul: "Finishing",
    ikon: "✨",
    ringkasan: "Memeriksa dan merapikan hasil akhir.",
    langkah: [
      { judul: "Baca ulang dari awal", pahami: "Baca komikmu dari panel pertama sampai terakhir seperti pembaca biasa. Perhatikan apakah alur ceritanya masih masuk akal dan mudah dipahami tanpa penjelasan tambahan darimu." },
      { judul: "Cek detail teknis", pahami: "Periksa sekali lagi: apakah ada garis yang belum tertutup (bisa membuat warna bocor), apakah ada balon dialog yang menutupi wajah karakter, dan apakah semua panel sudah terwarnai." }
    ],
    kuis: [
      { pertanyaan: "Kenapa perlu membaca ulang komik dari awal sampai akhir sebelum selesai?", pilihan: ["Memastikan alur cerita masih masuk akal dan mudah dipahami", "Untuk menghapus semua panel", "Tidak ada gunanya"], benar: 0 },
      { pertanyaan: "Apa saja yang perlu dicek di tahap finishing?", pilihan: ["Garis tertutup, balon tidak menutupi wajah, semua panel terwarnai", "Hanya warna baju karakter", "Jumlah huruf di judul"], benar: 0 }
    ]
  },
  {
    id: 13,
    judul: "Export",
    ikon: "📤",
    ringkasan: "Menyimpan dan membagikan hasil karya.",
    langkah: [
      { judul: "Simpan file kerja", pahami: "Simpan dulu file kerja aslinya (format .clip di Clip Studio Paint) supaya kamu masih bisa mengedit lagi nanti kalau diperlukan." },
      { judul: "Simpan ke portofolio Komik Strip Studio", pahami: "Setelah puas dengan hasilnya, buka Komik Studio di website ini, buat ulang atau gambar versi sederhananya, lalu simpan sebagai karya. Karyamu akan otomatis muncul di halaman Komik Saya dengan status yang kamu pilih (Draft, Selesai, atau Dipublikasikan)." }
    ],
    kuis: [
      { pertanyaan: "Kenapa file kerja asli (.clip) sebaiknya tetap disimpan?", pilihan: ["Supaya masih bisa diedit lagi nanti kalau diperlukan", "Karena wajib dihapus setelah selesai", "Tidak ada alasan khusus"], benar: 0 },
      { pertanyaan: "Setelah disimpan ke Komik Studio, karya akan otomatis muncul di halaman apa?", pilihan: ["Komik Saya", "Dashboard Guru", "Latihan"], benar: 0 }
    ]
  }
];
