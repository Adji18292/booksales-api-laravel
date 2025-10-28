import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PublicLayout from "./assets/layouts/public";
import Home from "./assets/pages/public/home";
import ProtectedRoute from "./assets/components/ProtectedRoute";
import Books from "./assets/pages/public/books";
import ShowBook from "./assets/pages/public/books/show";
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
      { path: "books/:id", element: <ShowBook /> },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/admin",
    element: <ProtectedRoute adminOnly={true} />,
    children: [
      {
        element: <AdminLayout />,
        children: [
          { index: true, element: <AdminBooks /> },
          { path: "books", element: <AdminBooks /> },
          { path: "books/create", element: <AdminBookCreate /> },
          { path: "books/edit/:id", element: <AdminBookCreate /> },
          { path: "genres", element: <AdminGenres /> },
          { path: "genres/create", element: <AdminGenreCreate /> },
          { path: "genres/edit/:id", element: <AdminGenreCreate /> },
          { path: "authors", element: <AdminAuthors /> },
          { path: "authors/create", element: <AdminAuthorCreate /> },
          { path: "authors/edit/:id", element: <AdminAuthorCreate /> },
          { path: "transactions", element: <AdminTransactions /> },
        ],
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
