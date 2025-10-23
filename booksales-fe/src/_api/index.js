import axios from "axios";

const api = axios.create({
    // baseURL: "https://akmal-bc.karyakreasi.id/api",
    baseURL: "http://127.0.0.1:8000/api",
  },
);

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); 
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; 
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Jika error 401 (Unauthorized), token tidak valid
      localStorage.removeItem("token"); // Hapus token dari penyimpanan
      // Arahkan kembali ke halaman login
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default api;