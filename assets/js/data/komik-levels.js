// =========================================================
// KOMIK STRIP STUDIO — Data Materi: Belajar Komik Strip
// =========================================================
// BEDA dari csp-levels.js: tiap level di sini diakhiri "tugas"
// nyata (bukan kuis pilihan ganda) yang hasilnya disimpan ke
// proyek komik peserta didik (users/{uid}/proyekKomik/aktif).
// Semua hasil ini digabung jadi satu komik utuh di Level 13 (Export).
//
// Jenis tugas (field "tugas.mode"):
//   text        - satu kotak teks panjang, field: nama field di proyek
//   text-multi  - beberapa kotak teks berlabel, fields: [{key,label}]
//   pilihan     - pilih satu dari beberapa opsi (radio), auto-simpan
//   draw        - gambar bebas di canvas (pakai latihan-canvas.js),
//                 auto-selesai kalau area cukup terisi
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
    tugas: {
      mode: "text",
      field: "ide",
      label: "Sekarang giliranmu: tulis ide cerita komik stripmu sendiri (1-2 kalimat).",
      placeholder: "Contoh: Seorang anak panik karena pensilnya hilang, ternyata ada di kantongnya sendiri.",
      minPanjang: 10
    }
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
    tugas: {
      mode: "text",
      field: "karakter",
      label: "Deskripsikan karakter utama komikmu: namanya siapa, dan apa 2 ciri khasnya?",
      placeholder: "Contoh: Namanya Dito, ciri khasnya rambut jabrik dan selalu pakai topi merah.",
      minPanjang: 10
    }
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
    tugas: {
      mode: "draw",
      field: "ekspresi",
      label: "Gambar satu ekspresi karaktermu (pilih salah satu: senang/sedih/kaget/marah).",
      config: { minCoverage: 0.03 }
    }
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
    tugas: {
      mode: "text-multi",
      field: "alur",
      label: "Susun alur cerita komikmu (pakai ide dari Level 1):",
      fields: [
        { key: "awal", label: "Awal", placeholder: "Contoh: Dito mencari pensilnya" },
        { key: "tengah", label: "Tengah", placeholder: "Contoh: Dito panik, tidak ketemu-ketemu" },
        { key: "akhir", label: "Akhir", placeholder: "Contoh: Ternyata pensilnya ada di kantong baju" }
      ],
      minPanjang: 3
    }
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
    tugas: {
      mode: "draw",
      field: "storyboard",
      label: "Sketsa kasar storyboard komikmu berdasarkan alur cerita tadi (boleh coret-coretan).",
      config: { minCoverage: 0.02, panelCount: 3 }
    }
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
    tugas: {
      mode: "pilihan",
      field: "jumlahPanel",
      label: "Berdasarkan storyboard-mu, pilih jumlah panel untuk komikmu:",
      opsi: ["1 Panel", "2 Panel", "3 Panel", "4 Panel"]
    }
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
    tugas: {
      mode: "draw",
      field: "komposisi",
      label: "Coba atur posisi karakter & objek dalam satu panel (jangan penuh sesak, sisakan ruang kosong).",
      config: { minCoverage: 0.02, panelCount: 2 }
    }
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
    tugas: {
      mode: "text-multi",
      field: "dialog",
      label: "Tulis dialog untuk komikmu (boleh isi salah satu saja kalau komikmu cuma 1 panel):",
      fields: [
        { key: "dialog1", label: "Dialog Panel 1", placeholder: "Contoh: Di mana pensilku?" },
        { key: "dialog2", label: "Dialog Panel 2 (opsional)", placeholder: "Contoh: Oh, ternyata ada di kantongku!", opsional: true }
      ],
      minPanjang: 2
    }
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
    tugas: {
      mode: "draw",
      field: "lineArt",
      label: "Buat garis akhir (line art) komikmu di sini — telusuri sketsa/storyboard tadi jadi garis bersih.",
      config: { minCoverage: 0.04 }
    }
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
    tugas: {
      mode: "draw",
      field: "warna",
      label: "Warnai komikmu di sini (pilih warna, lalu gambar/isi seperti mewarnai beneran).",
      config: { minCoverage: 0.05 }
    }
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
    tugas: {
      mode: "draw",
      field: "background",
      label: "Gambar background sederhana sesuai lokasi cerita komikmu.",
      config: { minCoverage: 0.04 }
    }
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
    tugas: {
      mode: "draw",
      field: "finishing",
      label: "Ini kesempatan terakhir merapikan gambar — anggap ini VERSI AKHIR komikmu, karena gambar ini yang akan disimpan sebagai karya utuh di Level 13.",
      config: { minCoverage: 0.03 }
    }
  },
  {
    id: 13,
    judul: "Export",
    ikon: "📤",
    ringkasan: "Menggabungkan semua hasil jadi satu komik utuh.",
    langkah: [
      { judul: "Simpan file kerja", pahami: "Kalau kamu juga mengerjakan versi lengkapnya di Clip Studio Paint, simpan dulu file kerja aslinya (format .clip) supaya masih bisa diedit lagi nanti kalau diperlukan." },
      { judul: "Gabungkan jadi satu komik utuh", pahami: "Di halaman ini, semua yang sudah kamu kerjakan dari Level 1 sampai 12 — ide cerita, karakter, alur, dan gambar finishing — akan digabung otomatis jadi satu karya utuh, lalu tersimpan ke Komik Saya." }
    ],
    tugas: { mode: "export" }
  }
];
