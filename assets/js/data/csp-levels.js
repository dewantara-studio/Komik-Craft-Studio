// =========================================================
// KOMIK STRIP STUDIO — Data Materi: Clip Studio Paint
// =========================================================
// Gambar di file ini SUDAH terisi dari screenshot asli CLIP
// STUDIO PAINT (bukan placeholder lagi) — ada di folder
// assets/img/materi-csp/. Istilah menu & tool di sini disamakan
// persis dengan tampilan CSP versi Bahasa Indonesia.
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
        pahami: "Clip Studio Paint (sering disingkat CSP) adalah aplikasi untuk menggambar digital, melukis, dan membuat komik. Aplikasi ini dipakai banyak ilustrator dan komikus profesional karena punya alat khusus untuk garis, warna, dan penyusunan panel komik dalam satu tempat."
      },
      {
        judul: "Mengenal tampilan utama",
        pahami: "Saat sebuah file dibuka, layar CSP terbagi jadi beberapa area: Menu Bar di paling atas (File, Edit, Cerita, Animasi, Layer, Pilih, Lihat, Filter, Jendela, Bantuan), Toolbar di kiri, panel Sub-Tool dan Properti Tool di bawah Toolbar, Canvas besar di tengah, dan di kanan ada Navigator, Properti Layer, serta daftar Layer (perhatikan selalu ada layer 'Kertas' paling bawah — itu latar putih canvas-nya).",
        gambar: "assets/img/materi-csp/level1-tampilan-utama.png"
      },
      {
        judul: "Menu Bar — 10 menu utama",
        pahami: "Di CSP versi kamu, Menu Bar berisi persis 10 menu ini: File, Edit, Cerita(P), Animasi, Layer, Pilih(S), Lihat(V), Filter, Jendela(W), Bantuan(H). File untuk buka/simpan file, Edit untuk undo/transformasi/fill, Cerita khusus komik banyak halaman, Animasi untuk bikin animasi gerak (bukan fokus kelas kita), Layer untuk kelola lapisan gambar, Pilih untuk seleksi area, Lihat untuk zoom/tampilan, Filter untuk efek gambar, Jendela untuk memunculkan/menyembunyikan panel, dan Bantuan untuk tutorial bawaan CSP.",
        gambar: "assets/img/materi-csp/level1-menu-bar.png"
      },
      {
        judul: "Menu Edit — Undo, Transformasi, Fill",
        pahami: "Menu Edit isinya banyak perintah penting: Urungkan(Ctrl+Z)/Lakukan lagi untuk membatalkan-mengulang aksi, Hapus(E) untuk menghapus isi seleksi, Fill(Alt+Del) untuk mengisi seleksi dengan warna depan, Transformasi untuk mengubah ukuran/memutar objek, serta Ubah Ukuran Kanvas kalau ukuran canvas-mu ternyata salah.",
        gambar: "assets/img/materi-csp/level1-menu-edit.png"
      },
      {
        judul: "Toolbar (kotak alat)",
        pahami: "Toolbar adalah kumpulan ikon di sisi kiri layar. Beberapa yang paling sering dipakai: Pena/Pensil (menggambar garis), Penghapus (menghapus), Airbrush (semprot warna lembut), Isi/Fill (mengisi warna), Seleksi (memilih area), Pindah (menggeser objek), Teks (menulis), Balon dialog (khusus komik), Efek (brush dekoratif), dan Campur (blending/smudge warna)."
      },
      {
        judul: "Canvas & mengatur tampilan (zoom)",
        pahami: "Canvas adalah kertas gambar di tengah layar. Untuk memperbesar/memperkecil tampilan tanpa mengubah ukuran gambar aslinya, pakai menu Lihat(V): ada Perbesar(Ctrl+Num+), Perkecil(Ctrl+Num-), 100%, 200%, dan Paskan Ke Layar supaya seluruh canvas langsung pas di layar.",
        gambar: "assets/img/materi-csp/level1-menu-lihat.png"
      },
      {
        judul: "Tool navigasi: Tangan, Rotasikan, Perbesar/Perkecil",
        pahami: "Selain lewat menu Lihat, ada juga tool khusus navigasi (biasanya ikon tangan di Toolbar): Tangan untuk menggeser tampilan canvas, Rotasikan untuk memiringkan sudut pandang canvas (bukan objeknya), dan Perbesar/Perkecil untuk klik-zoom langsung di titik yang kamu klik.",
        gambar: "assets/img/materi-csp/level1-tool-navigasi.png"
      },
      {
        judul: "Layer Panel",
        pahami: "Layer Panel di kanan bawah menampilkan daftar layer dari atas ke bawah. Di contoh tampilan utama tadi, ada 'Layer 1' (tempat kamu menggambar) di atas 'Kertas' (latar putih bawaan canvas). Kita bahas lebih dalam soal layer di Level 4."
      },
      {
        judul: "Color Panel & Tool Property",
        pahami: "Roda Warna (Color Panel) dipakai memilih warna gambar. Properti Tool di bawah Sub-Tool berubah-ubah tergantung alat yang aktif — biasanya berisi Ukuran Kuas, Opasitas, Anti-aliasing, dan Stabilisasi (semakin tinggi Stabilisasi, semakin halus garis tangan yang bergetar)."
      },
      {
        judul: "Kalau ada panel yang hilang",
        pahami: "Kalau tidak sengaja menutup sebuah panel (misalnya Layer atau Navigator hilang dari layar), buka lagi lewat menu Jendela(W) — semua panel seperti Alat, Sub-Tool, Properti Tool, Roda Warna, dan Layer bisa dimunculkan ulang dari sini (tanda centang berarti sedang tampil).",
        gambar: "assets/img/materi-csp/level1-menu-jendela.png"
      },
      {
        judul: "Bantuan bawaan CSP",
        pahami: "Kalau bingung di tengah jalan, CSP punya menu Bantuan(H) berisi 'Pelatihan dan Tutorial' dan 'Manual Petunjuk' resmi dari Clip Studio — bisa jadi referensi tambahan di luar materi ini.",
        gambar: "assets/img/materi-csp/level1-menu-bantuan.png"
      }
    ],
    checklist: [
      "Saya tahu apa itu Clip Studio Paint dan untuk apa aplikasi ini dipakai",
      "Saya bisa menyebutkan 10 menu di Menu Bar CSP",
      "Saya bisa menunjukkan Toolbar, Canvas, Layer Panel, dan Color Panel di layar",
      "Saya tahu cara memunculkan panel yang hilang lewat menu Jendela"
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
        pahami: "Jalankan CLIP STUDIO START (launcher) di komputer, lalu masuk ke mode 'Gambar'. Di sini kamu juga bisa lihat Material Gratis Terpopuler dan Pengumuman dari Clip Studio — tapi untuk mulai menggambar, kamu perlu membuka CLIP STUDIO PAINT dari sini.",
        gambar: "assets/img/materi-csp/level2-langkah1.png"
      },
      {
        judul: "Pilih Baru(N)",
        pahami: "Setelah CLIP STUDIO PAINT terbuka, klik menu File di pojok kiri atas, lalu pilih Baru(N) — atau langsung pakai pintasan Ctrl+N. Ini akan membuka jendela pengaturan file baru.",
        gambar: "assets/img/materi-csp/level2-langkah2.png"
      },
      {
        judul: "Pilih ukuran canvas",
        pahami: "Jendela Baru biasanya menawarkan beberapa preset ukuran (misalnya untuk komik, ilustrasi, atau media sosial). Untuk komik strip, pilih preset 'Comic' kalau tersedia, atau pilih preset Custom supaya kamu bisa mengatur ukurannya sendiri di langkah berikutnya."
      },
      {
        judul: "Masukkan ukuran",
        pahami: "Isi kolom Width (lebar) dan Height (tinggi) sesuai kebutuhan — untuk komik strip sederhana, ukuran sekitar 1000 x 500 piksel biasanya cukup. Perhatikan juga satuan yang dipakai (piksel, cm, atau inci) dan resolusi (disarankan minimal 300 dpi kalau nanti mau dicetak, atau 72–150 dpi kalau hanya untuk dilihat di layar)."
      },
      {
        judul: "Klik Create",
        pahami: "Setelah semua pengaturan sesuai, klik tombol Create (atau OK) di pojok jendela. Canvas baru yang masih kosong akan langsung terbuka dan siap digambar. Kalau ternyata ukurannya salah, kamu masih bisa mengubahnya lewat Edit > Ubah Ukuran Kanvas."
      }
    ],
    checklist: [
      "Saya bisa membuka CLIP STUDIO PAINT dari launcher CLIP STUDIO START",
      "Saya bisa membuka jendela Baru lewat File > Baru(N)",
      "Saya tahu cara mengisi ukuran (Width, Height) dan resolusi canvas",
      "Saya bisa membuat canvas baru dari awal sampai selesai"
    ]
  },
  {
    id: 3,
    judul: "Mengenal Tool",
    ikon: "🖊️",
    ringkasan: "Pena, Pensil, Eraser, Selection, Move, Transform, dan Airbrush.",
    langkah: [
      {
        judul: "Pena (Pen)",
        pahami: "Klik ikon Pena di Toolbar. Sub-Tool-nya punya banyak jenis: G-pen, Real G-Pen, Pena mapping, Pena turnip, Pena bertekstur, Pena kasar, Kaligrafi, dan Pena milli. G-pen adalah yang paling umum dipakai untuk line art bersih. Di Properti Tool, atur Ukuran Kuas dan Stabilisasi — makin tinggi Stabilisasi, garis tangan yang bergetar jadi makin halus.",
        gambar: "assets/img/materi-csp/level3-pena.png"
      },
      {
        judul: "Pensil (Sketsa)",
        pahami: "Untuk sketsa kasar, pakai Sub-Tool Sketsa: Pensil, Pensil pilot, Arang, Krayon, Pastel, dan Kapur tulis. Beda dengan Pena yang garisnya tegas, Pensil punya tekstur butiran (lihat pengaturan '2-Tekstur: Rough paper') yang cocok untuk tahap sketsa sebelum line art.",
        gambar: "assets/img/materi-csp/level3-sketsa.png"
      },
      {
        judul: "Penghapus (Eraser)",
        pahami: "Sub-Tool Penghapus punya beberapa jenis: Tegas (menghapus bersih), Lembut (menghapus dengan tepi lembut), Penghapus diremas, Kasar, Vektor (khusus garis vektor), Multi-layer (menghapus di semua layer sekaligus), dan Snap penghapus. Pemula biasanya cukup pakai 'Tegas' untuk sebagian besar kebutuhan.",
        gambar: "assets/img/materi-csp/level3-penghapus.png"
      },
      {
        judul: "Menu Pilih(S) — perintah seleksi",
        pahami: "Menu Pilih(S) berisi perintah seputar seleksi: Pilih Semua(Ctrl+A), Batal pilih(Ctrl+D), Pilih lagi(Ctrl+Shift+D), dan Balikkan area yang diseleksi(Ctrl+Shift+I) — yang terakhir ini sangat berguna kalau kamu ingin menyeleksi 'semua KECUALI' satu bagian tertentu.",
        gambar: "assets/img/materi-csp/level3-menu-pilih.png"
      },
      {
        judul: "Pilih (Selection) — Laso, Persegi panjang, Elips",
        pahami: "Tool Seleksi di Toolbar (bukan menu, tapi tool langsung di canvas) punya beberapa bentuk Sub-Tool: Laso (bebas mengikuti gerakan tanganmu), Persegi panjang, Elips, Polyline, dan Laso magnetik (otomatis menempel ke tepi gambar yang kontras). Pilih bentuk yang paling sesuai dengan area yang mau diseleksi.",
        gambar: "assets/img/materi-csp/level3-selection-subtool.png"
      },
      {
        judul: "Pilih Otomatis (magic wand)",
        pahami: "Pilih Otomatis dipakai untuk menyeleksi area berdasarkan warna yang mirip — klik sekali di satu warna, otomatis semua piksel warna serupa di sekitarnya ikut terseleksi. Ada pengaturan Toleransi (semakin besar, semakin banyak variasi warna yang ikut terseleksi) dan 'Tutup celah' untuk tetap menyeleksi dengan rapi walau ada sedikit celah di garis.",
        gambar: "assets/img/materi-csp/level3-pilih-otomatis.png"
      },
      {
        judul: "Pindah (Move)",
        pahami: "Move Tool dipakai untuk menggeser posisi objek atau seluruh isi sebuah layer. Pastikan layer yang ingin digeser sedang aktif/terpilih di Layer Panel sebelum memakai Move, supaya yang bergeser adalah layer yang benar."
      },
      {
        judul: "Transformasi (Transform)",
        pahami: "Transformasi ada di menu Edit (lihat Level 1), dipakai untuk memperbesar, memperkecil, atau memutar objek yang sudah diseleksi. Biasanya muncul kotak dengan titik-titik kecil di sudut dan sisi gambar — tarik titik sudut untuk mengubah ukuran, atau area di luar kotak untuk memutar."
      },
      {
        judul: "Airbrush (semprot)",
        pahami: "Airbrush menyemprotkan warna lembut, cocok untuk shading halus atau efek cahaya. Sub-Tool-nya ada Lembut, Semprot, Tetesan, Noise, dan Semprotan running color. Kita pakai tool ini lagi di Level 7 untuk teknik mewarnai.",
        gambar: "assets/img/materi-csp/level3-airbrush.png"
      },
      {
        judul: "Bentuk (Garis, Elips, Kotak, Poligon)",
        pahami: "Tool 'Gambar langsung' menyediakan bentuk siap pakai yang rapi tanpa perlu gambar bebas tangan: Garis lurus, Kurva, Polyline, Kurva Bezier, Persegi panjang, Elips, dan Poligon. Ini yang dipakai untuk membuat lingkaran/kotak rapi di Level 5, bukan menggambar bebas dengan Pena.",
        gambar: "assets/img/materi-csp/level3-bentuk.png"
      }
    ],
    checklist: [
      "Saya bisa membedakan Pena (garis tegas) dan Pensil/Sketsa (tekstur kasar)",
      "Saya tahu ada beberapa jenis Penghapus dan kapan memakai masing-masing",
      "Saya bisa membuat seleksi dengan berbagai bentuk (Laso, Persegi panjang, Elips)",
      "Saya tahu Pilih Otomatis dipakai untuk menyeleksi berdasarkan warna",
      "Saya bisa memindahkan dan memutar objek dengan Move/Transformasi",
      "Saya tahu tool Bentuk dipakai untuk garis/lingkaran/kotak yang rapi"
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
        pahami: "Bayangkan layer seperti lembar plastik transparan yang ditumpuk satu sama lain: paling bawah ada 'Kertas' (latar canvas), lalu di atasnya bisa ada Background, Character, Line Art, dan Color. Kamu bisa menggambar atau mengedit satu lembar (layer) tanpa mengganggu gambar di lembar lain. Contoh paling sederhana: layer 'Layer 1' di atas layer 'Kertas'.",
        gambar: "assets/img/materi-csp/level4-layer-panel.png"
      },
      {
        judul: "Menu Layer — perintah lengkap",
        pahami: "Menu Layer berisi semua perintah kelola layer: Layer Raster Baru(Ctrl+Shift+N) untuk membuat layer gambar baru, Hapus Layer(T) untuk menghapus, Duplikasikan Layer untuk menyalin, Gabungkan dengan layer di bawah ini(Ctrl+E) untuk menyatukan dua layer, dan Urutan Layer untuk mengatur susunannya.",
        gambar: "assets/img/materi-csp/level4-menu-layer.png"
      },
      {
        judul: "Mengubah nama & urutan layer",
        pahami: "Klik dua kali pada nama layer di Layer Panel untuk mengubah namanya — ini sangat membantu supaya kamu tidak bingung mana layer 'Line Art' dan mana layer 'Color' ketika jumlah layer sudah banyak. Untuk mengubah urutan, klik dan seret (drag) layer ke atas/bawah, atau pakai Layer > Urutan Layer."
      },
      {
        judul: "Hide/show & opacity",
        pahami: "Setiap layer punya ikon mata kecil di sampingnya — klik untuk menyembunyikan (hide) atau menampilkan (show) layer tanpa menghapusnya. Opacity mengatur tingkat transparansi layer, dari 100% (terlihat penuh) sampai 0% (tidak terlihat) — cocok dipakai untuk sketsa kasar yang nantinya ditimpa line art."
      },
      {
        judul: "Bonus: Tool Operasi (memindahkan Layer di canvas)",
        pahami: "Selain drag di Layer Panel, ada juga Sub-Tool Operasi di Toolbar dengan opsi 'Pindahkan Layer' — dipakai untuk menggeser seluruh isi satu layer langsung dari canvas tanpa perlu klik ke Layer Panel dulu. Cocok kalau kamu sudah tahu persis layer mana yang mau digeser.",
        gambar: "assets/img/materi-csp/level4-operasi-objek.png"
      }
    ],
    checklist: [
      "Saya bisa membuat layer baru lewat Layer > Layer Raster Baru",
      "Saya bisa menghapus dan menggabungkan layer",
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
        pahami: "Latihan membuat garis lurus dan garis lengkung. Untuk sketsa awal, pakai Sub-Tool Pensil (lihat Level 3) supaya gampang dihapus/diperbaiki. Untuk garis lurus yang rapi, coba klik di titik awal lalu tekan Shift sambil menyeret ke titik akhir."
      },
      {
        judul: "Lingkaran",
        pahami: "Gambar lingkaran akan menjadi dasar bentuk kepala karakter. Kamu bisa menggambar lingkaran bebas dengan Pena/Pensil, atau memakai Sub-Tool Elips dari tool Bentuk (lihat Level 3) supaya bentuknya lebih rapi, lalu menelusuri garis luarnya."
      },
      {
        judul: "Kotak",
        pahami: "Sama seperti lingkaran, kotak bisa digambar bebas atau memakai Sub-Tool Persegi panjang dari tool Bentuk. Bentuk kotak sederhana ini nantinya berguna sebagai dasar badan karakter, bangunan, atau objek lain di komik."
      },
      {
        judul: "Bentuk kepala",
        pahami: "Gabungkan lingkaran besar (bagian atas kepala) dengan garis bantu berbentuk 'U' atau segitiga tumpul di bagian bawah (rahang/dagu). Garis bantu ini nantinya dihapus setelah line art selesai — sebaiknya digambar di layer sketsa terpisah dengan opacity rendah (lihat Level 4)."
      },
      {
        judul: "Wajah",
        pahami: "Tambahkan dua garis bantu horizontal dan vertikal yang membelah bentuk kepala — garis ini membantu menentukan posisi mata, hidung, dan mulut agar wajah terlihat proporsional."
      },
      {
        judul: "Karakter sederhana",
        pahami: "Gabungkan semua bentuk dasar: kepala, badan, tangan, dan kaki sederhana. Jangan terlalu fokus pada detail dulu — tujuannya membiasakan tangan menyusun bentuk dasar menjadi sosok karakter yang utuh."
      },
      {
        judul: "Bonus: Liquify (mengoreksi proporsi)",
        pahami: "Kalau proporsi karakter yang sudah digambar terasa kurang pas (misalnya kepala kurang bulat atau badan kurang panjang), tool Liquify bisa 'menarik-narik' pixel gambar seperti adonan lentur, tanpa perlu menghapus dan menggambar ulang. Aturannya: Ukuran Kuas untuk area yang terpengaruh, dan Kekuatan untuk seberapa besar efeknya.",
        gambar: "assets/img/materi-csp/level5-liquify.png"
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
        pahami: "Buat layer baru khusus untuk line art (Layer > Layer Raster Baru), letakkan di atas layer sketsa. Turunkan opacity layer sketsa (misalnya 30-40%) supaya sketsanya samar dan tidak mengganggu saat kamu menelusuri garis akhir."
      },
      {
        judul: "Pakai Pena, atur Stabilisasi",
        pahami: "Untuk line art, Pena (khususnya G-pen) lebih cocok daripada Pensil karena garisnya tegas dan bersih. Naikkan nilai Stabilisasi di Properti Tool (lihat contoh di Level 3: Stabilisasi 6) supaya garis tangan yang bergetar otomatis jadi lebih halus."
      },
      {
        judul: "Outline & memperbaiki garis",
        pahami: "Telusuri (trace) garis sketsa dengan pelan dan mantap, jangan terburu-buru. Kalau ada garis yang meleset, pakai Penghapus 'Tegas' berukuran kecil untuk memperbaiki bagian itu saja, tidak perlu mengulang dari awal."
      },
      {
        judul: "Bonus: Koreksi Garis (untuk garis vektor)",
        pahami: "Kalau menggambar di layer vektor, ada tool khusus Koreksi Garis dengan sub-tool: Titik kontrol (menambah/memindah titik di sepanjang garis), Sederhanakan garis vektor (mengurangi kelokan berlebih supaya lebih halus), dan Sesuaikan lebar garis (menebalkan/menipiskan sebagian garis saja tanpa menggambar ulang).",
        gambar: "assets/img/materi-csp/level6-koreksi-garis.png"
      }
    ],
    checklist: [
      "Saya bisa menyiapkan layer line art terpisah dari sketsa",
      "Saya tahu Pena lebih cocok untuk line art dibanding Pensil",
      "Saya bisa membuat outline karakter dengan garis yang cukup rapi"
    ]
  },
  {
    id: 7,
    judul: "Mewarnai",
    ikon: "🎨",
    ringkasan: "Memilih warna, mengisi, dan shading dengan Cat Air/Airbrush.",
    langkah: [
      {
        judul: "Memilih warna",
        pahami: "Gunakan Roda Warna di Color Panel untuk memilih warna — lingkaran luar untuk memilih hue (jenis warna), kotak/segitiga di tengah untuk mengatur terang-gelap dan kepekatan warna."
      },
      {
        judul: "Siapkan layer warna",
        pahami: "Buat layer baru khusus warna, letakkan DI BAWAH layer line art supaya garisnya tetap terlihat jelas. Pakai Fill(Alt+Del) dari menu Edit untuk mengisi seleksi dengan warna depan, atau pakai tool Isi/Fill di Toolbar untuk klik-isi cepat."
      },
      {
        judul: "Mengisi warna dasar",
        pahami: "Idealnya garis line art tertutup rapat sebelum di-Fill supaya warna tidak 'bocor' ke area lain. Tapi kalau ada celah super kecil yang kelewatan, tool Fill/Pilih Otomatis punya pengaturan 'Tutup celah' — CSP otomatis menganggap celah sekecil itu sebagai tertutup, jadi warnanya tetap rapi tanpa kamu harus menutup manual satu-satu.",
        gambar: "assets/img/materi-csp/level7-fill-detail.png"
      },
      {
        judul: "Cat Air (Watercolor) untuk shading natural",
        pahami: "Sub-Tool Cat air punya beberapa jenis: Kuas cat air bundar, Kuas cat air datar, Soft bleed, Cuci basah, Cuci kasar, Cipratan cat air, dan Pena kuas. Perhatikan pengaturan 'Mode blending: Perbanyak (Multiply)' — sama seperti mode layer Multiply yang dipakai untuk shading, tapi di sini langsung pada kuasnya, cocok untuk pewarnaan natural tanpa perlu bikin layer bayangan terpisah.",
        gambar: "assets/img/materi-csp/level7-catair.png"
      },
      {
        judul: "Airbrush untuk gradasi lembut",
        pahami: "Airbrush (lihat Level 3) juga bagus dipakai untuk shading lembut/gradasi, terutama di pipi karakter atau highlight cahaya, karena semprotannya halus dan tidak bertepi tegas."
      },
      {
        judul: "Campur (Blend) untuk menghaluskan tepi warna",
        pahami: "Sub-Tool Campur berisi: Campur, Keburaman, Ujung jari, Blender Painterly, Blender wet bleed, Blender bertekstur, dan Salin stempel. Tool ini dipakai untuk menghaluskan pertemuan dua warna (blending) supaya tidak terlihat garis batas yang tajam.",
        gambar: "assets/img/materi-csp/level7-campur.png"
      },
      {
        judul: "Eyedropper (mengambil warna)",
        pahami: "Eyedropper dipakai untuk 'mencontek' warna yang sudah ada di gambar — klik di bagian mana pun, warna itu langsung jadi warna aktif tanpa perlu cari-cari di Roda Warna lagi. Sangat berguna supaya warna kulit/baju karakter tetap konsisten di semua panel.",
        gambar: "assets/img/materi-csp/level7-eyedropper.png"
      }
    ],
    checklist: [
      "Saya bisa memilih warna lewat Roda Warna",
      "Saya bisa mewarnai karakter dengan Fill tanpa warna bocor",
      "Saya tahu Cat Air dan Airbrush bisa dipakai untuk shading natural",
      "Saya tahu fungsi tool Campur untuk menghaluskan tepi warna",
      "Saya tahu cara pakai Eyedropper untuk menjaga warna tetap konsisten"
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
        pahami: "Semua background rumit sebenarnya tersusun dari bentuk sederhana: kotak untuk dinding/lantai/meja, garis lurus untuk perspektif, dan lingkaran/oval untuk objek bulat seperti lampu atau pohon."
      },
      {
        judul: "Kamar & sekolah",
        pahami: "Untuk latar kamar, mulai dengan kotak besar untuk dinding dan lantai, tambahkan kotak lebih kecil untuk jendela, meja, dan tempat tidur. Untuk latar sekolah/kelas, tambahkan papan tulis dan barisan meja-kursi berbentuk kotak kecil yang berulang."
      },
      {
        judul: "Rumah & taman",
        pahami: "Latar rumah dari luar bisa dimulai dari bentuk kotak/segitiga untuk badan rumah dan atap. Latar taman bisa dimulai dari garis horizontal sebagai tanah, lalu bentuk lingkaran/oval bertumpuk untuk pohon dan semak."
      },
      {
        judul: "Gradasi untuk langit",
        pahami: "Tool Gradasi punya preset siap pakai yang cocok untuk langit: 'Biru-langit', 'Langit siang hari', dan 'Matahari terbenam'. Tinggal seleksi area langit di background, pilih salah satu preset ini, lalu sapukan — jauh lebih cepat dan halus dibanding mewarnai gradasi langit manual sedikit demi sedikit.",
        gambar: "assets/img/materi-csp/level8-gradasi.png"
      },
      {
        judul: "Bonus: Efek dekoratif",
        pahami: "Kalau mau menambah detail dekoratif (kelap-kelip cahaya, bunga berjatuhan, glitter), CSP punya Sub-Tool Efek: Kelap-kelip, Noda darah, Bercak-bercak cahaya, Glitter, lingkaran lembut, Bulu, dan Daun bunga. Opsional, tapi bisa mempercantik background di momen-momen tertentu.",
        gambar: "assets/img/materi-csp/level8-efek-dekoratif.png"
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
        pahami: "Pilih Teks di Toolbar, lalu klik di canvas untuk mulai mengetik (atau seret untuk 'Buat kotak teks' kalau teksnya panjang). Di Properti Tool kamu bisa memilih font (defaultnya 'Tahoma Regular'), mengatur ukuran huruf (Ukuran 30.0 di contoh ini), dan style Bold/Italic/Underline. Untuk komik, pilih font yang jelas dibaca dalam ukuran kecil.",
        gambar: "assets/img/materi-csp/level9-teks.png"
      },
      {
        judul: "Membuat balon dialog dengan tool Balon",
        pahami: "CSP sudah punya tool Balon siap pakai — tidak perlu menggambar oval manual! Sub-Tool-nya lengkap: Balon bulat, Balon bulat kasar, Balon elips, Balon kurva, Balon persegi panjang, Pena balon (gambar bentuk bebas), dan Ekor balon (menambahkan ekor penunjuk terpisah). Tinggal pilih bentuknya, lalu seret di canvas untuk membuat balonnya langsung jadi.",
        gambar: "assets/img/materi-csp/level9-balon.png"
      },
      {
        judul: "Menempatkan dialog",
        pahami: "Letakkan balon dialog di area yang tidak menutupi bagian penting gambar (seperti wajah karakter). Contoh: karakter berkata \"Halo!\" — balon diletakkan di dekat mulut karakter dengan ekor mengarah ke sana."
      }
    ],
    checklist: [
      "Saya bisa membuat teks dengan Text Tool dan mengatur ukurannya",
      "Saya bisa membuat balon dialog memakai tool Balon (bukan gambar manual)",
      "Saya bisa menempatkan balon dialog di posisi yang pas"
    ]
  },
  {
    id: 10,
    judul: "Mengenal Fitur Komik",
    ikon: "🧩",
    ringkasan: "Panel, Frame Border, halaman banyak (Cerita), dan Filter.",
    langkah: [
      {
        judul: "Panel & Frame Border",
        pahami: "Panel adalah 'kotak' yang membatasi satu adegan komik. Frame Border adalah fitur untuk membuat dan mengatur garis tepi panel secara rapi dan konsisten di seluruh halaman."
      },
      {
        judul: "Penggaris (Ruler) — garis presisi & perspektif",
        pahami: "Tool Buat penggaris membantu menggambar garis lurus/sejajar dengan presisi: Penggaris linier (garis lurus dasar), Penggaris kurva, Penggaris perspektif (untuk ruangan/jalan dengan titik hilang), dan Penggaris simetris (otomatis mencerminkan gambar, cocok untuk wajah/objek simetris). Setelah dibuat, garis yang kamu gambar akan otomatis 'menempel' mengikuti penggaris ini.",
        gambar: "assets/img/materi-csp/level10-penggaris.png"
      },
      {
        judul: "Menu Cerita — untuk komik banyak halaman",
        pahami: "Kalau nanti kamu bikin komik lebih dari satu halaman (bukan cuma strip pendek), menu Cerita(P) sangat berguna: Tambah Halaman, Hapus Halaman, Duplikasikan Halaman, sampai Manajer Halaman untuk mengatur urutan semua halaman komikmu sekaligus.",
        gambar: "assets/img/materi-csp/level10-menu-cerita.png"
      },
      {
        judul: "Menu Filter — efek tambahan",
        pahami: "Menu Filter berisi efek siap pakai: Filter Cepat, Efek Cepat, Distorsikan, Keburaman (blur), Koreksi warna, dan Pertajam. Bisa dipakai untuk sentuhan akhir, misalnya menambah sedikit blur di background supaya karakter di depan lebih menonjol.",
        gambar: "assets/img/materi-csp/level10-menu-filter.png"
      },
      {
        judul: "Bonus: Menu Animasi (di luar cakupan kelas ini)",
        pahami: "CSP juga punya menu Animasi lengkap (Layer animasi, Timeline, Cel animasi) untuk membuat gambar bergerak. Ini fitur terpisah dari komik strip statis yang kita pelajari di kelas ini — kalau penasaran, boleh dieksplorasi sendiri nanti setelah lancar bikin komik strip.",
        gambar: "assets/img/materi-csp/level10-menu-animasi.png"
      }
    ],
    checklist: [
      "Saya tahu fungsi Panel dan Frame Border",
      "Saya tahu Penggaris bisa membantu membuat garis presisi/perspektif",
      "Saya tahu menu Cerita dipakai untuk komik banyak halaman",
      "Saya tahu menu Filter bisa dipakai untuk efek tambahan"
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
        pahami: "Latihan paling dasar: buat satu kotak besar yang memenuhi sebagian besar canvas sebagai satu panel tunggal. Gambar satu adegan penuh di dalamnya — cocok untuk momen penting yang ingin ditonjolkan."
      },
      {
        judul: "2 panel",
        pahami: "Bagi canvas jadi dua kotak, bisa berdampingan (kiri-kanan) atau bertumpuk (atas-bawah). Gunakan 2 panel untuk menunjukkan 'sebelum dan sesudah' atau dua momen berurutan."
      },
      {
        judul: "3 panel",
        pahami: "Susun tiga kotak, misalnya satu panel lebar di atas dan dua panel lebih kecil di bawah. Coba pikirkan: panel 1 = pembuka, panel 2 = kejadian, panel 3 = reaksi/penutup."
      },
      {
        judul: "4 panel",
        pahami: "Susun dalam grid 2x2 atau empat baris sejajar. Pola 4 panel sangat umum untuk komik strip lucu: perkenalan — pengembangan — kejutan/masalah — lelucon/penutup."
      }
    ],
    checklist: [
      "Saya bisa menyusun panel komik dari 1 sampai 4 panel",
      "Saya paham jumlah dan urutan panel memengaruhi cara cerita dibaca"
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
        pahami: "Sebelum mulai, pastikan kamu sudah punya: satu karakter sederhana (Level 5), satu background sederhana (Level 8), dan sudah paham cara membuat panel serta balon dialog (Level 9 & 11)."
      },
      {
        judul: "Contoh tema: Pensilku Hilang",
        pahami: "Buat 2 panel. Panel 1: karakter bingung mencari sesuatu, dialog \"Di mana pensilku?\". Panel 2: karakter lega, dialog \"Oh, ternyata ada di meja!\"."
      },
      {
        judul: "Susun urutan pengerjaan",
        pahami: "Kerjakan berurutan: (1) sketsa kasar (Pensil) tiap panel, (2) line art (Pena), (3) warna dasar (Fill), (4) background sederhana, (5) balon dialog dan teks, (6) cek ulang sebelum disimpan."
      }
    ],
    checklist: [
      "Saya berhasil membuat komik 2 panel pertama saya dari sketsa sampai selesai",
      "Saya sudah memakai karakter, background, panel, dan dialog dalam satu karya"
    ]
  }
];
