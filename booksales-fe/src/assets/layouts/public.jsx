import { Outlet } from "react-router-dom";
import Navbar from "../components/navbar";
import { Footer } from "flowbite-react";

export default function PublicLayout() {
  return (
    <>
      <Navbar />
      <main>
        <Outlet /> {/* Konten halaman (Home, Books, dll.) akan muncul di sini */}
      </main>
      <Footer container className="rounded-none">
        <Footer.Copyright href="#" by="Bookstore™" year={2024} />
      </Footer>
    </>
  );
}