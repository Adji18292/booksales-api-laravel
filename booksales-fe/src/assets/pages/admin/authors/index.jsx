import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAuthors, deleteAuthor } from "../../../../_services/authors";

export default function AdminAuthors() {
    const [authors, setAuthors] = useState([]);

    const fetchAuthors = async () => {
        const authorsData = await getAuthors();
        setAuthors(authorsData || []);
    };

    useEffect(() => {
        fetchAuthors();
    }, []);

    const handleDeleteAuthor = async (id) => {
        if (window.confirm("Are you sure you want to delete this author?")) {
            try {
                await deleteAuthor(id);
                fetchAuthors(); // Refresh data
            } catch (error) {
                console.error("Failed to delete author:", error);
            }
        }
    };

    return (
        <>
            <section className="p-3 bg-gray-50 dark:bg-gray-900 sm:p-5">
                <div className="relative overflow-hidden bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                    <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white">Manage Authors</h2>
                        <div className="flex flex-col items-stretch justify-end flex-shrink-0 w-full space-y-2 md:w-auto md:flex-row md:space-y-0 md:items-center md:space-x-3">
                            <Link
                                to="/admin/authors/create"
                                className="flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300 dark:bg-indigo-600 dark:hover:bg-indigo-700 focus:outline-none dark:focus:ring-indigo-800"
                            >
                                <svg className="h-3.5 w-3.5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path clipRule="evenodd" fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" />
                                </svg>
                                Add Author
                            </Link>
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-4 py-3">Author Name</th>
                                    <th scope="col" className="px-4 py-3">
                                        <span className="sr-only">Actions</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {authors.length > 0 ? authors.map((author) => (
                                    <tr key={author.id} className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {author.name}
                                        </th>
                                        <td className="flex items-center justify-end px-4 py-3">
                                            <button onClick={() => handleDeleteAuthor(author.id)} className="text-red-600 hover:text-red-900 dark:text-red-500 dark:hover:text-red-700">
                                                Delete
                                            </button>
                                        </td>
                                    </tr>
                                )) : (
                                    <tr className="border-b dark:border-gray-700">
                                        <td colSpan="2" className="px-4 py-3 text-center text-gray-500 dark:text-gray-400">
                                            Data tidak ditemukan
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </>
    );
}
