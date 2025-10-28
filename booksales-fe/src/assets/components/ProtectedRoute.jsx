import { Navigate, Outlet } from "react-router-dom";

/**
 * Mendapatkan data pengguna dari localStorage.
 * Idealnya, token JWT bisa di-decode di sini untuk mendapatkan peran,
 * tapi untuk simplisitas, kita akan menyimpan objek user di localStorage.
 */
const getUserInfo = () => {
  const userString = localStorage.getItem("user");
  if (userString) {
    try {
      // Menambahkan try-catch untuk menangani jika data di localStorage tidak valid
      return JSON.parse(userString);
    } catch (e) {
      console.error("Failed to parse user data from localStorage", e);
      // Jika data korup, anggap saja tidak ada user
      return null;
    }
  }
  return null;
};

export default function ProtectedRoute({ adminOnly = false }) {
  const token = localStorage.getItem("token");
  const user = getUserInfo();

  // 1. Cek apakah pengguna sudah login (punya token dan data user)
  if (!token || !user) {
    // Jika belum, arahkan ke halaman login.
    // `replace` digunakan agar pengguna tidak bisa kembali ke halaman sebelumnya dengan tombol back.
    return <Navigate to="/login" replace />;
  }

  // 2. Cek apakah rute ini hanya untuk admin
  if (adminOnly && user.role !== "admin") {
    // Jika iya, tapi peran pengguna bukan admin, arahkan ke halaman utama.
    // Beri pesan atau notifikasi jika perlu.
    alert("You do not have permission to access this page.");
    return <Navigate to="/" replace />;
  }

  // 3. Jika semua pemeriksaan lolos, izinkan akses ke rute yang dituju.
  return <Outlet />;
}