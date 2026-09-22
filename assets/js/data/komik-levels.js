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
    checklist: ["Saya punya satu ide cerita untuk komik strip", "Saya bisa meringkas ide itu dalam satu kalimat"]
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
    checklist: ["Saya sudah punya rancangan karakter utama", "Karakter saya punya minimal 2 ciri khas yang mudah dikenali"]
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
    checklist: ["Saya tahu bagian wajah mana yang paling menentukan ekspresi", "Saya bisa menggambar minimal 3 ekspresi berbeda pada karakter yang sama"]
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
    checklist: ["Saya tahu tiga bagian dasar sebuah cerita", "Saya sudah menyusun alur cerita singkat untuk komik saya"]
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
    checklist: ["Saya tahu fungsi storyboard sebelum menggambar final", "Saya sudah membuat storyboard sederhana untuk komik saya"]
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
    checklist: ["Saya sudah menentukan jumlah panel komik saya", "Saya sudah menentukan panel mana yang perlu dibuat lebih besar"]
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
    checklist: ["Saya sudah mengatur komposisi tiap panel supaya elemen penting terlihat jelas"]
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
    checklist: ["Saya sudah menulis dialog singkat untuk tiap panel", "Dialog yang saya tulis sesuai dengan gaya bicara karakter"]
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
    checklist: ["Saya sudah membuat line art untuk semua panel", "Ketebalan garis saya cukup konsisten di semua panel"]
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
    checklist: ["Saya sudah punya palet warna tetap untuk karakter saya", "Saya sudah mewarnai semua panel dengan warna yang konsisten"]
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
    checklist: ["Saya sudah menambahkan background pada panel yang membutuhkannya"]
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
    checklist: ["Saya sudah membaca ulang komik saya dari awal sampai akhir", "Saya sudah memeriksa detail teknis (garis, warna, posisi balon dialog)"]
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
    checklist: ["Saya sudah menyimpan file kerja komik saya", "Saya sudah menyimpan komik saya ke portofolio Komik Strip Studio"]
  }
];
