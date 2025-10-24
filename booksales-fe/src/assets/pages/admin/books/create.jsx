import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createBook, getBook, updateBook } from "../../../../_services/books";
import { getGenres } from "../../../../_services/genres";
import { getAuthors } from "../../../../_services/authors";

export default function AdminBookCreate() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [genres, setGenres] = useState([]);
    const [authors, setAuthors] = useState([]);
    const [formData, setFormData] = useState({
        title: "",
        price: "",
        stock: "",
        cover: "",
        genre_id: "",
        author_id: "",
    });
    const [error, setError] = useState("");

    const isEditMode = id !== undefined;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [genresData, authorsData] = await Promise.all([
                    getGenres(),
                    getAuthors(),
                ]);
                setGenres(genresData || []);
                setAuthors(authorsData || []);

                if (isEditMode) {
                    const bookData = await getBook(id);
                    setFormData({
                        title: bookData.title,
                        price: bookData.price,
                        stock: bookData.stock,
                        cover: bookData.cover || "",
                        genre_id: bookData.genre_id,
                        author_id: bookData.author_id,
                    });
                }
            } catch (err) {
                console.error("Failed to fetch data:", err);
                setError("Failed to load necessary data.");
            }
        };
        fetchData();
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            isEditMode ? await updateBook(id, formData) : await createBook(formData);
            navigate("/admin/books");
        } catch (err) {
            setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} book.`);
            console.error(err);
        }
    };

    return (
        <section className="p-3 bg-gray-50 dark:bg-gray-900 sm:p-5">
            <div className="relative p-4 bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">{isEditMode ? 'Edit Book' : 'Add New Book'}</h2>
                {error && (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div>
                        <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                        <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required />
                    </div>
                    <div>
                        <label htmlFor="cover" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover URL</label>
                        <input type="text" name="cover" id="cover" value={formData.cover} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" placeholder="https://example.com/image.jpg" />
                    </div>
                    <div>
                        <label htmlFor="genre_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Genre</label>
                        <select name="genre_id" id="genre_id" value={formData.genre_id} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required>
                            <option value="">Select Genre</option>
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="author_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
                        <select name="author_id" id="author_id" value={formData.author_id} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white" required>
                            <option value="">Select Author</option>
                            {authors.map((author) => (
                                <option key={author.id} value={author.id}>{author.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button type="submit" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                            {isEditMode ? 'Update Book' : 'Add Book'}
                        </button>
                        <button type="button" onClick={() => navigate('/admin/books')} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}