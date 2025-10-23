import { NavLink, Outlet } from "react-router-dom";
import { RiBook2Line, RiUser3Line, RiFileList2Line, RiMoneyDollarCircleLine } from "react-icons/ri";

export default function AdminLayout() {
  const navLinkClasses = ({ isActive }) =>
    isActive
      ? "flex items-center p-2 text-white rounded-lg bg-indigo-700 dark:text-white dark:bg-indigo-700 group"
      : "flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group";

  return (
    <div>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start">
              <a href="/" className="flex ml-2 md:mr-24">
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">BookSales</span>
              </a>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 dark:text-gray-300">Admin</span>
            </div>
          </div>
        </div>
      </nav>

      <aside id="logo-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700" aria-label="Sidebar">
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink to="/admin/books" end className={navLinkClasses}>
                <RiBook2Line className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="ml-3">Books</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/genres" className={navLinkClasses}>
                <RiFileList2Line className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">Genres</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/authors" className={navLinkClasses}>
                <RiUser3Line className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">Authors</span>
              </NavLink>
            </li>
            <li>
              <NavLink to="/admin/transactions" className={navLinkClasses}>
                <RiMoneyDollarCircleLine className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" />
                <span className="flex-1 ml-3 whitespace-nowrap">Transactions</span>
              </NavLink>
            </li>
          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64">
        <div className="mt-14">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
