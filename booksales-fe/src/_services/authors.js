import API from "../_api"

export const getAuthors = async () => {
    const { data } = await API.get("/authors");
    return data;
}

export const createAuthor = async (data) => {
    try {
        const response = await API.post("/authors", data)
        return response.data
    } catch (error) {
        console.log(error);
        throw error
    }
}

export const deleteAuthor = async (id) => {
    try {
        const response = await API.delete(`/authors/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting author:", error);
        throw error;
    }
};

export const getAuthor = async (id) => {
    try {
        const { data } = await API.get(`/authors/${id}`);
        return data;
    } catch (error) {
        throw error.response || error;
    }
};

export const updateAuthor = async (id, authorData) => {
    const { data } = await API.put(`/authors/${id}`, authorData);
    return data;
};