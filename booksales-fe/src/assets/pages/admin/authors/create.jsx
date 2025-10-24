import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createAuthor, getAuthor, updateAuthor } from "../../../../_services/authors";

export default function AdminAuthorCreate() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: "",
    });
    const [error, setError] = useState("");

    const isEditMode = id !== undefined;

    useEffect(() => {
        if (isEditMode) {
            const fetchAuthor = async () => {
                try {
                    const authorData = await getAuthor(id);
                    if (authorData) {
                        setFormData({ name: authorData.name });
                    }
                } catch (err) {
                    console.error(err);
                    setError(err.data?.message || "Failed to fetch author data.");
                }
            };
            fetchAuthor();
        }
    }, [id, isEditMode]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            isEditMode ? await updateAuthor(id, formData) : await createAuthor(formData);
            navigate("/admin/authors");
        } catch (err) {
            setError(err.response?.data?.message || `Failed to ${isEditMode ? 'update' : 'create'} author.`);
            console.error(err);
        }
    };

    return (
        <section className="p-3 bg-gray-50 dark:bg-gray-900 sm:p-5">
            <div className="relative p-4 bg-white shadow-md dark:bg-gray-800 sm:rounded-lg">
                <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">{isEditMode ? 'Edit Author' : 'Add New Author'}</h2>
                {error && (
                    <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400" role="alert">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Author Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                            placeholder="e.g. J.K. Rowling"
                            required
                        />
                    </div>
                    <div className="flex items-center space-x-4">
                        <button type="submit" className="text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                            {isEditMode ? 'Update Author' : 'Add Author'}
                        </button>
                        <button type="button" onClick={() => navigate('/admin/authors')} className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </section>
    );
}