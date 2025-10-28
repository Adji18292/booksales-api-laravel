import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../../../../_services/books";

export default function ShowBook() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const data = await getBook(id);
        // Pastikan untuk mengambil objek buku dari dalam properti 'data'
        // jika backend Anda membungkus responsnya.
        setBook(data.data || data);
      } catch (error) {
        console.error("Gagal mengambil detail buku:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  if (loading) {
    return (
      <section className="py-8 antialiased bg-white md:py-16 dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 mx-auto text-center 2xl:px-0">
          <p className="text-gray-500 dark:text-gray-400">Memuat detail buku...</p>
        </div>
      </section>
    );
  }

  if (!book) {
    return (
      <section className="py-8 antialiased bg-white md:py-16 dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 mx-auto text-center 2xl:px-0">
          <p className="text-red-500">Buku tidak ditemukan.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 antialiased bg-white md:py-16 dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="max-w-md mx-auto shrink-0 lg:max-w-lg">
            <img
              className="w-full"
              src={`https://picsum.photos/seed/${book.id}/400/600`}
              alt={book.title}
            />
          </div>
          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-3xl font-semibold text-gray-900 sm:text-4xl dark:text-white">
              {book.title}
            </h1>
            <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
              oleh {book.author?.name || "Penulis tidak diketahui"}
            </p>
            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl dark:text-white">
                {formatRupiah(book.price)}
              </p>
            </div>
            <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
              <button
                type="button"
                className="text-white mt-4 sm:mt-0 bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800 flex items-center justify-center"
              >
                <svg className="w-5 h-5 -ms-2 me-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                </svg>
                Tambah ke Keranjang
              </button>
            </div>
            <hr className="my-6 border-gray-200 md:my-8 dark:border-gray-800" />
            <p className="mb-6 text-gray-500 dark:text-gray-400">
              {book.description || "Tidak ada deskripsi untuk buku ini."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
