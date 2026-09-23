# Komik Strip Studio

Belajar Clip Studio Paint. Belajar Komik. Ciptakan Ceritamu.

Website pembelajaran digital untuk peserta didik belajar Clip Studio Paint
dan membuat komik strip. Proyek ini dikerjakan bertahap — file ini berisi
**TAHAP 1**: struktur folder, autentikasi (login/register/logout) dengan
Firebase, dan dasbor dasar.

## Struktur folder

```
komik-strip-studio/
├── index.html               # Login
├── register.html            # Pendaftaran
├── dashboard.html           # Dasbor peserta didik
├── materi.html               # Daftar materi (CSP / Komik, lewat ?jenis=)
├── materi-detail.html        # Materi step-by-step + checklist
├── latihan.html               # Latihan interaktif (checklist)
├── komik-studio.html          # Editor komik sederhana (canvas)
├── komik-saya.html            # Portofolio karya
├── badge.html                 # Badge (dihitung otomatis dari progress)
├── profil.html                # Edit nama profil
├── guru.html                  # Dashboard guru (progress semua peserta didik)
├── firestore.rules            # Aturan keamanan Firestore
├── assets/
│   ├── css/style.css          # Sistem desain (warna, tipografi, komponen)
│   ├── js/
│   │   ├── firebase-config.js # Konfigurasi Firebase (WAJIB diisi)
│   │   ├── auth.js            # Login, register, logout (sistem username)
│   │   ├── dashboard.js       # Data dasbor (progress, XP, next step)
│   │   ├── materi.js          # Daftar level materi + status kunci
│   │   ├── materi-detail.js   # Stepper + checklist + simpan progress
│   │   ├── latihan.js         # Kartu latihan + instruksi + checklist
│   │   ├── studio.js          # Editor canvas + simpan karya
│   │   ├── portfolio.js       # Tampilkan & hapus karya
│   │   ├── guru.js            # Data progress semua peserta didik
│   │   ├── badge.js           # Hitung badge otomatis dari progress
│   │   └── profil.js          # Update nama profil
│   └── js/data/
│       ├── csp-levels.js      # Konten 12 level materi Clip Studio Paint
│       ├── komik-levels.js    # Konten 13 level materi Belajar Komik
│       └── latihan-data.js    # Instruksi tiap item Latihan CSP & Komik
```

### Catatan penting soal konten materi

Isi tiap level di `csp-levels.js` dan `komik-levels.js` masih **versi ringkas**
(tanpa screenshot asli Clip Studio Paint, karena AI tidak bisa membuat
screenshot software sungguhan). Struktur datanya sengaja dibuat sederhana
(array of object) supaya kamu bisa mengedit kontennya tanpa menyentuh kode
HTML/JS lain.

### Cara menambahkan screenshot ke materi

Sistem penampil gambar **sudah siap dipakai** — kamu tinggal menaruh file
gambar dan menulis nama filenya di data. Tidak perlu ubah kode apa pun.

1. **Ambil screenshot** di Clip Studio Paint (misalnya pakai Snipping Tool
   di Windows atau Cmd+Shift+4 di Mac). Simpan sebagai `.png` atau `.jpg`.
   Disarankan lebar sekitar 1000–1400px supaya file tidak terlalu berat.

2. **Taruh filenya** di folder:
   - Materi Clip Studio Paint → `assets/img/materi-csp/`
   - Materi Komik → `assets/img/materi-komik/`

   Gunakan nama file yang jelas, contoh: `level1-tampilan-utama.png`,
   `level2-langkah1.png`, dst. (Dua folder ini sudah dibuat, saat ini
   masih kosong — isi sendiri dengan screenshot kamu.)

3. **Tulis nama filenya** di `csp-levels.js` atau `komik-levels.js`, pada
   langkah yang sesuai, dengan menambahkan field `gambar`:

   ```js
   { judul: "Mengenal tampilan utama",
     pahami: "Penjelasan singkatnya di sini...",
     gambar: "assets/img/materi-csp/level1-tampilan-utama.png" }
   ```

   Field `gambar` ini **opsional** — kalau tidak ditulis, langkah itu akan
   tampil tanpa gambar seperti sekarang. Contoh yang sudah saya isi:
   **Level 1** (langkah "Mengenal tampilan utama") dan **seluruh Level 2**
   ("Membuat Canvas") — nama filenya sudah saya tulis di data, kamu tinggal
   menaruh 6 file gambar dengan nama persis seperti itu di
   `assets/img/materi-csp/` supaya langsung muncul, tanpa perlu edit kode.

4. **Simpan file, refresh browser** — gambar langsung muncul di halaman
   materi terkait. Kalau memakai hosting statis (GitHub Pages, Firebase
   Hosting, dll), pastikan folder `assets/img/` ikut ter-upload.

Ulangi pola ini untuk level-level lain sesuai kebutuhan — tidak semua
langkah wajib punya gambar, tambahkan saja di bagian yang menurutmu paling
butuh panduan visual.

### Menambahkan gambar ke Latihan

Pola yang sama juga berlaku untuk halaman Latihan. Buka
`assets/js/data/latihan-data.js`, tambahkan field `gambar` di item yang mau
dikasih gambar, lalu taruh filenya di:
- `assets/img/latihan-csp/` untuk Latihan Clip Studio Paint
- `assets/img/latihan-komik/` untuk Latihan Komik

Contoh:

```js
{ nama: "Brush", ikon: "🖊️",
  instruksi: "...",
  gambar: "assets/img/latihan-csp/brush-contoh.png" }
```

### Catatan soal Komik Studio & penyimpanan karya

Komik Studio adalah editor gambar sederhana berbasis `<canvas>` HTML5
(brush, eraser, teks, balon dialog) — bukan pengganti Clip Studio Paint,
sesuai maksud awal. Untuk TAHAP 1 s.d. TAHAP 11 ini, hasil karya disimpan
sebagai gambar PNG (base64) langsung di dokumen Firestore
(`users/{uid}/karya/{karyaId}`) supaya tidak perlu mengatur Firebase
Storage dulu. Ini cukup untuk gambar-gambar sederhana, tapi kalau nanti
karya makin besar/detail, sebaiknya pindahkan penyimpanan gambar ke
**Firebase Storage** (upload file, simpan hanya `thumbnailUrl` di
Firestore) supaya lebih hemat dan cepat.

## Cara menjalankan

1. **Buat project Firebase**
   - Buka https://console.firebase.google.com → Add project.
   - Di dalam project, tambahkan **Web App** lalu salin objek
     `firebaseConfig` yang muncul.

2. **Isi konfigurasi**
   - Buka `assets/js/firebase-config.js`.
   - Ganti semua nilai `"ISI_DENGAN_..."` dengan nilai dari Firebase Console.

3. **Aktifkan Authentication**
   - Firebase Console → Authentication → Sign-in method → aktifkan
     **Email/Password**.
   - Peserta didik login pakai **username**, bukan email. Di balik layar,
     setiap username otomatis diubah jadi alamat seperti
     `budi123@komikstripstudio.app` sebelum dikirim ke Firebase (karena
     Firebase Authentication Email/Password memang butuh format email).
     Alamat ini tidak dipakai mengirim email sungguhan — kalau mau
     mengganti domain palsunya, ubah konstanta `DOMAIN_LOGIN` di
     `assets/js/auth.js`.

4. **Siapkan Firestore**
   - Firebase Console → Firestore Database → Create database (mode production).
   - Firebase Console → Firestore → Rules → tempel isi dari `firestore.rules`
     lalu klik **Publish**.

5. **Jalankan secara lokal**
   - Karena memakai `type="module"`, buka lewat server lokal, bukan `file://`.
     Contoh dengan Python:
     ```
     python -m http.server 5500
     ```
     lalu buka `http://localhost:5500`.
   - Atau pakai ekstensi **Live Server** di VS Code.

6. **Deploy (opsional)**
   - Bisa dideploy ke Firebase Hosting, Netlify, atau GitHub Pages
     (karena semua file bersifat statis di sisi client).

## Akun guru

Registrasi mandiri hanya membuat akun dengan `role: "peserta_didik"`.
Untuk menjadikan seseorang **guru**, ubah field `role` dokumennya secara
manual di Firestore Console menjadi `"guru"`.

## Roadmap tahap

- [x] Tahap 1 — Login, register, Firebase Auth, logout, dasbor dasar, profil Firestore, security rules
- [x] Tahap 2 — Dasbor lengkap (progress asli, XP, "perjalanan belajar" dinamis)
- [x] Tahap 3 — Sistem materi Clip Studio Paint (Level 1–12, `materi.html?jenis=csp`)
- [x] Tahap 4 — Tutorial step-by-step (`materi-detail.html`, tombol Sebelumnya/Lanjut)
- [x] Tahap 5 — Checklist + progress per materi (tersimpan ke Firestore, +10 XP per level)
- [x] Tahap 6 — Latihan interaktif (`latihan.html`, checklist tersimpan)
- [x] Tahap 7 — Materi membuat komik (Level 1–13, `materi.html?jenis=komik`)
- [x] Tahap 8 — Komik Studio: editor canvas sederhana (brush, eraser, teks, balon, undo/redo)
- [x] Tahap 9 — Penyimpanan karya ke Firestore (`users/{uid}/karya`), badge otomatis
- [x] Tahap 10 — Portofolio "Komik Saya" (lihat & hapus karya)
- [x] Tahap 11 — Dashboard Guru (progress semua peserta didik)

Semua tahap sudah berbentuk kerangka yang **berfungsi dan bisa dijalankan**.
Yang masih perlu kamu lengkapi sendiri (lihat catatan di atas):
- Konten materi yang lebih detail + screenshot asli Clip Studio Paint
- (Opsional) pindahkan penyimpanan gambar karya ke Firebase Storage
- (Opsional) desain badge sebagai gambar, bukan ikon emoji

Untuk menjadikan akun tertentu sebagai **guru**, ubah field `role` dokumen
`users/{uid}` orang itu di Firestore Console menjadi `"guru"` — menu
📊 Dashboard Guru akan otomatis muncul di navigasi.
