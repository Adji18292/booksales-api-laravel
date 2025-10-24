import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./assets/layouts/public";
import Home from "./assets/pages/public/home";
import Books from "./assets/pages/public/books";
import Login from "./assets/pages/auth/login";
import Register from "./assets/pages/auth/register";
import AdminLayout from "./assets/layouts/admin";
import AdminBooks from "./assets/pages/admin/books";
import AdminBookCreate from "./assets/pages/admin/books/create";
import AdminGenreCreate from "./assets/pages/admin/genres/create";
import AdminGenres from "./assets/pages/admin/genres";
import AdminAuthors from "./assets/pages/admin/authors";
import AdminAuthorCreate from "./assets/pages/admin/authors/create";
import AdminTransactions from "./assets/pages/admin/transactions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "books", element: <Books /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register", // Tambahkan rute untuk halaman register
    element: <Register />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <AdminBooks /> }, // Halaman default untuk /admin
      { path: "books", element: <AdminBooks /> },
      { path: "books/create", element: <AdminBookCreate /> },
      { path: "books/edit/:id", element: <AdminBookCreate /> }, // Menggunakan komponen yang sama untuk edit
      { path: "genres", element: <AdminGenres /> },
      { path: "genres/create", element: <AdminGenreCreate /> },
      { path: "genres/edit/:id", element: <AdminGenreCreate /> }, // Menggunakan komponen yang sama untuk edit
      { path: "authors", element: <AdminAuthors /> },
      { path: "authors/create", element: <AdminAuthorCreate /> },
      { path: "authors/edit/:id", element: <AdminAuthorCreate /> }, // Menggunakan komponen yang sama untuk edit
      { path: "transactions", element: <AdminTransactions /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
