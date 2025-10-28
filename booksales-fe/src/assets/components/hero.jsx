export default function Hero() {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-12">
          <a
            href="#books"
            className="inline-flex items-center justify-between px-1 py-1 pr-4 text-sm text-gray-700 bg-gray-100 rounded-full mb-7 dark:bg-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700"
            role="alert"
          >
            <span className="text-xs bg-indigo-600 rounded-full text-white px-4 py-1.5 mr-3">
              Baru
            </span>{" "}
            <span className="text-sm font-medium">
              Jelajahi koleksi buku terbaru kami!
            </span>
            <svg
              className="w-5 h-5 ml-2"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path>
            </svg>
          </a>
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Temukan Dunia Baru dalam Setiap Halaman
          </h1>
          <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
            Jelajahi ribuan judul dari berbagai genre. Mulai dari fiksi yang memikat, non-fiksi yang mencerahkan, hingga buku anak-anak yang penuh imajinasi. Petualangan Anda dimulai di sini.
          </p>
        </div>
      </section>
    </>
  );
}