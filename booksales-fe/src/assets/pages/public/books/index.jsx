import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getBooks } from "../../../../_services/books";

function BookCard({ book }) {
  // Fungsi untuk format harga ke Rupiah
  const formatRupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };

  return (
    <div className="overflow-hidden transition-transform duration-300 transform bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700 hover:scale-105 hover:shadow-xl">
      <Link to={`/books/${book.id}`}>
        <img
          className="object-cover w-full h-64"
          src={`https://picsum.photos/seed/${book.id}/400/600`}
          alt={book.title}
        />
      </Link>
      <div className="p-5">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 truncate dark:text-white" title={book.title}>
          <Link to={`/books/${book.id}`}>{book.title}</Link>
        </h5>
        <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
          {book.author?.name || "Penulis tidak diketahui"}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatRupiah(book.price)}
          </span>
          <Link
            to={`/books/${book.id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
          >
            Lihat Detail
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const data = await getBooks();
        setBooks(data || []);
      } catch (error) {
        console.error("Gagal mengambil data buku:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-screen-xl px-4 py-8 mx-auto lg:py-16 lg:px-6">
        <div className="max-w-screen-sm mx-auto mb-8 text-center lg:mb-16">
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-gray-900 lg:text-4xl dark:text-white">
            Jelajahi Koleksi Buku Kami
          </h2>
          <p className="font-light text-gray-500 sm:text-xl dark:text-gray-400">
            Temukan buku favorit Anda dari berbagai genre yang kami sediakan.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2">
          {loading ? (
            <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
              Memuat data buku...
            </p>
          ) : books.length > 0 ? (
            books.map((book) => <BookCard key={book.id} book={book} />)
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400 col-span-full">
              Tidak ada buku yang tersedia saat ini.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
