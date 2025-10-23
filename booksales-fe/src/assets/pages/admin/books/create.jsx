import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createBook } from "../../../../_services/books";
import { getGenres } from "../../../../_services/genres";
import { getAuthors } from "../../../../_services/authors";

export default function AdminBookCreate() {
    const navigate = useNavigate();
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

    useEffect(() => {
        const fetchData = async () => {
            const [genresData, authorsData] = await Promise.all([
                getGenres(),
                getAuthors(),
            ]);
            setGenres(genresData || []);
            setAuthors(authorsData || []);
        };
        fetchData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            await createBook(formData);
            navigate("/admin/books");
        } catch (err) {
            setError(err.response?.data?.message || "Failed to create book.");
            console.error(err);
        }
    };

    return (
        <section className="p-3 bg-gray-50 dark:bg-gray-900 sm:p-5">
            <div className="relative p-4 bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">Add New Book</h2>
                {error && (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title</label>
                        <input type="text" name="title" id="title" value={formData.title} onChange={handleChange} className="input-style" required />
                    </div>
                    <div>
                        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Price</label>
                        <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} className="input-style" required />
                    </div>
                    <div>
                        <label htmlFor="stock" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Stock</label>
                        <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} className="input-style" required />
                    </div>
                    <div>
                        <label htmlFor="cover" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Cover URL</label>
                        <input type="text" name="cover" id="cover" value={formData.cover} onChange={handleChange} className="input-style" placeholder="https://example.com/image.jpg" />
                    </div>
                    <div>
                        <label htmlFor="genre_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Genre</label>
                        <select name="genre_id" id="genre_id" value={formData.genre_id} onChange={handleChange} className="input-style" required>
                            <option value="">Select Genre</option>
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>{genre.name}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="author_id" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author</label>
                        <select name="author_id" id="author_id" value={formData.author_id} onChange={handleChange} className="input-style" required>
                            <option value="">Select Author</option>
                            {authors.map((author) => (
                                <option key={author.id} value={author.id}>{author.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex items-center space-x-4">
                        <button type="submit" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                            Add Book
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

// Helper CSS in JS for consistent input styling
const styles = `
    .input-style {
        background-color: #F9FAFB;
        border: 1px solid #D1D5DB;
        color: #111827;
        font-size: 0.875rem;
        border-radius: 0.5rem;
        display: block;
        width: 100%;
        padding: 0.625rem;
    }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);