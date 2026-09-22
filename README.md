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
│   │   ├── auth.js            # Login, register, logout
│   │   ├── dashboard.js       # Data dasbor (progress, XP, next step)
│   │   ├── materi.js          # Daftar level materi + status kunci
│   │   ├── materi-detail.js   # Stepper + checklist + simpan progress
│   │   ├── latihan.js         # Checklist latihan
│   │   ├── studio.js          # Editor canvas + simpan karya
│   │   ├── portfolio.js       # Tampilkan & hapus karya
│   │   ├── guru.js            # Data progress semua peserta didik
│   │   └── profil.js          # Update nama profil
│   └── js/data/
│       ├── csp-levels.js      # Konten 12 level materi Clip Studio Paint
│       └── komik-levels.js    # Konten 13 level materi Belajar Komik
```

### Catatan penting soal konten materi

Isi tiap level di `csp-levels.js` dan `komik-levels.js` masih **versi ringkas**
(tanpa screenshot asli Clip Studio Paint, karena AI tidak bisa membuat
screenshot software sungguhan). Supaya materi benar-benar siap dipakai
peserta didik, edit dua file itu untuk:
- menambahkan gambar/screenshot asli di tiap langkah (bisa tambah field
  `gambar: "assets/img/nama-file.png"` lalu render di `materi-detail.js`),
  dan
- memperpanjang penjelasan tiap langkah kalau perlu.

Struktur datanya sengaja dibuat sederhana (array of object) supaya kamu
bisa mengedit kontennya tanpa menyentuh kode HTML/JS lain.

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
