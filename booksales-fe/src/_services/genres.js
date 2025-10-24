import API from "../_api";

export const getGenres = async () => {
    const { data } = await API.get("/genres");
    return data;
};

export const createGenre = async (data) => {
    try {
        const response = await API.post("/genres", data);
        return response.data;
    } catch (error) {
        console.error("Error creating genre:", error);
        throw error;
    }
};

export const deleteGenre = async (id) => {
    try {
        const response = await API.delete(`/genres/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting genre:", error);
        throw error;
    }
};

export const getGenre = async (id) => {
    try {
        const { data } = await API.get(`/genres/${id}`);
        return data;
    } catch (error) {
        throw error.response || error;
    }
};

export const updateGenre = async (id, genreData) => {
    const { data } = await API.put(`/genres/${id}`, genreData);
    return data;
};