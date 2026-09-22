# Komik Strip Studio

Belajar Clip Studio Paint. Belajar Komik. Ciptakan Ceritamu.

Website pembelajaran digital untuk peserta didik belajar Clip Studio Paint
dan membuat komik strip. Proyek ini dikerjakan bertahap — file ini berisi
**TAHAP 1**: struktur folder, autentikasi (login/register/logout) dengan
Firebase, dan dasbor dasar.

## Struktur folder

```
komik-strip-studio/
├── index.html            # Halaman login
├── register.html          # Halaman pendaftaran
├── dashboard.html          # Dasbor peserta didik (butuh login)
├── firestore.rules         # Aturan keamanan Firestore
├── assets/
│   ├── css/style.css       # Sistem desain (warna, tipografi, komponen)
│   └── js/
│       ├── firebase-config.js  # Konfigurasi Firebase (WAJIB diisi)
│       ├── auth.js             # Login, register, logout
│       └── dashboard.js        # Ambil data profil untuk dasbor
```

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

## Roadmap tahap berikutnya

- [x] Tahap 1 — Login, register, Firebase Auth, logout, dasbor dasar,
      profil Firestore, security rules
- [ ] Tahap 2 — Dasbor lengkap (progress, XP, badge nyata)
- [ ] Tahap 3 — Sistem materi Clip Studio Paint (Level 1–12)
- [ ] Tahap 4 — Tutorial step-by-step
- [ ] Tahap 5 — Checklist + progress per materi
- [ ] Tahap 6 — Latihan interaktif
- [ ] Tahap 7 — Materi membuat komik
- [ ] Tahap 8 — Komik Studio (editor sederhana)
- [ ] Tahap 9 — Penyimpanan karya (Firestore + Storage)
- [ ] Tahap 10 — Portofolio (Komik Saya)
- [ ] Tahap 11 — Dashboard Guru

Katakan **"LANJUT KE TAHAP 2"** untuk melanjutkan pembangunan.
