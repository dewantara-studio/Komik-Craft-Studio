// =========================================================
// KOMIK STRIP STUDIO — Data Materi: Clip Studio Paint
// =========================================================
// Edit isi array ini untuk mengubah konten materi.
// Setiap level punya: id, judul, ringkasan, ikon, langkah[]
// Setiap langkah punya: judul, pahami (penjelasan), gambar (opsional)
// checklist: daftar pernyataan "Saya sudah bisa ..."
//
// Field "gambar" yang sudah diisi di bawah ini menunjuk ke file
// yang BELUM ada — taruh screenshot kamu di folder
// assets/img/materi-csp/ dengan nama file yang persis sama, nanti
// otomatis muncul. Lihat README.md bagian "Cara menambahkan
// screenshot ke materi".
// =========================================================

export const CSP_LEVELS = [
  {
    id: 1,
    judul: "Mengenal Clip Studio Paint",
    ikon: "🖥️",
    ringkasan: "Apa itu Clip Studio Paint dan bagian-bagian tampilannya.",
    langkah: [
      {
        judul: "Apa itu Clip Studio Paint?",
        pahami: "Clip Studio Paint (sering disingkat CSP) adalah aplikasi untuk menggambar digital, melukis, dan membuat komik. Aplikasi ini dipakai banyak ilustrator dan komikus profesional karena punya alat khusus untuk garis, warna, dan penyusunan panel komik dalam satu tempat. Dengan CSP, kamu bisa mengerjakan seluruh proses membuat komik — dari sketsa sampai halaman jadi — tanpa berpindah aplikasi."
      },
      {
        judul: "Mengenal tampilan utama",
        pahami: "Saat CSP pertama kali dibuka, layarnya terbagi jadi beberapa area kerja. Bagian tengah adalah Canvas (kertas gambar), dikelilingi panel-panel kecil: Toolbar di kiri (kumpulan alat gambar), Layer dan Color di kanan, serta Menu Bar di paling atas. Jangan khawatir kalau awalnya terasa ramai — kamu tidak perlu hafal semuanya sekaligus, cukup kenali dulu 5 area yang paling sering dipakai di langkah-langkah berikutnya.",
        gambar: "assets/img/materi-csp/level1-tampilan-utama.png"
      },
      {
        judul: "Menu Bar (baris menu)",
        pahami: "Menu Bar ada di paling atas layar, berisi perintah seperti File (untuk membuat/membuka/menyimpan file), Edit (undo/redo, copy/paste), Layer, Selection, dan lainnya. Kalau kamu bingung mencari sebuah fitur, coba cek dulu di Menu Bar — hampir semua perintah CSP bisa diakses dari sini, bukan cuma lewat tombol di Toolbar."
      },
      {
        judul: "Toolbar (kotak alat)",
        pahami: "Toolbar adalah kumpulan ikon di sisi kiri layar, isinya alat-alat menggambar seperti Pen, Brush, Eraser, Selection, dan Move. Klik satu ikon untuk memilih alat itu; alat yang sedang aktif biasanya ditandai dengan kotak/highlight di sekelilingnya. Alat-alat ini akan kita pelajari satu per satu di Level 3."
      },
      {
        judul: "Canvas (kertas gambar)",
        pahami: "Canvas adalah area putih besar di tengah layar tempat kamu benar-benar menggambar. Kamu bisa memperbesar/memperkecil tampilan canvas (zoom) dengan scroll mouse sambil menekan tombol tertentu, atau memakai Navigator, tanpa mengubah ukuran gambar aslinya."
      },
      {
        judul: "Layer Panel",
        pahami: "Layer Panel biasanya ada di sisi kanan, menampilkan daftar layer (lapisan gambar) yang sedang dipakai, dari yang paling atas sampai paling bawah. Kita akan membahas konsep layer lebih dalam di Level 4, tapi untuk sekarang cukup tahu bahwa panel ini menunjukkan 'susunan' gambar kamu."
      },
      {
        judul: "Color Panel & Tool Property",
        pahami: "Color Panel dipakai untuk memilih warna yang akan dipakai menggambar — biasanya berbentuk roda warna (color wheel) atau kotak gradasi. Di dekatnya ada Tool Property, yaitu panel kecil yang isinya berubah-ubah tergantung alat apa yang sedang aktif — misalnya kalau kamu memilih Brush, Tool Property akan menampilkan pengaturan ukuran dan bentuk brush."
      }
    ],
    checklist: [
      "Saya tahu apa itu Clip Studio Paint dan untuk apa aplikasi ini dipakai",
      "Saya bisa menunjukkan Menu Bar, Toolbar, Canvas, Layer Panel, dan Color Panel di layar",
      "Saya tahu bahwa Tool Property berubah tergantung alat yang sedang dipilih"
    ]
  },
  {
    id: 2,
    judul: "Membuat Canvas",
    ikon: "📄",
    ringkasan: "Langkah-langkah membuat lembar kerja baru.",
    langkah: [
      {
        judul: "Buka Clip Studio Paint",
        pahami: "Jalankan aplikasi Clip Studio Paint di komputer, lewat ikon di desktop atau lewat menu Start/Launchpad. Tunggu sampai layar utama (Start Menu CSP) terbuka sepenuhnya sebelum lanjut ke langkah berikutnya.",
        gambar: "assets/img/materi-csp/level2-langkah1.png"
      },
      {
        judul: "Pilih New",
        pahami: "Di layar Start Menu CSP, cari dan klik tombol atau menu 'New' (Baru). Kalau kamu sudah berada di dalam canvas lain, kamu juga bisa membuka menu File di Menu Bar lalu pilih New dari sana. Ini akan membuka jendela pengaturan file baru.",
        gambar: "assets/img/materi-csp/level2-langkah2.png"
      },
      {
        judul: "Pilih ukuran canvas",
        pahami: "Jendela New biasanya menawarkan beberapa preset ukuran (misalnya untuk komik, ilustrasi, atau media sosial). Untuk komik strip, pilih preset 'Comic' kalau tersedia, atau pilih preset Custom supaya kamu bisa mengatur ukurannya sendiri di langkah berikutnya.",
        gambar: "assets/img/materi-csp/level2-langkah3.png"
      },
      {
        judul: "Masukkan ukuran",
        pahami: "Isi kolom Width (lebar) dan Height (tinggi) sesuai kebutuhan — untuk komik strip sederhana, ukuran sekitar 1000 x 500 piksel biasanya cukup. Perhatikan juga satuan yang dipakai (piksel, cm, atau inci) dan resolusi (disarankan minimal 300 dpi kalau nanti mau dicetak, atau 72–150 dpi kalau hanya untuk dilihat di layar).",
        gambar: "assets/img/materi-csp/level2-langkah4.png"
      },
      {
        judul: "Klik Create",
        pahami: "Setelah semua pengaturan sesuai, klik tombol Create (atau OK) di pojok jendela. Canvas baru yang masih kosong akan langsung terbuka dan siap digambar. Kalau ternyata ukurannya salah, kamu masih bisa mengubahnya nanti lewat menu Edit > Canvas Size.",
        gambar: "assets/img/materi-csp/level2-langkah5.png"
      }
    ],
    checklist: [
      "Saya bisa membuka jendela New/Buat File Baru",
      "Saya tahu cara mengisi ukuran (Width, Height) dan resolusi canvas",
      "Saya bisa membuat canvas baru dari awal sampai selesai"
    ]
  },
  {
    id: 3,
    judul: "Mengenal Tool",
    ikon: "🖊️",
    ringkasan: "Pen/Brush, Eraser, Selection, Move, dan Transform.",
    langkah: [
      {
        judul: "Pen / Brush",
        pahami: "Klik ikon Pen atau Brush di Toolbar untuk memilih alat menggambar garis. Di Tool Property, kamu bisa mengubah ukuran (size) — semakin besar angkanya, semakin tebal garisnya. Coba gambar beberapa garis dengan ukuran berbeda-beda di canvas kosong untuk merasakan bedanya antara garis tebal dan garis tipis."
      },
      {
        judul: "Eraser",
        pahami: "Pilih Eraser di Toolbar untuk menghapus bagian gambar yang tidak diinginkan. Sama seperti Brush, Eraser juga punya pengaturan ukuran di Tool Property — gunakan Eraser berukuran kecil untuk detail halus, dan ukuran besar untuk menghapus area luas dengan cepat."
      },
      {
        judul: "Selection (seleksi)",
        pahami: "Selection Tool dipakai untuk memilih area tertentu di canvas sebelum kamu memindahkan, menghapus, atau mewarnai area itu saja tanpa mengganggu bagian lain. Bentuk seleksi yang paling sering dipakai adalah Rectangle (kotak) dan Lasso (bebas, mengikuti bentuk yang kamu gambar)."
      },
      {
        judul: "Move (memindahkan)",
        pahami: "Move Tool dipakai untuk menggeser posisi objek atau seluruh isi sebuah layer. Pastikan layer yang ingin digeser sedang aktif/terpilih di Layer Panel sebelum memakai Move, supaya yang bergeser adalah layer yang benar."
      },
      {
        judul: "Transform (mengubah bentuk)",
        pahami: "Transform dipakai untuk memperbesar, memperkecil, atau memutar objek yang sudah diseleksi. Biasanya akan muncul kotak dengan titik-titik kecil di sudut dan sisi gambar — tarik titik sudut untuk memperbesar/memperkecil secara proporsional, atau tarik di luar kotak untuk memutar."
      }
    ],
    checklist: [
      "Saya bisa memakai Brush dan mengubah ukurannya di Tool Property",
      "Saya bisa memakai Eraser untuk menghapus bagian gambar",
      "Saya bisa membuat seleksi dengan Selection Tool",
      "Saya bisa memindahkan dan memutar objek dengan Move/Transform"
    ]
  },
  {
    id: 4,
    judul: "Belajar Layer",
    ikon: "🗂️",
    ringkasan: "Membuat, menghapus, dan mengatur layer.",
    langkah: [
      {
        judul: "Layer itu apa?",
        pahami: "Bayangkan layer seperti lembar plastik transparan yang ditumpuk satu sama lain: paling bawah ada Background, lalu di atasnya Character, lalu Line Art, lalu Color paling atas. Kamu bisa menggambar atau mengedit satu lembar (layer) tanpa mengganggu gambar di lembar lain — inilah yang membuat gambar digital lebih fleksibel dibanding gambar di kertas asli."
      },
      {
        judul: "Membuat & menghapus layer",
        pahami: "Untuk membuat layer baru, cari ikon 'New Layer' biasanya di bagian bawah Layer Panel (bentuknya seperti kertas dengan tanda +), lalu klik. Layer baru akan muncul di atas layer yang sedang aktif. Untuk menghapus layer yang tidak dipakai, klik layer itu lalu klik ikon tempat sampah di Layer Panel."
      },
      {
        judul: "Mengubah nama & urutan layer",
        pahami: "Klik dua kali pada nama layer untuk mengubah namanya — ini sangat membantu supaya kamu tidak bingung mana layer 'Line Art' dan mana layer 'Color' ketika jumlah layer sudah banyak. Untuk mengubah urutan, cukup klik dan seret (drag) layer ke atas atau ke bawah di dalam Layer Panel."
      },
      {
        judul: "Hide/show & opacity",
        pahami: "Setiap layer punya ikon mata kecil di sampingnya — klik ikon itu untuk menyembunyikan (hide) atau menampilkan (show) layer tanpa menghapusnya, berguna saat kamu ingin melihat hasil tanpa satu elemen tertentu. Opacity mengatur tingkat transparansi layer, dari 100% (terlihat penuh) sampai 0% (tidak terlihat sama sekali) — cocok dipakai untuk sketsa kasar yang nantinya ditimpa line art."
      }
    ],
    checklist: [
      "Saya bisa membuat dan menghapus layer",
      "Saya bisa mengubah nama dan urutan layer",
      "Saya bisa memakai hide/show dan mengatur opacity layer"
    ]
  },
  {
    id: 5,
    judul: "Belajar Menggambar",
    ikon: "✏️",
    ringkasan: "Dari garis sederhana sampai karakter sederhana.",
    langkah: [
      {
        judul: "Garis",
        pahami: "Latihan membuat garis lurus dan garis lengkung dengan Pen/Brush. Untuk garis lurus yang rapi, coba klik di titik awal, lalu tekan tombol Shift sambil menyeret ke titik akhir (kombinasi tombol ini bisa berbeda tergantung versi CSP). Ulangi beberapa kali sampai tanganmu terbiasa mengontrol tekanan dan arah garis."
      },
      {
        judul: "Lingkaran",
        pahami: "Gambar lingkaran akan menjadi dasar bentuk kepala karakter. Kamu bisa menggambar lingkaran bebas dengan Brush, atau memakai Ellipse Tool (biasanya ada di dekat Selection Tool) supaya bentuknya lebih rapi, lalu menelusuri garis luarnya dengan Brush."
      },
      {
        judul: "Kotak",
        pahami: "Sama seperti lingkaran, kotak bisa digambar bebas atau memakai Rectangle Tool. Bentuk kotak sederhana ini nantinya berguna sebagai dasar badan karakter, bangunan, atau objek lain di komik."
      },
      {
        judul: "Bentuk kepala",
        pahami: "Gabungkan lingkaran besar (untuk bagian atas kepala) dengan garis bantu berbentuk 'U' atau segitiga tumpul di bagian bawah (untuk rahang/dagu). Garis bantu ini nantinya akan dihapus setelah line art selesai — makanya sebaiknya digambar di layer sketsa terpisah dengan opacity rendah."
      },
      {
        judul: "Wajah",
        pahami: "Tambahkan dua garis bantu horizontal dan vertikal yang membelah bentuk kepala — garis ini membantu menentukan posisi mata (biasanya di tengah, sedikit di atas garis horizontal), hidung, dan mulut agar wajah terlihat proporsional dan tidak miring sebelah."
      },
      {
        judul: "Karakter sederhana",
        pahami: "Gabungkan semua bentuk dasar: kepala, badan (dari kotak/oval), tangan, dan kaki sederhana. Jangan terlalu fokus pada detail dulu — tujuan latihan ini adalah membiasakan tangan menyusun bentuk dasar menjadi sosok karakter yang utuh."
      }
    ],
    checklist: [
      "Saya bisa menggambar garis, lingkaran, dan kotak dengan cukup rapi",
      "Saya bisa menyusun bentuk dasar menjadi bentuk kepala dan wajah",
      "Saya bisa menggambar karakter sederhana secara utuh"
    ]
  },
  {
    id: 6,
    judul: "Line Art",
    ikon: "🖋️",
    ringkasan: "Membuat garis bersih dan rapi.",
    langkah: [
      {
        judul: "Siapkan layer line art",
        pahami: "Buat layer baru khusus untuk line art, letakkan di atas layer sketsa. Turunkan opacity layer sketsa (misalnya jadi 30-40%) supaya sketsanya jadi samar dan tidak mengganggu saat kamu menelusuri garis akhir di layer line art."
      },
      {
        judul: "Garis bersih & stabilisasi",
        pahami: "Pilih ukuran brush yang konsisten untuk garis utama. Banyak versi CSP punya fitur 'stabilization' atau 'correction' yang membuat garis tangan yang bergetar jadi lebih halus secara otomatis — cari pengaturan ini di Tool Property saat memakai Pen/Brush, biasanya berupa slider angka."
      },
      {
        judul: "Outline & memperbaiki garis",
        pahami: "Telusuri (trace) garis sketsa dengan pelan dan mantap, jangan terburu-buru. Kalau ada garis yang meleset atau kurang rapi, gunakan Eraser kecil untuk memperbaiki bagian itu saja, tidak perlu menghapus seluruh garis dan mengulang dari awal."
      }
    ],
    checklist: [
      "Saya bisa menyiapkan layer line art terpisah dari sketsa",
      "Saya bisa membuat outline karakter dengan garis yang cukup rapi",
      "Saya bisa memperbaiki bagian garis yang kurang pas tanpa mengulang semua"
    ]
  },
  {
    id: 7,
    judul: "Mewarnai",
    ikon: "🎨",
    ringkasan: "Memilih warna dan mewarnai karakter.",
    langkah: [
      {
        judul: "Memilih warna",
        pahami: "Gunakan color wheel di Color Panel untuk memilih warna — lingkaran luar biasanya untuk memilih hue (jenis warna: merah, biru, hijau, dst), sedangkan kotak/segitiga di tengah untuk mengatur tingkat terang-gelap dan kepekatan warna itu."
      },
      {
        judul: "Siapkan layer warna",
        pahami: "Buat layer baru khusus warna, letakkan DI BAWAH layer line art supaya garis line art tetap terlihat jelas di atas warna. Ini juga memudahkan kalau kamu ingin mengganti warna tanpa merusak garis."
      },
      {
        judul: "Mengisi warna dasar",
        pahami: "Pakai Fill Tool (kadang disebut Bucket/Paint Bucket) untuk mengisi area tertutup dengan cepat. Pastikan garis line art-nya benar-benar tertutup rapat (tidak ada celah), karena celah kecil bisa membuat warna 'bocor' ke area lain."
      },
      {
        judul: "Shading sederhana",
        pahami: "Setelah warna dasar selesai, buat layer baru di atasnya dan atur mode layer itu ke 'Multiply' (mengalikan) agar warna bayangan menyatu alami dengan warna dasar. Gambar bayangan sederhana di bagian yang jauh dari sumber cahaya, misalnya di bawah rambut atau lipatan baju."
      }
    ],
    checklist: [
      "Saya bisa memilih warna lewat color wheel",
      "Saya bisa mewarnai karakter dengan Fill Tool tanpa warna bocor",
      "Saya bisa menambahkan shading sederhana di layer terpisah"
    ]
  },
  {
    id: 8,
    judul: "Background",
    ikon: "🏞️",
    ringkasan: "Membuat latar sederhana: kamar, sekolah, rumah, taman.",
    langkah: [
      {
        judul: "Mulai dari bentuk sederhana",
        pahami: "Semua background rumit sebenarnya tersusun dari bentuk sederhana: kotak untuk dinding/lantai/meja, garis lurus untuk perspektif, dan lingkaran/oval untuk objek bulat seperti lampu atau pohon. Jangan langsung menggambar detail — susun dulu bentuk-bentuk besarnya."
      },
      {
        judul: "Kamar & sekolah",
        pahami: "Untuk latar kamar, mulai dengan kotak besar untuk dinding dan lantai, tambahkan kotak lebih kecil untuk jendela, meja, dan tempat tidur. Untuk latar sekolah/kelas, tambahkan elemen seperti papan tulis (kotak persegi panjang) dan barisan meja-kursi berbentuk kotak kecil yang berulang."
      },
      {
        judul: "Rumah & taman",
        pahami: "Latar rumah dari luar bisa dimulai dari bentuk kotak/segitiga untuk badan rumah dan atap. Latar taman bisa dimulai dari garis horizontal sebagai tanah, lalu tambahkan bentuk lingkaran/oval bertumpuk untuk pohon dan semak sederhana."
      }
    ],
    checklist: [
      "Saya tahu cara memecah background jadi bentuk-bentuk sederhana",
      "Saya bisa membuat satu background sederhana (bebas pilih temanya)"
    ]
  },
  {
    id: 9,
    judul: "Teks dan Balon Komik",
    ikon: "💬",
    ringkasan: "Text Tool dan balon dialog.",
    langkah: [
      {
        judul: "Text Tool",
        pahami: "Pilih Text Tool di Toolbar, lalu klik di canvas untuk mulai mengetik. Di Tool Property kamu bisa memilih font, mengatur ukuran huruf, dan perataan teks (rata kiri/tengah/kanan). Untuk komik, pilih font yang jelas dibaca dalam ukuran kecil."
      },
      {
        judul: "Membuat balon dialog",
        pahami: "Balon dialog biasanya dibuat dengan menggambar bentuk oval atau lingkaran (pakai Ellipse Tool) berwarna putih dengan garis tepi hitam, lalu tambahkan 'ekor' kecil berbentuk segitiga yang menunjuk ke karakter yang sedang berbicara."
      },
      {
        judul: "Menempatkan dialog",
        pahami: "Letakkan balon dialog di area yang tidak menutupi bagian penting gambar (seperti wajah karakter). Contoh sederhana: karakter berkata \"Halo!\" — balon diletakkan di dekat mulut karakter dengan ekor mengarah ke sana, supaya pembaca langsung tahu siapa yang bicara."
      }
    ],
    checklist: [
      "Saya bisa membuat teks dengan Text Tool dan mengatur ukurannya",
      "Saya bisa membuat balon dialog lengkap dengan ekornya",
      "Saya bisa menempatkan balon dialog di posisi yang pas"
    ]
  },
  {
    id: 10,
    judul: "Mengenal Fitur Komik",
    ikon: "🧩",
    ringkasan: "Panel, Frame Border, Balloon, Ruler, dan lainnya.",
    langkah: [
      {
        judul: "Panel & Frame Border",
        pahami: "Panel adalah 'kotak' yang membatasi satu adegan komik. Frame Border adalah alat/fitur untuk membuat dan mengatur garis tepi panel secara rapi dan konsisten di seluruh halaman, biasanya lebih presisi dibanding menggambar kotak manual."
      },
      {
        judul: "Balloon & Text",
        pahami: "Seperti yang sudah dipelajari di Level 9, Balloon adalah balon dialog dan Text adalah alat untuk mengetik. Di komik yang lebih rumit, biasanya ada juga jenis balon khusus untuk pikiran (awan bergelombang) atau teriakan (bentuk runcing-runcing)."
      },
      {
        judul: "Ruler, Layer, Perspective, Tone",
        pahami: "Ruler membantu menggambar garis lurus/sejajar dengan presisi. Layer sudah kita pelajari di Level 4. Perspective membantu menggambar objek dengan sudut pandang yang benar (misalnya ruangan terlihat 'masuk ke dalam'). Tone adalah pola titik-titik (mirip di komik hitam-putih Jepang) yang dipakai sebagai pengganti warna atau bayangan — fitur ini opsional dan boleh dipelajari belakangan kalau kamu fokus ke komik berwarna."
      }
    ],
    checklist: [
      "Saya tahu fungsi Panel dan Frame Border",
      "Saya tahu ada jenis balon selain balon bicara biasa",
      "Saya tahu kegunaan Ruler dan Perspective secara umum"
    ]
  },
  {
    id: 11,
    judul: "Membuat Panel Komik",
    ikon: "🔲",
    ringkasan: "Dari 1 panel sampai 4 panel.",
    langkah: [
      {
        judul: "1 panel",
        pahami: "Latihan paling dasar: buat satu kotak besar yang memenuhi sebagian besar canvas sebagai satu panel tunggal. Gambar satu adegan penuh di dalamnya — ini cocok untuk momen penting yang ingin ditonjolkan."
      },
      {
        judul: "2 panel",
        pahami: "Bagi canvas jadi dua kotak, bisa disusun berdampingan (kiri-kanan) atau bertumpuk (atas-bawah). Gunakan 2 panel untuk menunjukkan 'sebelum dan sesudah' atau dua momen yang berurutan langsung."
      },
      {
        judul: "3 panel",
        pahami: "Susun tiga kotak, misalnya satu panel lebar di atas dan dua panel lebih kecil di bawah, atau tiga panel sejajar. Coba pikirkan: panel 1 = pembuka, panel 2 = kejadian, panel 3 = reaksi/penutup."
      },
      {
        judul: "4 panel",
        pahami: "Susun dalam grid 2x2 atau empat baris sejajar. Pola 4 panel sangat umum dipakai untuk komik strip lucu dengan struktur klasik: perkenalan — pengembangan — kejutan/masalah — lelucon/penutup (biasa disebut pola 'kishōtenketsu' atau setup-punchline)."
      }
    ],
    checklist: [
      "Saya bisa menyusun panel komik dari 1 sampai 4 panel",
      "Saya paham bahwa jumlah dan urutan panel memengaruhi cara cerita dibaca"
    ]
  },
  {
    id: 12,
    judul: "Latihan Komik Pertama",
    ikon: "📗",
    ringkasan: "Membuat komik sederhana: 1 karakter, 1 background, 2 panel, 2 dialog.",
    langkah: [
      {
        judul: "Siapkan semua bahan",
        pahami: "Sebelum mulai, pastikan kamu sudah punya: satu karakter sederhana (dari Level 5), satu background sederhana (dari Level 8), dan sudah paham cara membuat panel serta balon dialog (Level 9 & 11). Latihan ini menggabungkan semua yang sudah dipelajari."
      },
      {
        judul: "Contoh tema: Pensilku Hilang",
        pahami: "Buat 2 panel. Panel 1: karakter terlihat bingung mencari sesuatu di meja belajar, dengan dialog \"Di mana pensilku?\". Panel 2: karakter terlihat lega/tersenyum sambil menunjuk ke meja, dengan dialog \"Oh, ternyata ada di meja!\". Ini contoh cerita sangat sederhana dengan awal-masalah dan akhir-solusi."
      },
      {
        judul: "Susun urutan pengerjaan",
        pahami: "Kerjakan berurutan supaya tidak bingung: (1) sketsa kasar tiap panel, (2) line art, (3) warna dasar, (4) background sederhana, (5) balon dialog dan teks, (6) cek ulang keseluruhan hasil sebelum disimpan."
      }
    ],
    checklist: [
      "Saya berhasil membuat komik 2 panel pertama saya dari sketsa sampai selesai",
      "Saya sudah memakai karakter, background, panel, dan dialog dalam satu karya"
    ]
  }
];
