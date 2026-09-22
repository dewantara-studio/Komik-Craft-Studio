// =========================================================
// KOMIK STRIP STUDIO — Profil
// =========================================================
import { auth, db } from "./firebase-config.js";
import { onAuthStateChanged, updateProfile } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-firestore.js";

const loadingEl = document.getElementById("profil-loading");
const formEl = document.getElementById("form-profil");
const namaInput = document.getElementById("profil-nama");
const usernameEl = document.getElementById("profil-username");
const roleEl = document.getElementById("profil-role");
const msgEl = document.getElementById("profil-msg");

const LABEL_ROLE = { peserta_didik: "Peserta Didik", guru: "Guru" };

onAuthStateChanged(auth, async (user) => {
  if (!user) { window.location.href = "index.html"; return; }

  try {
    const snap = await getDoc(doc(db, "users", user.uid));
    const data = snap.exists() ? snap.data() : {};
    if (namaInput) namaInput.value = data.nama || user.displayName || "";
    if (usernameEl) usernameEl.textContent = data.username ? `@${data.username}` : "-";
    if (roleEl) roleEl.textContent = LABEL_ROLE[data.role] || data.role || "-";
  } catch (err) {
    console.error("Gagal memuat profil:", err);
  } finally {
    if (loadingEl) loadingEl.hidden = true;
    if (formEl) formEl.hidden = false;
  }
});

formEl?.addEventListener("submit", async (e) => {
  e.preventDefault();
  const user = auth.currentUser;
  if (!user) return;
  const namaBaru = namaInput.value.trim();
  if (!namaBaru) return;

  const btn = formEl.querySelector("button[type='submit']");
  btn.disabled = true;
  btn.textContent = "Menyimpan…";
  try {
    await updateDoc(doc(db, "users", user.uid), { nama: namaBaru });
    await updateProfile(user, { displayName: namaBaru });
    msgEl.hidden = false;
    msgEl.textContent = "Nama berhasil diperbarui.";
  } catch (err) {
    console.error("Gagal memperbarui profil:", err);
    msgEl.hidden = false;
    msgEl.textContent = "Gagal menyimpan. Coba lagi.";
  } finally {
    btn.disabled = false;
    btn.textContent = "Simpan Perubahan";
  }
});
